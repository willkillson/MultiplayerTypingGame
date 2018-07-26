console.log("Graphics.js loaded");

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

function Graphics() {

    this.canvasHeight = 1000;
    this.canvasWidth = 1500;

    var totalFrames;

    var fps;

    var runningTime=0;

    var deltaTime;
    var timeOne;
    var timeTwo;

    var game;


    this.init = function () {

        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        game = new Game();

        game.init();
        console.log(game);
    }

    function mainLoop() {
        //console.log("running time" + runningTime);
        timeOne = performance.now();

        //console.log(deltaTime);

        game.updateModel();

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);//clears frame


        game.composeFrame();

        
        timeTwo = performance.now();
        deltaTime = timeTwo - timeOne;
        runningTime += deltaTime*0.001;
        requestAnimationFrame(mainLoop);
    }
    requestAnimationFrame(mainLoop);


}

