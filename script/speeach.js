
document.getElementById('start-speech').onclick = function () {
    startSpeech();
}

function startSpeech() {

    let speech = new SpeechSynthesisUtterance();

    speech.lang = "en-US";
    speech.text = "Hello Word";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
    alert(speech.text);

}



