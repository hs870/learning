//const ip = "http://127.0.0.1:5000"
const ip = "http://192.168.0.30:5000"
let swirVal = false;
let heaterVal = false;
let piris;
let zoom;
let _focus;


async function lens_post(data, target){
    console.log(data);
    console.log(target);
    console.log("data e target");
    const json = data;
    console.log("json impresso");
    const options = {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await fetch (target, options);
    const msg = await res.json();
    console.log("fetch terminado");
    console.log(res);
    console.log("?resultado? impresso");
    console.log(msg);
    console.log("msg foi impresso");
    const estado = msg["status"];
    console.log(estado);
    console.log("estado was printed");
}

async function lens_get(param){
    const route = ip + "/lens/" + param;

    const response = await fetch(route);
    const values = await response.json();
    if( values["status"] == "pass"){
        return (values["value"]);
    } else {
        return ("failed");
    }
    
}

async function initialValues(){

    zoom = await lens_get("zoom");
    _focus = await lens_get("focus");
    piris = await lens_get("piris");

    document.getElementById("piris").setAttribute("value", piris); 
    document.getElementById("zoom").setAttribute("value", zoom);
    document.getElementById("focus").setAttribute("value", _focus);
}

function showValue(caller) {
    let val = document.getElementById(caller).value;
    document.getElementById("Rgroup1").innerHTML = caller + ": " + val;
    const info = {
      caller,
      val
    };
    console.log("linha 64");
    console.log(info);
    console.log("linha 66");
    lens_post(info, ip+"/lens/"+caller);
}

async function toggler(what) {
    if (what == "heater"){
        if (heaterVal){
            document.getElementById("Lgroup1").innerHTML = "Heater is now Off";
            heaterVal = false;
        } else {
            document.getElementById("Lgroup1").innerHTML = "Heater is now On";
            heaterVal = true;
        }
    }

    if(what == "swir"){
        if (swirVal){
            document.getElementById("Lgroup1").innerHTML = "SWIR is now Off";
            swirVal = false;
        } else {
            document.getElementById("Lgroup1").innerHTML = "SWIR is now On";
            pedido = { "swir" : "on"};
            swirVal = true;
        }
    }
}


async function initValues(){

    let response = await fetch('/getzoom');
    let values = await response.json();
    zoom = values["zoom position"];
    console.log(zoom);
    document.getElementById("zoom").setAttribute("value", zoom);

    response = await fetch('/getpiris');
    values = await response.json();
    piris = values["piris position"];
    console.log(piris);
    document.getElementById("piris").setAttribute("value", piris); 
    
    response = await fetch('/getfocus');
    values = await response.json();
    _focus = values["focus position"];
    console.log(_focus);
    document.getElementById("focus").setAttribute("value", _focus);
}