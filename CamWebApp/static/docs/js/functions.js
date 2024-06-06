function post_request(data)
{
    const pedido = new XMLHttpRequest();
    pedido.open("POST", "/", true);
    pedido.setRequestHeader("Content-Type", "application/json");
    pedido.send(JSON.stringify(data));
}


let swirVal = false;

function initialValues(){
    let ap = 33;
    let zo = 11;
    let fo = 88;
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