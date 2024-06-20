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
        'value' : 'C10',
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
    }
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
    document.getElementById("Rgroup1").innerHTML = param + ": " + new_val;
}

async function button_push(button){
    //lens config
    //homing
    //autofocus
    //reset
    //toggler
}

async function initConf(){
    //get correct slider vals
    //set heater and swir to off
    //auto-config the lens
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