


var fire = new Howl({
    src: ['https://s1.vocaroo.com/media/download_temp/Vocaroo_s1wV49PmAmcq.mp3']
});

var reload = new Howl({

    src: ['https://s1.vocaroo.com/media/download_temp/Vocaroo_s1l4XKouwgGw.mp3']
});

var squish = new Howl({

    src: ['https://s0.vocaroo.com/media/download_temp/Vocaroo_s0pREe78G5sf.mp3']
});



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
