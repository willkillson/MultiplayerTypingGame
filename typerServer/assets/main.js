console.log("main.js loaded");
var socket = io();

//const Dictionary = require('./assets/Dictionary');
//const Vec2 = require('./assets/WilkiMath');

//var dictionary = new Dictionary();


var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = 800;
var height = 600;
ctx.canvas.width = width;
ctx.canvas.height = height;

var message = "Nothing";

var unit = null;
var currentConnections = null;


var posx = null;
var posy = null;

var newPosx = null;
var newPosy = null;

socket.on('init', function (data) {
    unit = data;
    newPosx = unit.unit.position.x;
    newPosy = unit.unit.position.y;
    if ((posx == null)&&(posy==null)) {
        posx = newPosx;
        posy = newPosy;

    }

});

socket.on('message', function (data) {
    currentConnections = data;

});

var highx = 0;
var highy = 0;

function drawUnit(x, y, radius, name) {



    //server
    ctx.fillStyle = `rgba(0,0, 255, 1)`;
    ctx.beginPath();
    ctx.fillText("ServerPosition - (" + newPosx + "," + newPosy + ")", x - 100, y - 75);
    ctx.arc(newPosx, newPosy, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    //client
    ctx.fillStyle = `rgba(0,255, 0, 1)`;
    ctx.beginPath();
    ctx.fillText("ClientPosition - (" + Math.floor(x) + "," + Math.floor(y) + ")", x - 100, y - 100);
    ctx.arc(x, y,radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    if (currentConnections != null) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(0,0, 0, 0.5)`;
        ctx.font = "20px Arial";
        ctx.fillText("MaxDifferenceClientServer x or y - " + highx + "," + highy + "", 10, 20);
        ctx.fillText("DifferenceClientServer - (" + Math.abs(Math.floor(posx) - newPosx) + "," + Math.abs(Math.floor(posy) - newPosy) + ")",10, 45);

        if (Math.abs(Math.floor(posx) - newPosx) > highx) {
            highx = Math.abs(Math.floor(posx) - newPosx);
        }
        if (Math.abs(Math.floor(posy) - newPosy) > highy) {
            highy = Math.abs(Math.floor(posy) - newPosy);
        }


    }


}
function updateUnit() {
    var updateSpeed = 0.3;
    if ((newPosx != posx) && (newPosy != posy)) {
        if (newPosx < posx) {
            posx -= updateSpeed;
        }
        if (newPosx > posx) {
            posx += updateSpeed;
        }
        if (newPosy > posy) {
            posy += updateSpeed;
        }
        if (newPosy < posy) {
            posy -= updateSpeed;
        }
    }


       
}

function Graphics() {



    this.init = function () {

    }

    function mainLoop() {

        

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);//clears frame


        if ((posx != null) && (posy != null)) {
            updateUnit();
        }


        if ((unit != null)) {

            updateUnit();
            drawUnit(posx, posy, unit.unit.radius, unit.unit.name);
  
        }



        drawBoundary();



        requestAnimationFrame(mainLoop);
    }
    requestAnimationFrame(mainLoop);

    function drawBoundary() {
        //boundary
        ctx.beginPath();
        ctx.strokeStyle = 'brown';
        ctx.moveTo(0, 0);
        ctx.lineTo(0, height);
        ctx.lineTo(width, height);
        ctx.lineTo(width, 0);
        ctx.lineTo(0, 0);
        ctx.stroke();

    }
}


var graphics = new Graphics();




////avatar

//ctx.fillStyle = `rgba(249, 170, 0, 1)`;
//ctx.beginPath();
//ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
//ctx.closePath();
//ctx.fill();

////display name
//ctx.beginPath();
//ctx.font = "20px Arial";
//ctx.fillStyle = `rgba(249, 170, 0, 1)`;
//ctx.fillText(this.name, this.position.x - 25, this.position.y - 30);


////display health
//ctx.beginPath();
//ctx.font = "13px Arial";
//ctx.fillStyle = "black";
//ctx.fillText("HP - " + this.currentHealth, this.position.x - 22, this.position.y + 5);


















console.log("main.js loaded");

var main = new Graphics();
main.init();



//Dictionary

var dictionary = new Array();

dictionary.push("grouchy");
dictionary.push("care");
dictionary.push("match");
dictionary.push("weary");
dictionary.push("snails");
dictionary.push("market");
dictionary.push("mature");
dictionary.push("lethal");
dictionary.push("abortive");
dictionary.push("poop");
dictionary.push("crap");
dictionary.push("pain");
dictionary.push("skirt");
dictionary.push("puzzled");
dictionary.push("bump");
dictionary.push("tail");
dictionary.push("jazzy");
dictionary.push("stick");
dictionary.push("endurable");
dictionary.push("black");
dictionary.push("rural");
dictionary.push("faithful");
dictionary.push("cabbage");
dictionary.push("crate");
dictionary.push("talk");
dictionary.push("guarded");
dictionary.push("breakable");
dictionary.push("harmonious");
dictionary.push("furniture");
dictionary.push("debonair");
dictionary.push("thirsty");
dictionary.push("planes");
dictionary.push("change");
dictionary.push("first");
dictionary.push("bubble");
dictionary.push("sister");
dictionary.push("roof");
dictionary.push("thought");
dictionary.push("sparkling");
dictionary.push("adjoining");
dictionary.push("terrible");
dictionary.push("launch");
dictionary.push("comb");
dictionary.push("foregoing");
dictionary.push("skinny");
dictionary.push("ten");
dictionary.push("rice");
dictionary.push("girls");
dictionary.push("productive");
dictionary.push("poke");
dictionary.push("guard");
dictionary.push("mass");
dictionary.push("jail");
dictionary.push("disappear");
dictionary.push("letter");
dictionary.push("flower");
dictionary.push("idea");
dictionary.push("furtive");
dictionary.push("prickly");
dictionary.push("capable");
dictionary.push("seemly");
dictionary.push("loving");


for (let i = 0; i < dictionary.length; i++) {
    dictionary[i] = dictionary[i].toUpperCase();
}