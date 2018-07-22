function Game() {
    var units = new Array();
    this.init = function () {
        //this.canvasHeight = 800;
        //this.canvasWidth = 600;

        for (let i = 0; i < 10; i++) {
            let unit = new Unit();
            unit.init(600*Math.random(), 800*Math.random(), 5*Math.random(), 5*Math.random(),"Alavarius-"+i,600,800);
            units.push(unit);
        }
        console.log(units);
    }
    this.updateModel = function () {

        for (let i = 0; i < units.length; i++) {
            units[i].update();
        }
    }
    this.composeFrame = function () {
        for (let i = 0; i < units.length; i++) {
            units[i].draw();
        }
    }

}

function Unit() {
    this.name;
    this.position;
    this.velocity;

    this.boundx;
    this.boundy;

    this.init = function(x,y,velx,vely,name,bx,by){
        this.position = new Vec2(x, y);
        this.velocity = new Vec2(velx, vely);
        this.name = name;
        this.boundx = bx;
        this.boundy = by;
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