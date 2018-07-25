var inputTextValue = "";//creates a global Javascript variable
var processText = "";
window.onkeyup = keyup;//creates a listener for when you press a key
window.onkeydown = keydown;

var isShifted = 0;


function keyup(e) {


    if (e.keyCode == 16) {//shift modifier
        isShifted = 0;
    }




    if (e.keyCode == 13) {
        processText = inputTextValue;
        inputTextValue = "";
        reload.play();
        return;
    }
    console.log(e.keyCode);


    if (isShifted) {

        if (e.keyCode == 65) {
            processText = "_PlayerMovement_left";
            return;
        }
        if (e.keyCode == 87) {
            processText = "_PlayerMovement_up";
            return;
        }
        if (e.keyCode == 68) {
            processText = "_PlayerMovement_right";
            return;
        }
        if (e.keyCode == 83) {
            processText = "_PlayerMovement_down";
            return;
        }
    }
    else {
        if (e.keyCode == 37) {
            processText = "_PlayerMovement_left";
            return;
        }
        if (e.keyCode == 38) {
            processText = "_PlayerMovement_up";
            return;
        }
        if (e.keyCode == 39) {
            processText = "_PlayerMovement_right";
            return;
        }
        if (e.keyCode == 40) {
            processText = "_PlayerMovement_down";
            return;
        }

    }


    if (e.keyCode == 8) {
        inputTextValue = inputTextValue.slice(0, inputTextValue.length - 1);
        return;
    }

    if ((e.keyCode >= 48) && (e.keyCode <= 90)) {
        fire.play();
        inputTextValue += String.fromCharCode(e.keyCode);

    }


}

function keydown(e) {

    if (e.keyCode == 16) {//shift modifier
        isShifted = 1;
    }


}
