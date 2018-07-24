
/*NOTES
 * 
 * Abilities
 * /////////////////
 * -Auto tab tracking
 * -chance to
 * -chain breaking forgiveness
 * 
 * Elemental Damage - these elements are based on chinese five element philosophy
 * //https://upload.wikimedia.org/wikipedia/commons/0/07/FiveElementsCycleBalanceImbalance.jpg
 * -wood
 * -water
 * -fire
 * -earth
 * -metal
 * 
 * Stats
 * //////
 * -shield
 * -armor
 * -more health
 * -critical%
 * -damage
 * -chain multiplier (might go hand in hand with critical%)
 * 
 * Resistances
 * -wood
 * -water
 * -metal
 * -earth
 * -fire
 * 
 * 
 */





function Game() {


    var units = new Array();

    var player = new Player();
    var level = new Level();
    var ui = new UserInterface();

    this.init = function () {
        //this.canvasHeight = 800;
        //this.canvasWidth = 600;

        for (let i = 0; i < 1; i++) {
            let unit = new Unit();
            unit.init(600*Math.random(), 800*Math.random(), 1*Math.random(), 1*Math.random(),"Q"+i,600,800);
            units.push(unit);
        }

        player.init(50, 50 , 600, 800);
        ui.init();
        level.init();



    }
    this.updateModel = function () {


        for (let i = 0; i < units.length; i++) {

    
            if (units[i].name == processText) {
                player.target =  units[i];
                //console.log("Killing " + units[i].name);
                //squish.play();
                processText = "";
      
                //units.splice(i, 1);

            }
            units[i].update();
        }
        player.update();


        if (units.length == 0) {
            level.level++;
            for (let i = 0; i < level.level; i++) {
                let unit = new Unit();
                unit.init(600 * Math.random(), 800 * Math.random(), level.level * Math.random(), level.level* Math.random(), "Q" + i, 600, 800);
                units.push(unit);
            }
        }



        for (let i = 0; i < units.length; i++) {
            if (units[i].isAlive == 0) {


                units.splice(i, 1);

            }
        }
    }
    this.composeFrame = function () {
        for (let i = 0; i < units.length; i++) {
            units[i].draw();
        }



        player.draw();
        ui.draw();
        level.draw();





    }

}




//GameObjects

function UserInterface() {
    this.inputTextSize;
    this.textPos = new Vec2(100, 700);

    this.init = function () {
        this.inputTextSize = 30;

    }
    this.draw = function(){

        //keyboardInput
        ctx.beginPath();
        ctx.font = "" + this.inputTextSize + "px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText(inputTextValue, this.textPos.x, this.textPos.y);

    }
}

function Level() {
    this.level;
    this.textSizeLevelDisplay;

    this.init = function (levelNum) {
        this.textSizeLevelDisplay = 30;
        this.level = 1;
    }

    this.draw = function(){
        //leveldisplay
        ctx.beginPath();
        ctx.font = "" + this.textSizeLevelDisplay + "px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Level - " + this.level, 450, 50);

        //boundary
        ctx.beginPath();
        ctx.strokeStyle = 'brown';
        ctx.moveTo(0, 0);
        ctx.lineTo(600, 0);
        ctx.moveTo(600, 0);
        ctx.lineTo(600, 800);
        ctx.moveTo(600, 800);
        ctx.lineTo(0, 800);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 800);
        ctx.stroke();


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



    this.init = function(x,y,velx,vely,name,bx,by){
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
        console.log(this.dictionary);
    }
    this.update = function () {
        if (this.currentHealth <= 0) {
            this.isAlive = 0;
            console.log(this.name +" is dead");
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        //bounds x right side
        if (this.position.x >= this.boundx - this.radius) {
            this.position.x = this.boundx - this.radius;
            this.velocity.x = this.velocity.x*-1;
        }
        if (this.position.x - this.radius <= 0) {
            this.position.x = this.radius;
            this.velocity.x = this.velocity.x * -1;
        }
        if (this.position.y + this.radius >= this.boundy) {
            this.position.y = this.boundy - this.radius;
            this.velocity.y = this.velocity.y * -1;
        }
        if (this.position.y - this.radius <= 0) {
            this.position.y = this.radius;
            this.velocity.y = this.velocity.y * -1;
        }

    }
    this.draw = function () {

        //display name
        ctx.beginPath();
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(this.name, this.position.x - 25, this.position.y - 30);


        //display health
        ctx.beginPath();
        ctx.font = "10px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("HP - " + this.currentHealth, this.position.x - 22, this.position.y + 5);


        //avatar
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

}

function Player() {
    this.position;

    this.currentHealth;
    this.health;
    
    this.boundx;
    this.boundy;

    this.target = null;

    this.isAlive;



    this.init = function (x, y, bx, by) {
        this.position = new Vec2(x, y);
        this.boundx = bx;
        this.boundy = by;

        this.health = 10;
        this.currentHealth = this.health;

        this.isAlive = 1;
    }
    this.update = function () {

        if (this.target != null) {
            if (this.target.isAlive == 0) {

                this.target = null;

            }


     

        }

        if (this.target != null) {
            //console.log(processText);

            //console.log(this.target.dictionary[1]);
            if (this.target.dictionary[this.target.currentHealth - 1] == processText) {
                this.target.currentHealth--;
                processText = "";
            }
       
        }



        switch (processText) {
            case "_PlayerMovement_right":
                processText = "";
                this.position.x += 50;
                break;
            case "_PlayerMovement_up":
                processText = "";
                this.position.y -= 50;
                break;
            case "_PlayerMovement_down":
                processText = "";
                this.position.y += 50;
                break;
            case "_PlayerMovement_left":
                processText = "";
                this.position.x -= 50;
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
    this.draw = function () {

        if (this.target != null) {

            //display target line
            ctx.beginPath();
            ctx.strokeStyle = 'purple';
            ctx.moveTo(this.position.x, this.position.y);
            ctx.lineTo(this.target.position.x, this.target.position.y);
            ctx.stroke();


            //display dictionary
            ctx.beginPath();
            ctx.font = "20px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(this.target.dictionary[this.target.currentHealth-1], this.position.x - 25, this.position.y - 30);


            //display word count
            ctx.beginPath();
            ctx.font = "10px Arial";
            ctx.fillStyle = "black";
            ctx.fillText("word: " + this.target.currentHealth + " - " + this.target.health, this.position.x - 25, this.position.y - 60);
        }


        //display health
        ctx.beginPath();
        ctx.font = "10px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("HP - " + this.currentHealth, this.position.x - 22, this.position.y + 5);

        //display character avatar
        ctx.beginPath();
        ctx.strokeStyle = 'green';
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 25, 0, 2 * Math.PI);
        ctx.stroke();
    }

}

//Dictionary

var dictionary = new Array();

dictionary.push("grouchy");
dictionary.push("care");
dictionary.push("match");
dictionary.push("weary");
dictionary.push("snails");
dictionary.push("market");
dictionary.push("mature");
dictionary.push("lethal");
dictionary.push("abortive");
dictionary.push("poop");
dictionary.push("crap");
dictionary.push("pain");
dictionary.push("skirt");
dictionary.push("puzzled");
dictionary.push("bump");
dictionary.push("tail");
dictionary.push("jazzy");
dictionary.push("stick");
dictionary.push("endurable");
dictionary.push("black");
dictionary.push("rural");
dictionary.push("faithful");
dictionary.push("cabbage");
dictionary.push("crate");
dictionary.push("talk");
dictionary.push("guarded");
dictionary.push("breakable");
dictionary.push("harmonious");
dictionary.push("furniture");
dictionary.push("debonair");
dictionary.push("thirsty");
dictionary.push("planes");
dictionary.push("change");
dictionary.push("first");
dictionary.push("bubble");
dictionary.push("sister");
dictionary.push("roof");
dictionary.push("thought");
dictionary.push("sparkling");
dictionary.push("adjoining");
dictionary.push("terrible");
dictionary.push("launch");
dictionary.push("comb");
dictionary.push("foregoing");
dictionary.push("skinny");
dictionary.push("ten");
dictionary.push("rice");
dictionary.push("girls");
dictionary.push("productive");
dictionary.push("poke");
dictionary.push("guard");
dictionary.push("mass");
dictionary.push("jail");
dictionary.push("disappear");
dictionary.push("letter");
dictionary.push("flower");
dictionary.push("idea");
dictionary.push("furtive");
dictionary.push("prickly");
dictionary.push("capable");
dictionary.push("seemly");
dictionary.push("loving");


for (let i = 0; i < dictionary.length; i++) {
    dictionary[i] = dictionary[i].toUpperCase();
}