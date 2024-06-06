let swirVal = false;

function showValue(caller) {
    let val = document.getElementById(caller).value;
    document.getElementById("Rgroup1").innerHTML = caller + ": " + val;
    
    const pedido = new XMLHttpRequest();

    const info = {
      caller,
      val
    };

    pedido.open("POST", "/", true);
    pedido.setRequestHeader("Content-Type", "application/json");
    pedido.send(JSON.stringify(info));
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