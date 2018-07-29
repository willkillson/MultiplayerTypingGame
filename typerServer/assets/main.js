//import { emit } from "cluster";

console.log("main.js loaded");
var socket = io();

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = 800;
var height = 600;
ctx.canvas.width = width;
ctx.canvas.height = height;

var currentConnections = null;

var units = new Array();
var newPoses = new Array();


socket.on('init', function (data) {

    var add = 1;
    for (let i = 0; i < data.units.length; i++) {

        //search the arrays for proper updating, if we don't have a match add == 1
        add = 1;
        for (let j = 0; j < units.length; j++) {
            if (units[j].name === data.units[i].name) {
                units[j].newPosition.x = data.units[i].position.x;
                units[j].newPosition.y = data.units[i].position.y;
                units[j].velocity.x = data.units[i].velocity.x;
                units[j].velocity.y = data.units[i].velocity.y;
                add = 0;
                //console.log("should never see this twice");
            }
        }
        if (add) {

            //console.log("Creating " + data.units[i].name);
            //console.log(data.units[i]);
            units.push(data.units[i]);
        }

    }

});

socket.on('message', function (data) {
    currentConnections = data;
});

var x = null;
var y = null;

function updateUnit(unit) {
    var updateSpeed = 0.06;
    if ((unit.newPosition.x != unit.position.x) && (unit.newPosition.y != unit.position.y)) {
        if (unit.newPosition.x > unit.position.x) {
            unit.position.x += Math.abs(unit.velocity.x * updateSpeed);
        }
        if (unit.newPosition.x < unit.position.x) {
            unit.position.x -= Math.abs(unit.velocity.x * updateSpeed);
        }
        if (unit.newPosition.y < unit.position.y) {
            unit.position.y -= Math.abs(unit.velocity.y*updateSpeed);
        }
        if (unit.newPosition.y > unit.position.y) {
            unit.position.y += Math.abs(unit.velocity.y * updateSpeed);
        }
    }

    //if update is so fucked lock step
    let xdif = Math.abs(unit.position.x - unit.newPosition.x);
    let ydif = Math.abs(unit.position.y - unit.newPosition.y);

    if (ydif > 25) {

        unit.position.y = unit.newPosition.y;

    }
    if (xdif > 25) {
        unit.position.x = unit.newPosition.x;
    }

}

function drawUnit(x) {

    //client
    ctx.font = "20px Arial";
    ctx.fillStyle = `rgba(0,255, 0, 1)`;
    ctx.beginPath();
    ctx.fillText(x.name, x.position.x - 40, x.position.y - 110);

    ctx.fillText("ClientPosition - (" + Math.floor(x.position.x) + "," + Math.floor(x.position.y) + ")", x.position.x - 40, x.position.y - 50);
    ctx.fillText("ServerPosition - (" + Math.floor(x.newPosition.x) + "," + Math.floor(x.newPosition.y) + ")", x.position.x - 40, x.position.y - 30);

    ctx.fillStyle = `rgba(255,0, 0, 1)`;
    ctx.arc(x.position.x, x.position.y, x.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    //server
    ctx.fillStyle = `rgba(255,255, 255, 1)`;
    ctx.beginPath();

    ctx.arc(x.newPosition.x, x.newPosition.y, x.radius/2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    //if (currentConnections != null) {
    //    ctx.beginPath();
    //    ctx.fillStyle = `rgba(255,255, 255, 1)`;
    //    ctx.font = "20px Arial";
    //    ctx.fillText("MaxDifferenceClientServer x or y - " + highx + "," + highy + "", 10, 20);
    //    ctx.fillText("DifferenceClientServer - (" + Math.abs(Math.floor(posx) - newPosx) + "," + Math.abs(Math.floor(posy) - newPosy) + ")",10, 45);

    //    if (Math.abs(Math.floor(posx) - newPosx) > highx) {
    //        highx = Math.abs(Math.floor(posx) - newPosx);
    //    }
    //    if (Math.abs(Math.floor(posy) - newPosy) > highy) {
    //        highy = Math.abs(Math.floor(posy) - newPosy);
    //    }


    //}


}

function getNearCircle(posx,posy) {

    for (let i = 0; i < units.length; i++) {
        if ((units[i].position.x - units[i].radius < posx) && (posx < units[i].position.x + units[i].radius)) {
            if ((units[i].position.y - units[i].radius < posy) && (posy < units[i].position.y + units[i].radius)) {

                units[i].isAlive = 0;

                socket.emit('kill', units[i].name);
                //console.log(units[i]);
            }
        }
    }

}

function removeDeadUnits() {


    for (let i = 0; i < units.length; i++) {
        if (units[i].isAlive === 0) {
            units.splice(i, 1);
        }
    }
}

document.onmousemove = function (e) {
    var event = e || window.event;
    x = event.clientX;
    y = event.clientY;

}

function Graphics() {
    this.init = function () {



        setInterval(function (e) {


            for (let i = 0; i < units.length; i++) {
                updateUnit(units[i]);
            }

            getNearCircle(x, y);
            removeDeadUnits();
            //console.log("("+x+","+y+")");


        }, 1);




    }

    function mainLoop() {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);//clears frame
        drawBoundary();
        
        //draw all the units

        for (let i = 0; i < units.length; i++) {
       
            drawUnit(units[i]);

        }

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

        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 800, 600);
    

    }
}

var graphics = new Graphics();
var main = new Graphics();
main.init();

function Vec2(x, y) {
    this.x = x;
    this.y = y;
}