keys = {
    'piris' : {
        'value' : 0,
        'info' : 'piris position',
        'targ' : '/lens/piris'
    },
    'zoom' : {
        'value' : 0,
        'info' : 'zoom position',
        'targ' : '/lens/zoom'
    },
    
    'focus' : {
        'value' : 0,
        'info' : 'focus position',
        'targ' : '/lens/focus'
    },
    'swir' : {
        'value' : 'off',
        'targ' : '/lens/swir'
    },
    'heater' : {
        'value' : 'off',
        'targ' : '/lens/heater'
    },
    'lens' : {
        'value' : 'L12',
        'targ' : 'lens/config'
    }
}


lenses = {
    'C10' : {
        'zoom_speed' : 150,
        'zoom_max' : 368,
        'zoom_position' : 195,
        'focus_speed' : 1280,
        'focus_max' : 3968,
        'focus_position' : 288,
        'piris_speed' : 50,
        'piris_max' : 85,
        'piris_position' : 0
    },

    'L12' : {
        'zoom_speed' : 300,
        'zoom_max' : 2108,
        'zoom_position' : 0,
        'focus_speed' : 400,
        'focus_max' : 3530,
        'focus_position' : 0,
        'piris_speed' : 25,
        'piris_max' : 110,
        'piris_position' : 0
    }
    /*
    ,

    '' : {
        'zoom_speed' : ,
        'zoom_max' : ,
        'zoom_position' : ,
        'focus_speed' : ,
        'focus_max' : ,
        'focus_position' : ,
        'piris_speed' : ,
        'piris_max' : ,
        'piris_position' : 
    }
    */
}



async function postreq(payload){
    const json = payload;
    const options = {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await fetch ('/from_js', options);
    const msg = await res.json();
    if(payload['method']=='get'){
        importante = Number (msg[payload['info']])
        return importante
    }
    return msg;
}

async function getreq(target, info){
    const response = await fetch(target);
    const values = await response.json();
    if(values['status']=='pass'){
        return values[info];
    }
    return values['status'];
}

async function getValue(param){
    console.log("entrou na funcao getValn")
    target = keys[param]['targ'];
    method = 'get';
    info = keys[param]['info'];
    console.log("info is "+ info);
    data = {
        method,
        target,
        info
    }
    value = await postreq(data);
    return (Number (value));
}
async function updateValue(param){
    new_val = document.getElementById(param).value;
    keys[param]['value'] = new_val; 
    
    old_val = await getValue(param);
    console.log("old value is: ");
    console.log(old_val)
    console.log("new value is: ");
    console.log(new_val)
    end_position = percent_to_value(param, new_val);
    console.log("corresponde a posicao: ");
    console.log(end_position)
    steps = end_position - old_val;
    console.log("precisa de steps: ");
    console.log(steps)

    target = keys[param]['targ'];
    word = param+"_speed";
    speed = lenses[keys['lens']['value']][word];

    method = "post";
    info = {
        speed,
        steps,
        method,
        target
    }
    result = await postreq(info);
    document.getElementById("Rgroup1").innerHTML = param + ": " + end_position;
}

async function button_push(button){
    //lens config
    //homing
    //autofocus
    //reset
    //toggler
}

async function initValues(){
    //get correct slider vals - CHECK
    //set heater and swir to off - ?CHECK?
    //?auto-config the lens? --- shouldnt be done
    
    console.log("entrou");
    
    for (let x in keys){
       if (keys[x].hasOwnProperty('info')){
        console.log(x);
        val = await getValue(x);
        console.log(val);
        percent = value_to_percent(x, val)
        console.log(percent)
        document.getElementById(x).setAttribute("value", percent);
       }
       method = 'post';
       heater = keys['heater']['value'];
       swir = keys['heater']['value'];
       target = keys['heater']['targ'];
       info={
        heater,
        method,
        target
       };
       postreq(info);
       
       target = keys['swir']['targ'];
       info={
        swir,
        method,
        target
       };
       postreq(info);
    }
    
    console.log("saiu");


}

function percent_to_value(param, percent){
    aux = param+"_max";
    max = lenses[keys['lens']['value']][aux];
    value = (percent * max) / 100;
    return Math.round(value);
}

function value_to_percent(param, value){
    aux = param+"_max";
    max = lenses[keys['lens']['value']][aux];
    percent = (value * 100) / max;
    return Math.round(percent);
}