

//Local modules
const Dictionary = require('./assets/Dictionary');
//const Vec2 = require('./assets/WilkiMath');
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


var level = 1;

var units = new Array();

for (let i = 0; i < level; i++) {
    let unit = new Unit();
    unit.init(Math.random() * 200, Math.random() * 200, Math.random()*10,  Math.random()*10, "Ball - " + i, 800, 600);
    units.push(unit);
}

io.on('connection', function (socket) {
    socket.emit('init', { units });

    setInterval(function () {
        socket.emit('init', { units });
        for (let i = 0; i < units.length; i++) {

            if (units[i].isAlive === 0) {
                units.splice(i, 1);

            }
            if (units.length === 0) {
                level++;
                if (level >= 100) {
                    level = 1;
                }
                for (let i = 0; i < level; i++) {
                    let unit = new Unit();
                    unit.init(Math.random() * 800, Math.random() * 600, Math.random() * 10, Math.random() * 10, "Ball - " + i, 800, 600);
                    units.push(unit);
                }
            }
        }

    }, 50);

    connections++;

    socket.on('kill', function (data) {
        //console.log("killing " + data);
        for (let i = 0; i < units.length; i++) {
            
            if (units[i].name === data) {

                units[i].isAlive = 0;
                //units.splice(i, 1);
    
            }
        }

    });

    socket.on('getupdate', () => {



    });

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

setInterval(function () {
    //update units

    for (let i = 0; i < units.length; i++) {
        units[i].update();
    }
}, 100);


//GameObjects

function Unit() {

    this.currentHealth;
    this.health;

    this.dictionary;

    this.name;
    this.position;
    this.newPosition;
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

        this.newPosition = new Vec2(x, y);

        //this.health = 2;//HARDCODE
        this.currentHealth = this.health;
        this.isAlive = 1;//HARDCODE
        this.radius = 25;


        //this.dictionary = new Array();
        //for (let i = 0; i < this.health; i++) {
        //    this.dictionary.push(dictionary[Math.floor(dictionary.length * Math.random())]);
        //}

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







function Vec2(x, y) {
    this.x = x;
    this.y = y;
}
















