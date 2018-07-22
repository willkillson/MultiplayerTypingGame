var inputTextValue = "";//creates a global Javascript variable
var processText = "";

window.onkeyup = keyup;//creates a listener for when you press a key

function keyup(e) {
    if (e.keyCode == 13) {
        processText = inputTextValue;
        inputTextValue = "";


    }
    else {
        inputTextValue += String.fromCharCode(e.keyCode);
    }
}

function Game() {

    var inputTextSize = 30;
    var textPos = new Vec2(100 ,700);
    var units = new Array();

    this.init = function () {
        //this.canvasHeight = 800;
        //this.canvasWidth = 600;

        for (let i = 0; i < 10; i++) {
            let unit = new Unit();
            unit.init(600*Math.random(), 800*Math.random(), 1*Math.random(), 1*Math.random(),"Q"+i,600,800);
            units.push(unit);
        }



    }
    this.updateModel = function () {

        for (let i = 0; i < units.length; i++) {
            if (units[i].name == processText) {
                console.log("Killing " + units[i].name);
                processText = "";
                units.splice(i, 1);
            }
            else {
                units[i].update();
            }
 
        }

    }
    this.composeFrame = function () {
        for (let i = 0; i < units.length; i++) {
            units[i].draw();
        }

        ctx.beginPath();

        ctx.font = "" + inputTextSize+"px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText(inputTextValue, textPos.x, textPos.y);

    }

}

function Unit() {
    this.name;
    this.position;
    this.velocity;

    this.boundx;
    this.boundy;

    this.isAlive;

    this.init = function(x,y,velx,vely,name,bx,by){
        this.position = new Vec2(x, y);
        this.velocity = new Vec2(velx, vely);
        this.name = name;
        this.boundx = bx;
        this.boundy = by;

        this.isAlive = 1;
    }
    this.update = function () {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        //bounds x right side
        if (this.position.x >= this.boundx) {
            this.position.x = this.boundx;
            this.velocity.x = this.velocity.x*-1;
        }
        if (this.position.x <= 0) {
            this.position.x = 0;
            this.velocity.x = this.velocity.x * -1;
        }
        if (this.position.y >= this.boundy) {
            this.position.y = this.boundy;
            this.velocity.y = this.velocity.y * -1;
        }
        if (this.position.y <= 0) {
            this.position.y = 0;
            this.velocity.y = this.velocity.y * -1;
        }

    }
    this.draw = function () {
        ctx.beginPath();
        ctx.font = "11px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(this.name, this.position.x, this.position.y);
    }

}

function Vec2(x,y) {
    this.x=x;
    this.y=y;
}