function Game() {

    this.updateModel = function () {
        
    }
    this.composeFrame = function () {
        ctx.beginPath();
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Hellow World!", 400, 50);
    }

}

function Unit() {
    this.position;
    this.velocity;

    this.init = function(x,y,velx,vely){
        this.position = new Vec2(x, y);
        this.velocity = new Vec2(velx, vely);
    }
    this.update = function(){

    }

}

function Vec2(x,y) {
    this.x=x;
    this.y=y;
}