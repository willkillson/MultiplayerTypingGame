

//Local modules
const Dictionary = require('./assets/Dictionary');
const Vec2 = require('./assets/WilkiMath');
var dictionary = new Dictionary();

//imported modules
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//routeing
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/asset/Dictionary.js', function (req, res) {
    res.sendFile(__dirname + '/assets/Dictionary.js');
});
app.get('/assets/WilkiMath.js', function (req, res) {
    res.sendFile(__dirname + '/assets/WilkiMath.js');
});
app.get('/assets/howler.js', function (req, res) {
    res.sendFile(__dirname + '/assets/howler.js');
});
app.get('/assets/Sound.js', function (req, res) {
    res.sendFile(__dirname + '/assets/Sound.js');
});
app.get('/assets/Keyboard.js', function (req, res) {
    res.sendFile(__dirname + '/assets/Keyboard.js');
});
app.get('/assets/Game.js', function (req, res) {
    res.sendFile(__dirname + '/assets/Game.js');
});
app.get('/assets/Graphics.js', function (req, res) {
    res.sendFile(__dirname + '/assets/Graphics.js');
});
app.get('/assets/main.js', function (req, res) {
    res.sendFile(__dirname + '/assets/main.js');
});

var unit = new Unit();
unit.init(200, 200, 5, 5, "This ball is updateing via the webserver.", 800, 600);

io.on('connection', function (socket) {
    socket.emit('init', {unit});

    setInterval(function () {
        socket.emit('init', { unit });
        socket.emit('message', { connections });
    }, 50);

    connections++;

    socket.on('disconnect', function () {
        let t = new Date();
        connections--;
    });
    socket.on('connect', function () {

        console.log('a user connected');
    });
});



http.listen(8080, function () {
    console.log('listening on *:8080');
});









setInterval(function () {
    let t = new Date();
    
    if (connections != connectionsChange) {
        console.log("ServerTime - " + t.getHours() + ":" + t.getMinutes());
        console.log("Connections - " + connections);
        connectionsChange = connections;
    }

}, 2000);


var connections = 0;
var connectionsChange = 0;
var players = new Array();





function Game() {


    var units = new Array();
 
    var level = new Level();
    var ui = new UserInterface();


    this.init = function () {

        //player.init(canvasDem / canvasCells / 2, canvasDem / canvasCells / 2, canvasDem, canvasDem);
        ui.init();
        level.init();



    }
    this.updateModel = function () {





        ////if (player.isAlive == 0) {
        ////    level.level = 0;
        ////    units = [];
        ////    player.respawn();
        ////}

        ////remake new units and increase level
        //if (units.length == 0) {
        //    level.level++;
        //    for (let i = 0; i < level.level; i++) {
        //        let unit = new Unit();
        //        unit.init(canvasDem * Math.random(), canvasDem * Math.random(), level.level * Math.random(), level.level * Math.random(), "Q" + i, canvasDem, canvasDem);
        //        units.push(unit);
        //    }
        //}





        ////process input and check against units
        //for (let i = 0; i < units.length; i++) {
        //    if (units[i].name == processText) {
        //        player.target = units[i];
        //        processText = "";
        //    }
        //    units[i].update();
        //}


        ////player.update();





        ////check to see if any units are colliding with the player
        ////for (let i = 0; i < units.length; i++) {
        ////    if (units[i].checkIfHittingPlayer(player)) {
        ////        units[i].isAlive = 0;
        ////        player.takeDamage(2);
        ////    }
        ////}

        ////check to see if any units have died and remove them
        //for (let i = 0; i < units.length; i++) {
        //    if (units[i].isAlive == 0) {
        //        units.splice(i, 1);
        //    }
        //}

        //frame += 1;

    }
}

setInterval(function () {
    unit.update();
},100);


//GameObjects

function UserInterface() {
    this.inputTextSize;
    this.textPos = new Vec2(50, 900);

    this.init = function () {
        this.inputTextSize = 30;

    }
}

function Level() {
    this.level;
    this.textSizeLevelDisplay;

    this.init = function (levelNum) {
        this.textSizeLevelDisplay = 30;
        this.level = 1;
    }

    this.restart = function () {
        this.level = 0;
    }
}

function Unit() {

    this.currentHealth;
    this.health;

    this.dictionary;

    this.name;
    this.position;
    this.velocity;

    this.radius;
    this.boundx;
    this.boundy;

    this.isAlive;



    this.init = function (x, y, velx, vely, name, bx, by) {
        this.position = new Vec2(x, y);
        this.velocity = new Vec2(velx, vely);
        this.name = name;
        this.boundx = bx;
        this.boundy = by;

        this.health = 2;//HARDCODE
        this.currentHealth = this.health;
        this.isAlive = 1;//HARDCODE
        this.radius = 25;


        this.dictionary = new Array();
        for (let i = 0; i < this.health; i++) {
            this.dictionary.push(dictionary[Math.floor(dictionary.length * Math.random())]);
        }

    }
    this.update = function () {
        if (this.currentHealth <= 0) {
            this.isAlive = 0;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        //bounds x right side
        if (this.position.x >= this.boundx - this.radius) {
            this.position.x = this.boundx - this.radius;
            this.velocity.x = this.velocity.x * -1;
        }
        if (this.position.x - this.radius <= 0) {
            this.position.x = this.radius;
            this.velocity.x = this.velocity.x * -1;
        }
        //south check
        if (this.position.y >= this.boundy - this.radius) {
            this.position.y = this.boundy - this.radius;
            this.velocity.y = this.velocity.y * -1;
        }

        if (this.position.y - this.radius <= 0) {
            this.position.y = this.radius;
            this.velocity.y = this.velocity.y * -1;
        }
        //console.log("x,y(" + this.position.x +", " + this.position.y+")");


    }


    //this.checkIfHittingPlayer = function (player) {
    //    if ((player.position.x + player.radius > this.position.x) && (player.position.x < player.radius + this.position.x)) {
    //        if ((player.position.y + player.radius > this.position.y) && (player.position.y < player.radius + this.position.y)) {
    //            return 1;
    //        }
    //    }
    //    return 0;
    //}

}

function Player() {

    this.spawnPosition;
    this.position;

    this.currentHealth;
    this.health;

    this.boundx;
    this.boundy;
    this.radius;

    this.target = null;

    this.isAlive;


    this.init = function (x, y, bx, by) {
        this.spawnPosition = new Vec2(120, 120);
        this.position = this.spawnPosition;
        this.boundx = bx;
        this.boundy = by;

        this.health = 10;
        this.currentHealth = this.health;

        this.radius = canvasDem / canvasCells;

        this.isAlive = 1;
    }
    this.update = function () {

        if (this.target != null) {
            if (this.target.isAlive == 0) {

                this.target = null;

            }
        }

        if (this.target != null) {
            if (this.target.dictionary[this.target.currentHealth - 1] == processText) {
                this.target.currentHealth--;
                processText = "";
            }

        }



        switch (processText) {
            case "_PlayerMovement_right":
                processText = "";
                if (this.position.x != 760) {
                    this.position.x += canvasDem / canvasCells;
                }


                break;
            case "_PlayerMovement_up":
                processText = "";
                if (this.position.y != 40) {
                    this.position.y -= canvasDem / canvasCells;
                }

                break;
            case "_PlayerMovement_down":
                processText = "";
                if (this.position.y != 760) {
                    this.position.y += canvasDem / canvasCells;
                }

                break;
            case "_PlayerMovement_left":
                processText = "";
                if (this.position.x != 40) {
                    this.position.x -= canvasDem / canvasCells;
                }

                break;
            case "FIRE":
                processText = "";
                if (this.target != null) {
                    this.target.currentHealth -= 1;
                }
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
    this.takeDamage = function (amount) {
        this.currentHealth -= amount;
        if (this.currentHealth <= 0) {
            this.isAlive = 0;
        }
    }
    this.respawn = function () {
        this.position = this.spawnPosition;
        this.isAlive = 1;
        this.currentHealth = this.health;
        this.target = null;
    }
}






















