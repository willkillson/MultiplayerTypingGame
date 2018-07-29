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
            if (units[j].name===data.units[i].name) {
                units[j] = data.units[i];
                add = 0;
                //console.log("should never see this twice");
            }
        }
        if (add) {
              console.log("should never see this twice");
            units.push(data.units[i]);
        }

    }

});

socket.on('message', function (data) {
    currentConnections = data;
});


function drawUnit(x) {

    //client
    ctx.font = "20px Arial";
    ctx.fillStyle = `rgba(255,0, 0, 1)`;
    ctx.beginPath();
    ctx.fillText(x.name, x.position.x - 40, x.position.y - 75);
    ctx.fillText("Position - (" + Math.floor(x.position.x) + "," + Math.floor(x.position.y) + ")", x.position.x - 40, x.position.y - 50);
    ctx.fillStyle = `rgba(0,255, 0, 0.3)`;
    ctx.arc(x.position.x, x.position.y, x.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    ////server
    //ctx.fillStyle = `rgba(0,0, 255, 1)`;
    //ctx.beginPath();
    //ctx.fillText("ServerPosition - (" + newPosx + "," + newPosy + ")", x - 100, y - 75);
    //ctx.arc(newPosx, newPosy, radius, 0, 2 * Math.PI);
    //ctx.closePath();
    //ctx.fill();

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


function Graphics() {
    this.init = function () {

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