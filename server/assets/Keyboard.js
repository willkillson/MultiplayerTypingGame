console.log("Keyboard.js loaded");

var inputTextValue = "";//creates a global Javascript variable
var processText = "";
window.onkeyup = keyup;//creates a listener for when you press a key

function keyup(e) {

    if (e.keyCode == 13) {
        processText = inputTextValue;
        inputTextValue = "";
        reload.play();
        return;
    }

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

    if (e.keyCode == 8) {
        inputTextValue = inputTextValue.slice(0, inputTextValue.length - 1);
        return;
    }

    fire.play();
    console.log("Playing fire sound");
    inputTextValue += String.fromCharCode(e.keyCode);

}
