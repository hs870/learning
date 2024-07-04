keys = {
    'piris' : {
        'value' : 0,
        'info' : 'piris position',
        'targ' : '/lens/piris',
        'init' : true
    },
    'zoom' : {
        'value' : 0,
        'info' : 'zoom position',
        'targ' : '/lens/zoom',
        'init' : true
    },
    
    'focus' : {
        'value' : 0,
        'info' : 'focus position',
        'targ' : '/lens/focus',
        'init' : true
    },
    'swir' : {
        'value' : 'on',
        'targ' : '/lens/swir',
        'init' : true
    },
    'heater' : {
        'value' : 'off',
        'targ' : '/lens/heater',
        'init' : true
    },
    'lens' : {
        'value' : 'L15',
        'targ' : 'lens/config',
        'init' : false
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
    },

    'C03' : {
        'zoom_speed' : 150,
        'zoom_max' : 367,
        'zoom_position' : 195,
        'focus_speed' : 2560,
        'focus_max' : 3968,
        'focus_position' : 1047,
        'piris_speed' : 50,
        'piris_max' : 76,
        'piris_position' : 0
    },

    'Z05' : {
        'zoom_speed' : 200,
        'zoom_max' : 968,
        'zoom_position' : 696,
        'focus_speed' : 3840,
        'focus_max' : 4072,
        'focus_position' : 1632,
        'piris_speed' : 50,
        'piris_max' : 89,
        'piris_position' : 0
    },

    'L15' : {
        'zoom_speed' : 900,
        'zoom_max' : 2282,
        'zoom_position' : 0,
        'focus_speed' : 500,
        'focus_max' : 2326,
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

buttons = {
    'zoom' : {
        'motorType' : 'zoom',
        'target' : '/lens/homing'
    },
    'focus' : {
        'motorType' : 'focus',
        'target' : '/lens/homing'
    },
    'piris' : {
        'motorType' : 'iris',
        'target' : '/lens/homing'
    },
    'L12' : {
        'target' : '/lens/configlens',
        'type' : 'L12'
    },
    'C03' : {
        'target' : '/lens/configlens',
        'type' : 'C03'
    },
    'C10' : {
        'target' : '/lens/configlens',
        'type' : 'C10'
    },
    'Z05' : {
        'target' : '/lens/configlens',
        'type' : 'Z05'
    },
    'L15' : {
        'target' : '/lens/configlens',
        'type' : 'L15'
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
        importante = msg[payload['info']];
        return importante
    }
    return msg;
}

async function getValue(param){
    console.log("entrou na funcao getVal")
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
    //lens config - Done
    //homing - DONE
    //autofocus - DONE
    //reset - DONE
    //toggler - DONE
    if (button == 'all'){
        console.log("entrou no if");
        for (let x in buttons){
            if (buttons[x].hasOwnProperty('motorType')){
                dict = buttons[x];
                dict.method = 'post';
                console.log(dict);
                isto = await postreq(dict);
                console.log(isto);
            }
        }
        initValues();
    }else{
        console.log("entrou no else");
        dict = buttons[button];
        dict.method = 'post';
        console.log(await postreq(dict));
    }
    
}

async function button_get(target){
    method = 'get';
    info = 'status';
    data = {
        method,
        target,
        info
    }
    console.log(await postreq(data));
}

async function toggler(param){
    new_val = keys[param]['value'] == "on" ? "off" : "on";
    method = 'post';
    target = keys[param]['targ'];
    info = {
        [param] : new_val,
        method,
        target
    }
    result = await postreq(info);
    if(result['status'] == 'pass'){
        keys[param]['value'] = new_val;
    }else{
        console.log("oops, something failed");
    }
}

async function initValues(){
    //get correct slider vals - ?CHECK?
    //set heater and swir to off - ?CHECK?
    //?auto-config the lens? --- shouldnt be done
    
    console.log("entrou");
    for (let x in keys){
       if (keys[x]['init']){
        console.log(x);
        if(keys[x].hasOwnProperty('info')){
            val = await getValue(x);
            console.log(val);
            percent = value_to_percent(x, val);
            console.log(percent);
            document.getElementById(x).setAttribute("value", percent);
        }else{
                method = 'post';
                info={
                    method,
                    'target' : keys[x]['targ'],
                    [x] : keys[x]['value']
                };
                console.log("else, info: ");
                console.log(info);
                postreq(info);
            }   
        }
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