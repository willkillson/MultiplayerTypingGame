var inputTextValue = "";//creates a global Javascript variable
var processText = "";

window.onkeyup = keyup;//creates a listener for when you press a key



var fire = new Howl({
    src: ['https://s1.vocaroo.com/media/download_temp/Vocaroo_s1wV49PmAmcq.mp3']
});

var reload = new Howl({

    src: ['https://s1.vocaroo.com/media/download_temp/Vocaroo_s1l4XKouwgGw.mp3']
});

function keyup(e) {
    if (e.keyCode == 13) {
        processText = inputTextValue;
        inputTextValue = "";
        reload.play();
    }
    else {
        fire.play();
        console.log("Playing fire sound");
        inputTextValue += String.fromCharCode(e.keyCode);

    }
}

function Game() {

    var level = 1;
    var inputTextSize = 30;
    var textPos = new Vec2(100 ,700);
    var units = new Array();


    var dots = new Array();

    this.init = function () {
        //this.canvasHeight = 800;
        //this.canvasWidth = 600;

        for (let i = 0; i < 1; i++) {
            let unit = new Unit();
            unit.init(600*Math.random(), 800*Math.random(), 1*Math.random(), 1*Math.random(),"Q"+i,600,800);
            units.push(unit);
        }

        for (let i = 0; i < 100;i++)

        dot = new Dot();
        dot.init(500,400,0,0,600,800);

    }
    this.updateModel = function () {

        if (units.length == 0) {
            level++;
            for (let i = 0; i < level; i++) {
                let unit = new Unit();
                unit.init(600 * Math.random(), 800 * Math.random(), level * Math.random(), level* Math.random(), "Q" + i, 600, 800);
                units.push(unit);
            }
        }


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


        dot.draw();


        //keyboardInput
        ctx.beginPath();
        ctx.font = "" + inputTextSize+"px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText(inputTextValue, textPos.x, textPos.y);

        //leveldisplay
        ctx.beginPath();
        ctx.font = "" + inputTextSize + "px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Level - " + level, 450, 50);
        
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
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(this.name, this.position.x, this.position.y);
    }

}

function Dot() {
    this.position;
    this.velocity;

    this.boundx;
    this.boundy;

    this.isAlive;

    this.init = function (x, y, velx, vely, bx, by) {
        this.position = new Vec2(x, y);
        this.velocity = new Vec2(velx, vely);
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
            this.velocity.x = this.velocity.x * -1;
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
        ctx.strokeStyle = 'blue';
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x + 1, this.position.y + 1);
        ctx.stroke();
    }

}

function Vec2(x, y) {
    this.x = x;
    this.y = y;
}
