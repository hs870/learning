//const ip = "http://127.0.0.1:5000"
const ip = "http://192.168.0.30:5000"

camera = {
    'swir' : "off",
    'heater' : "off",
    'piris' : -1,
    'zoom' : -1,
    'focus' : -1
}

async function postreq(payload, target){
    console.log(payload);
    console.log(target);
    console.log("payload & target was printed");
    
    const json = payload;
    console.log(json);
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
    const estado = msg["status"];
    console.log(estado);
}

async function getreq(target, info){
    const response = await fetch(target);
    const values = await response.json();
    if(values['status']=='pass'){
        return values[info];
    }
    return ("lixo");
}

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
    camera[what] = camera[what] == "on" ? "off" : "on";
    document.getElementById("Lgroup1").innerHTML = what + " is now " + camera[what].toString();
    console.log("print1");
    console.log(camera[what]);
    
    const json = {
        [what] : camera[what]
    }
    postreq(json, "/post"+what);
    /*
    console.log(json);
    console.log( JSON.stringify(json) );
    const options = {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    console.log("print before fetch");
    const res = await fetch ('/postswir', options);
    console.log("print after fetch");
    const msg = await res.json();
    console.log("print2");
    console.log("fetch terminado");
    console.log(res);
    console.log("print3");
    console.log("?resultado? impresso");
    console.log(msg);
    console.log("msg foi impresso");
    const estado = msg["status"];
    console.log("print4");
    console.log(estado);
    console.log("estado was printed");
    */
}



async function initValues(){
    param = [
        ["zoom", "/getzoom", "zoom position"], 
        ["piris", "/getpiris", "piris position"],
        ["focus", "/getfocus", "focus position"]
    ];

    for(let i = 0; i < (param.length); i++){
        camera[param[i][0]] = await getreq( param[i][1] , param[i][2]);
        document.getElementById(param[i][0]).setAttribute("value", camera[param[i][0]]);
        console.log(camera[param[i][0]]);
    }
    /*
    camera["zoom"] = await getreq('/getzoom', 'zoom position');
    document.getElementById("zoom").setAttribute("value", camera["zoom"]);
    console.log("retornou o seguinte");
    console.log(camera["zoom"]);
    */

    

    /*
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
    */
}