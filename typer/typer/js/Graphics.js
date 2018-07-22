var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

function Graphics() {

    this.canvasHeight = 800;
    this.canvasWidth = 600;

    var totalFrames;

    var fps;

    var deltaTime;
    var timeOne;
    var timeTwo;

    var game;

    this.init = function () {

        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        game = new Game();
    }

    function mainLoop() {
        deltaTime = timeTwo - timeOne;
        timeOne = performance.now();

        //console.log(deltaTime);

        game.updateModel();

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);//clears frame
        game.composeFrame();
        timeTwo = performance.now();
        requestAnimationFrame(mainLoop);
    }
    requestAnimationFrame(mainLoop);

    

}