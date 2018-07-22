function Game() {
    var units = new Array();
    this.init = function () {
        //this.canvasHeight = 800;
        //this.canvasWidth = 600;

        for (let i = 0; i < 10; i++) {
            let unit = new Unit();
            unit.init(600*Math.random(), 800*Math.random(), 1, 1,"Alavarius-"+i);
            units.push(unit);
        }
        console.log(units);
    }
    this.updateModel = function () {

    }
    this.composeFrame = function () {
        //ctx.beginPath();
        //ctx.font = "30px Arial";
        //ctx.fillStyle = "black";
        //ctx.fillText("Hellow World!", 400, 50);
        for (let i = 0; i < units.length; i++) {
            units[i].draw();
        }
    }

}

function Unit() {
    this.name;
    this.position;
    this.velocity;

    this.init = function(x,y,velx,vely,name){
        this.position = new Vec2(x, y);
        this.velocity = new Vec2(velx, vely);
        this.name = name;
    }
    this.update = function () {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    this.draw = function () {
        ctx.beginPath();
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(this.name, this.position.x, this.position.y);
    }

}

function Vec2(x,y) {
    this.x=x;
    this.y=y;
}