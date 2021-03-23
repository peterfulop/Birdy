function excerciseLoadSettings() {

    Menu_Clear_MainContent();

    createDictionaryDDList(mainContent);
    createExcerciseTypeDDList(mainContent);
    createExcerciseRunTimeDDList(mainContent);
    createExcerciseStartButton(mainContent);

    dictionaryNameSelect = document.querySelector("#dictionary-name-select");
    excerciseNameSelect = document.querySelector("#excercise-name-select");
    runtimeNameSelect = document.querySelector("#runtime-name-select");
    setCountManual = document.querySelector("#set-word-count-input");
    excerciseStartButton = document.querySelector("#excercise-button-start");

    dictionaryNameSelectmethod();
    excerciseNameSelectmethod();
    runtimeNameSelectmethod();
    validateCountInput();
    excerciseStartSelectmethod();
    defineExcercise();

}


function createDictionaryDDList(contener) {

    contener.innerHTML += `
        <div class= "select-dictionary mb-3">
            <label for="dictionary-name-select" class="form-label">Válassz egy szótárt:</label>
            <select class="form-select" id="dictionary-name-select">
            </select>
        </div>
        `
    loadDictionarySelector();
}

function loadDictionarySelector() {

    state.dictionaries.sort(compareValues("dictionaryName", "asc"));

    var content = document.querySelector("#dictionary-name-select");
    content.innerHTML = '';
    counter = 0;

    Object.values(state.dictionaries).map(item => {
        content.innerHTML += `<option value = "${counter}" data-dictid="${item.autoID}">${item.dictionaryName}</option>`;
        counter++;
    });

    dictionaryNameSelect = document.querySelector("#dictionary-name-select");
}

function dictionaryNameSelectmethod() {
    dictionaryNameSelect.addEventListener("change", () => {
        console.log(dictionaryNameSelect.value);
        updateRunTimeCount();
    })
}

/* ******************************************************************************************* */


/* Gyakorlás típuslista létrehozása, és feltöltése *********************************************/

function createExcerciseTypeDDList(contener) {

    contener.innerHTML += `
    <div class= "select-dictionary mb-3">
            <label for="" class="form-label">Gyakorlási forma:</label>
            <select class="form-select" id="excercise-name-select">
            </select>
        </div>
        `
    loadExcerciseSelector();
}

function loadExcerciseSelector() {

    var content = document.querySelector("#excercise-name-select");
    content.innerHTML = '';
    Object.values(excerciseTypes).map(item => {
        content.innerHTML += `<option value = "${item.value}">${item.name}</option>`;
    });
}
function excerciseNameSelectmethod() {
    excerciseNameSelect.addEventListener("change", () => {

        console.log(excerciseNameSelect.value);
    })
}


function createExcerciseRunTimeDDList(contener) {

    var wordCount = setEnabledWordsCount();

    contener.innerHTML += `
    <div class= "select-dictionary mb-3">
            <label for="" class="form-label">Gyakorlás hossza:</label>
            <select class="form-select" id="runtime-name-select">
            </select>
        </div>
        <div class="mb-3 dislay-none" id="set-word-count-section">
            <label for="" class="form-label">Kikérdezett szavak mennyisége:</label>
            <input type="number" class="form-control " id="set-word-count-input" max="${wordCount}" min="1" value = "${wordCount}">
        </div>
    `
    loadRunTimeSelector();

}

function updateRunTimeCount() {

    var wordCount = setEnabledWordsCount();
    console.log("frissítem! Max: " + wordCount);

    setCountManual.max = wordCount;
    setCountManual.value = wordCount;

    // frissítés
    defineExcercise();

}

function loadRunTimeSelector() {

    var content = document.querySelector("#runtime-name-select");
    content.innerHTML = '';
    Object.values(excerciseRunTime).map(item => {
        content.innerHTML += `<option value="${item.value}">${item.name}</option>`;
    });
}

function runtimeNameSelectmethod() {

    var countManualBox = document.querySelector("#set-word-count-section");
    var wordCount = setEnabledWordsCount();

    runtimeNameSelect.addEventListener("change", () => {

        if (runtimeNameSelect.value == 1) {
            countManualBox.classList.remove("dislay-none");
            // Érték adása az input boxhoz!
            setCountManual.value = wordCount;
            updateRunTimeCount();
        }
        else {
            countManualBox.classList.add("dislay-none");
        }
    })
}

function validateCountInput() {

    setCountManual.addEventListener("change", () => {

        var maxValue = setEnabledWordsCount();

        if (setCountManual.value > maxValue) {
            setCountManual.value = maxValue;
        }
        if (setCountManual.value <= 0) {
            setCountManual.value = 1;
        }
        defineExcercise();
        console.log(excInfo.countIndex);

    })

    // frissítés


}

function createExcerciseStartButton(contener) {

    contener.innerHTML += `
    <div class="excercise-header-start">
        <button class="btn btn-success" id="excercise-button-start" type="">Start!</button>
    </div>`
}

function excerciseStartSelectmethod() {

    excerciseStartButton.addEventListener("click", () => {

        defineExcercise();
        displayExcerciseContainer();
        startExcerciseMethod();
        console.log(excInfo.countIndex);

    })

}

var defineExcercise = () => {

    state.dictionaryID = dictionaryNameSelect.value;
    state.selectedDictionary = dictionaryNameSelect[dictionaryNameSelect.value].dataset.dictid;
    state.dictionaryName = dictionaryNameSelect[dictionaryNameSelect.value].textContent;

    return excInfo = {
        maxValue: state.dictionaries[dictionaryNameSelect.value].lexicon.length,
        dictionary: dictionaryNameSelect.value,
        excIndex: excerciseNameSelect.value,
        timeIndex: runtimeNameSelect.value,
        countIndex: setCountManual.value
    };
}

/* ******************************************************************************************* */


function setEnabledWordsCount() {
    return state.dictionaries[dictionaryNameSelect.value].lexicon.length;
}

function randomIntGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/* EXCERCISE metódus felépítése ******************************************************************/

var indexPuffer = [];

var questionBox;
var questionBoxText;

var answerBox;
var answerBoxText;

var excerciseInputSection;
var answerBoxInput;
var answerBoxAcceptButton;

var minutesLabel;
var secondsLabel;

var numberOfExcercise;
var countOfNumbers;

function displayExcerciseContainer() {


    Menu_Clear_MainContent();

    mainContent.innerHTML = `
        <div class="excercise-box">
                <div class="excercise-header-info">
                    <div class="header-section-text-1">
                        <label id="minutes">00</label>:<label id="seconds">00</label>
                    </div>

                    <div class="header-section-text-2">
                        <span id="number-of-excercise">1</span>/<span id="count-of-numbers">1</span>
                    </div>

                    <div class="header-section-text-3">
                        <span>0</span><i class="fas fa-star" id="point-star-icon"></i>
                    </div>
                </div>

                <div class="question-answer-boxes">
                    <div class="questions-section-box">
                        <div class="d-flex align-items-center question-box-value">
                            <p data-lang=""></p>
                            <i class="fas fa-volume-up listening-mode" id="listening-mode-brain"></i>
                        </div>
                    </div>

                    <div class="answer-section-box">
                        <div class="answer-box-value hidden">
                            <p></p>
                        </div>
                    </div>
                </div>

                <div class="excercise-input-section">
                    <div class="answer-box-input">
                        <input type="text" class="form-control" id="answer-box-input" value=""  tabindex="0" required>
            </div>
                        <div class="button-box">
                            <div class="answer-box-button-left">
                                <button class="btn btn-success" id="answer-button-accept"
                                    type="button">Tovább!</button>
                                <button class="btn btn-secondary" id="answer-button-next" type="button"><i
                                    class="fas fa-step-forward"></i></button>
                                <button class="btn btn-danger" id="stop-excercise" data-bs-toggle="modal" data-bs-target="#${dialogObjects[1].id}" type="button"><i class="fas fa-stop"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
    `

    questionBox = document.querySelector(".question-box-value");
    questionBoxText = document.querySelector(".question-box-value > p");

    answerBox = document.querySelector(".answer-box-value");
    answerBoxText = document.querySelector(".answer-box-value > p");

    excerciseInputSection = document.querySelector(".excercise-input-section");
    answerBoxInput = document.getElementById("answer-box-input");
    answerBoxAcceptButton = document.getElementById("answer-button-accept");

    minutesLabel = document.getElementById("minutes");
    secondsLabel = document.getElementById("seconds");

    numberOfExcercise = document.getElementById("number-of-excercise");
    countOfNumbers = document.getElementById("count-of-numbers");


    var listeningModeBtn = document.getElementById("listening-mode-brain");
    listeningModeBtn.onclick = function () {
        startSpeech(questionBoxText.dataset.lang, questionBoxText.innerText);
    }

    var stopExcercise = document.getElementById("stop-excercise");

    stopExcercise.onclick = function () {

        document.getElementById('dialogAcceptButton').addEventListener('click', () => {
            menu_load_brainteaser();
        })

    }


}


var totalSeconds = 0;

function setTime() {

    ++totalSeconds;

    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));

}

function pad(val) {

    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }

}

function clearExcercisePuffers() {
    indexPuffer = [];
    totalSeconds = 0;
}

function startExcerciseMethod() {
    showDialogPanel(1);

    clearExcercisePuffers();
    askSomething();
    skipAnswer();
    answerEventClick();
    answerEventEnter();

    setInterval(setTime, 1000);

}

function askSomething() {

    var maxNumber = excInfo.timeIndex === 0 ? excInfo.maxNumber : excInfo.countIndex;
    var randomIndex = randomIntGenerator(0, maxNumber - 1);

    if (excInfo.timeIndex == 2 && indexPuffer.length == maxNumber) {

        clearExcercisePuffers();
        maxNumber = excInfo.timeIndex === 0 ? excInfo.maxNumber : excInfo.countIndex;
        randomIndex = randomIntGenerator(0, maxNumber - 1);
    }

    console.log("indexPuffer: " + indexPuffer.length);


    if (indexPuffer.length == maxNumber) {
        alert("Nincs több kérdés!");
    }
    else {

        hideQuestionBox();

        while (indexPuffer.includes(randomIndex)) {
            randomIndex = randomIntGenerator(0, maxNumber - 1);
        }

        indexPuffer.push(randomIndex);


        var randomText = [];
        randomText.push(state.dictionaries[excInfo.dictionary].lexicon[randomIndex].word_1);
        randomText.push(state.dictionaries[excInfo.dictionary].lexicon[randomIndex].word_2);

        var questionIndex = excInfo.excIndex == 2 ? randomIntGenerator(0, 1) : excInfo.excIndex;

        console.log("question: " + randomText[0] + ' - ' + randomText[1]);

        questionBoxText.innerHTML = randomText[questionIndex];

        var speachLangIndex = state.dictionaries[excInfo.dictionary].lexicon[randomIndex];
        questionBoxText.dataset.lang = questionIndex == 0 ? speachLangIndex.lang_1 : speachLangIndex.lang_2;

        numberOfExcercise.innerHTML = indexPuffer.length;
        countOfNumbers.innerHTML = maxNumber;

        showQuestionBox();
        answerBoxInput.focus();

    }

}


function answerEventClick() {
    answerBoxAcceptButton.addEventListener('click', () => {
        if (answerBoxInput.value != "") {
            sendAnswer();
        }
    })
}

function answerEventEnter() {
    answerBoxInput.addEventListener("keyup", (event) => {
        if (answerBoxInput.value != "" && event.keyCode === 13) {
            sendAnswer();
            console.log("enter")
        }
    })
}


function skipAnswer() {

    var skipButton = document.querySelector('#answer-button-next');

    skipButton.addEventListener('click', () => {
        answerBox.classList.remove('hidden');
        answerBoxText.innerHTML = answerBoxInput.value;
        answerBoxInput.value = "";
        hideAnswerBox();
        askSomething();
    });
}


function sendAnswer() {

    answerBox.classList.remove('hidden');
    answerBoxText.innerHTML = answerBoxInput.value;
    answerBoxInput.value = "";
    setTimeout(hideAnswerBox, 1000);
    setTimeout(askSomething, 1000);
}


function answerValidation(userinput) {
    console.log(userinput);
};

function hideAnswerBox() {
    answerBox.classList.add('hidden');
}

function hideQuestionBox() {
    questionBox.classList.add("dislay-none");
}

function showQuestionBox() {
    questionBox.classList.remove("dislay-none");
}