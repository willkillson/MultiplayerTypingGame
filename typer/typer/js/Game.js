

var inputTextValue = "";//creates a global Javascript variable
var processText = "";

window.onkeyup = keyup;//creates a listener for when you press a key



var fire = new Howl({
    src: ['https://s1.vocaroo.com/media/download_temp/Vocaroo_s1wV49PmAmcq.mp3']
});

var reload = new Howl({

    src: ['https://s1.vocaroo.com/media/download_temp/Vocaroo_s1l4XKouwgGw.mp3']
});

var squish = new Howl({

    src: ['https://s0.vocaroo.com/media/download_temp/Vocaroo_s0pREe78G5sf.mp3']
});


function keyup(e) {
    
    if (e.keyCode == 13) {
        processText = inputTextValue;
        inputTextValue = "";
        reload.play();
        return;
    }

    if (e.keyCode == 37) {
        inputTextValue = "_PlayerMovement_left";
        return;
    }
    if (e.keyCode == 38) {
        inputTextValue = "_PlayerMovement_up";
        return;
    }
    if (e.keyCode == 39) {
        inputTextValue = "_PlayerMovement_right";
        return;
    }
    if (e.keyCode == 40) {
        inputTextValue = "_PlayerMovement_down";
        return;
    }

    fire.play();
    console.log("Playing fire sound");
    inputTextValue += String.fromCharCode(e.keyCode);
    
}

function Game() {

    var level = 1;
    var inputTextSize = 30;
    var textPos = new Vec2(100 ,700);
    var units = new Array();

    var player = new Player();


    this.init = function () {
        //this.canvasHeight = 800;
        //this.canvasWidth = 600;

        for (let i = 0; i < 1; i++) {
            let unit = new Unit();
            unit.init(600*Math.random(), 800*Math.random(), 1*Math.random(), 1*Math.random(),"Q"+i,600,800);
            units.push(unit);
        }

        player.init(600 / 2, 800 / 2, 600, 800);



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
                squish.play();
                processText = "";
                units.splice(i, 1);
            }
            else {
                units[i].update();
            }
 
        }

        player.update();


    }
    this.composeFrame = function () {
        for (let i = 0; i < units.length; i++) {
            units[i].draw();
        }


        player.draw();


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

function Player() {
    this.position;
    
    this.boundx;
    this.boundy;

    this.isAlive;

    this.init = function (x, y, bx, by) {
        this.position = new Vec2(x, y);
        this.boundx = bx;
        this.boundy = by;

        this.isAlive = 1;
    }
    this.update = function () {

        switch (inputTextValue) {
            case "_PlayerMovement_right":
                inputTextValue = "";
                this.position.x += 40;
                break;
            case "_PlayerMovement_up":
                inputTextValue = "";
                this.position.y -= 40;
                break;
            case "_PlayerMovement_down":
                inputTextValue = "";
                this.position.y += 40;
                break;
            case "_PlayerMovement_left":
                inputTextValue = "";
                this.position.x -= 40;
                break;
        }


        ////bounds x right side
        //if (this.position.x >= this.boundx) {
        //    this.position.x = this.boundx;
        //    this.velocity.x = this.velocity.x * -1;
        //}
        //if (this.position.x <= 0) {
        //    this.position.x = 0;
        //    this.velocity.x = this.velocity.x * -1;
        //}
        //if (this.position.y >= this.boundy) {
        //    this.position.y = this.boundy;
        //    this.velocity.y = this.velocity.y * -1;
        //}
        //if (this.position.y <= 0) {
        //    this.position.y = 0;
        //    this.velocity.y = this.velocity.y * -1;
        //}

    }
    this.draw = function () {

        ctx.beginPath();
        ctx.strokeStyle = 'green';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 25, 0, 2 * Math.PI);
        ctx.stroke();
    }

}

function Vec2(x, y) {
    this.x = x;
    this.y = y;
}
