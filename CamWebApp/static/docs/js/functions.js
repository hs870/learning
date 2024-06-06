function post_request(data)
{
    const pedido = new XMLHttpRequest();
    pedido.open("POST", "/", true);
    pedido.setRequestHeader("Content-Type", "application/json");
    pedido.send(JSON.stringify(data));

}


let swirVal = false;

async function initialValues(){
    let ap = 33;
    let zo = 11;
    let fo = 44;

    let answer = "whatsup";
    const response = await fetch("http://127.0.0.1:5000/lens/focus")
    const values = await response.json();
    console.log(values);
    console.log(values["status"]);
    console.log(values["value"]);
    if( values["status"] == "pass"){
        zo = values["value"];
        console.log("passou");
    }

    document.getElementById("aperture").setAttribute("value", ap);
    document.getElementById("zoom").setAttribute("value", zo);
    document.getElementById("focus").setAttribute("value", fo);
}

function showValue(caller) {
    let val = document.getElementById(caller).value;
    document.getElementById("Rgroup1").innerHTML = caller + ": " + val;
    const info = {
      caller,
      val
    };
    post_request(info);
}

function toggleSWIR() {
    if (swirVal){
        document.getElementById("Lgroup1").innerHTML = "SWIR is now Off";
        swirVal = false;
    } else {
        document.getElementById("Lgroup1").innerHTML = "SWIR is now On";
        swirVal = true;
    }
}