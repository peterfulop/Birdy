function brainTeaserScope() {

    let DOM = {};

    let defDOMelementss = () => {
        return {
            mainContent: document.querySelector(".main-content"),
            dictionaryNameSelect: document.getElementById("dictionary-name-select"),
            excerciseNameSelect: document.getElementById("excercise-name-select"),
            runtimeNameSelect: document.getElementById("runtime-name-select"),
            countManualBox: document.getElementById("set-word-count-section"),
            setCountManual: document.getElementById("set-word-count-input"),
            excerciseStartButton: document.getElementById("excercise-button-start"),
        }
    }

    function buildBrainTeaserPage() {

        renderBrainTeaserHTML();
        DOM = defDOMelementss();
        dictionaryNameSelectmethod();
        excerciseStartSelectmethod();
        runtimeNameSelectmethod();
        validateCountInput();

    }


    function renderBrainTeaserHTML() {

        const mainContent = document.querySelector(".main-content");
        const Global = GlobalObjectScope();

        Global.renderDictionaryListInput(mainContent);
        renderExcerciseTypeInput(mainContent);
        renderExcerciseRuntimeInput(mainContent);
        renderBrainTeaserStartButton(mainContent);

        function renderExcerciseTypeInput(contener) {

            contener.innerHTML += `
        <div class= "select-dictionary mb-3">
            <label for="" class="form-label">Gyakorlási forma:</label>
            <select class="form-select" id="excercise-name-select">
            </select>
        </div>
        `
            renderExcerciseTypeOptions();
        }
        function renderExcerciseTypeOptions() {
            const content = document.getElementById("excercise-name-select");
            content.innerHTML = '';
            Object.values(excerciseTypes).map(item => {
                content.innerHTML += `<option value = "${item.value}">${item.name}</option>`;
            });
        }

        function renderExcerciseRuntimeInput(contener) {

            var wordCount = setEnabledWordsCount();

            contener.innerHTML += `
            <div class= "select-dictionary mb-3">
                <label for="" class="form-label">Gyakorlás hossza:</label>
                <select class="form-select" id="runtime-name-select">
                </select>
            </div>
            <div class="mb-3 display-none" id="set-word-count-section">
                <label for="" class="form-label">Kikérdezett szavak mennyisége:</label>
                <input type="number" class="form-control " id="set-word-count-input" max="${wordCount}" min="1" value = "${wordCount}">
            </div>
            `
            renderExcerciseRuntimeOptions();
        }

        function renderExcerciseRuntimeOptions() {

            var content = document.getElementById("runtime-name-select");
            content.innerHTML = '';
            Object.values(excerciseRunTime).map(item => {
                content.innerHTML += `<option value="${item.value}">${item.name}</option>`;
            });
        }

        function renderBrainTeaserStartButton(contener) {

            contener.innerHTML += `
            <div class="excercise-header-start">
                <button class="btn btn-success" id="excercise-button-start" type="">Start!</button>
            </div>
            `
        }

    }


    function dictionaryNameSelectmethod() {

        DOM.dictionaryNameSelect.addEventListener("change", () => {
            console.log(DOM.dictionaryNameSelect.value);
            updateRunTimeCount();
        })
    }


    function excerciseStartSelectmethod() {

        DOM.excerciseStartButton.addEventListener("click", () => {
            defineExcercise();
            const excercise = BrainTeaserExcerciseScope();
            excercise.buildBrainTeaserExcercise();

        })
    }

    function updateRunTimeCount() {

        const wordCount = setEnabledWordsCount();

        console.log("frissítem! Max: " + wordCount);
        DOM.setCountManual.max = wordCount;
        DOM.setCountManual.value = wordCount;

        defineExcercise();
    }

    function setEnabledWordsCount() {

        let dictionaryNameSelect = document.getElementById("dictionary-name-select");
        return state.dictionaries[dictionaryNameSelect.value].lexicon.length;
    }

    var defineExcercise = () => {

        state.dictionaryID = DOM.dictionaryNameSelect.value;
        state.selectedDictionary = DOM.dictionaryNameSelect[DOM.dictionaryNameSelect.value].dataset.dictid;
        state.dictionaryName = DOM.dictionaryNameSelect[DOM.dictionaryNameSelect.value].textContent;

        return excInfo = {
            maxValue: state.dictionaries[DOM.dictionaryNameSelect.value].lexicon.length,
            dictionary: DOM.dictionaryNameSelect.value,
            excIndex: DOM.excerciseNameSelect.value,
            timeIndex: DOM.runtimeNameSelect.value,
            countIndex: DOM.setCountManual.value
        };
    }


    function runtimeNameSelectmethod() {

        const wordCount = setEnabledWordsCount();

        DOM.runtimeNameSelect.addEventListener("change", () => {

            if (DOM.runtimeNameSelect.value == 1) {
                DOM.countManualBox.classList.remove("display-none");
                DOM.setCountManual.value = wordCount;
                updateRunTimeCount();
            }
            else {
                DOM.countManualBox.classList.add("display-none");
                updateRunTimeCount();
            }
        })
    }

    function validateCountInput() {

        DOM.setCountManual.addEventListener("change", () => {

            var maxValue = setEnabledWordsCount();

            if (DOM.setCountManual.value > maxValue) {
                DOM.setCountManual.value = maxValue;
            }
            if (DOM.setCountManual.value <= 0) {
                DOM.setCountManual.value = 1;
            }
            defineExcercise();
            console.log(excInfo.countIndex);

        })

    }

    function renderBrainTeaserExcerciseHTML() {

        document.querySelector(".main-content").innerHTML = `
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
    };




    function BrainTeaserExcerciseScope() {

        let DOM = {};

        var defDOMelements = () => {
            return {
                questionBox: document.querySelector(".question-box-value"),
                questionBoxText: document.querySelector(".question-box-value > p"),
                answerBox: document.querySelector(".answer-box-value"),
                answerBoxText: document.querySelector(".answer-box-value > p"),
                excerciseInputSection: document.querySelector(".excercise-input-section"),
                answerBoxInput: document.getElementById("answer-box-input"),
                answerBoxAcceptButton: document.getElementById("answer-button-accept"),
                minutesLabel: document.getElementById("minutes"),
                secondsLabel: document.getElementById("seconds"),
                numberOfExcercise: document.getElementById("number-of-excercise"),
                countOfNumbers: document.getElementById("count-of-numbers"),
                indexPuffer: [],
                totalSeconds: 0
            }
        }

        function buildBrainTeaserExcercise() {

            renderBrainTeaserExcerciseHTML();
            DOM = defDOMelements();
            readExcerciseWord();
            startExcerciseMethod();
            stopBrainTeaserExcercise();
        };


        function readExcerciseWord() {
            const listeningModeBtn = document.getElementById("listening-mode-brain");
            listeningModeBtn.onclick = function () {
                startSpeech(DOM.questionBoxText.dataset.lang, DOM.questionBoxText.innerText);
            }
        }

        function clearExcercisePuffers() {
            DOM.indexPuffer = [];
            totalSeconds = 0;
        }

        function startExcerciseMethod() {

            const Global = GlobalObjectScope();
            Global.showDialogPanel(1);

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

            if (excInfo.timeIndex == 2 && DOM.indexPuffer.length == maxNumber) {
                console.log('restart progress!');
                clearExcercisePuffers();
                maxNumber = excInfo.timeIndex === 0 ? excInfo.maxNumber : excInfo.countIndex;
                randomIndex = randomIntGenerator(0, maxNumber - 1);
            }

            if (DOM.indexPuffer.length == maxNumber) {
                alert("Nincs több kérdés!");
            }
            else {

                hideQuestionBox();

                while (DOM.indexPuffer.includes(randomIndex)) {
                    randomIndex = randomIntGenerator(0, maxNumber - 1);
                }

                DOM.indexPuffer.push(randomIndex);

                var randomText = [];
                randomText.push(state.dictionaries[excInfo.dictionary].lexicon[randomIndex].word_1);
                randomText.push(state.dictionaries[excInfo.dictionary].lexicon[randomIndex].word_2);

                var questionIndex = excInfo.excIndex == 2 ? randomIntGenerator(0, 1) : excInfo.excIndex;

                DOM.questionBoxText.innerHTML = randomText[questionIndex];

                var speachLangIndex = state.dictionaries[excInfo.dictionary].lexicon[randomIndex];
                DOM.questionBoxText.dataset.lang = questionIndex == 0 ? speachLangIndex.lang_1 : speachLangIndex.lang_2;

                DOM.numberOfExcercise.innerHTML = DOM.indexPuffer.length;
                DOM.countOfNumbers.innerHTML = maxNumber;

                showQuestionBox();
                DOM.answerBoxInput.focus();

            }
        }

        function answerEventClick() {
            DOM.answerBoxAcceptButton.addEventListener('click', () => {
                if (DOM.answerBoxInput.value != "") {
                    sendAnswer();
                }
            })
        }

        function answerEventEnter() {
            DOM.answerBoxInput.addEventListener("keyup", (event) => {
                if (DOM.answerBoxInput.value != "" && event.keyCode === 13) {
                    sendAnswer();
                    console.log("enter")
                }
            })
        }

        function skipAnswer() {

            var skipButton = document.getElementById('answer-button-next');

            skipButton.addEventListener('click', () => {
                DOM.answerBox.classList.remove('hidden');
                DOM.answerBoxText.innerHTML = DOM.answerBoxInput.value;
                DOM.answerBoxInput.value = "";
                hideAnswerBox();
                askSomething();
            });
        }

        function sendAnswer() {
            DOM.answerBox.classList.remove('hidden');
            DOM.answerBoxText.innerHTML = DOM.answerBoxInput.value;
            DOM.answerBoxInput.value = "";
            setTimeout(hideAnswerBox, 1000);
            setTimeout(askSomething, 1000);
        }

        function hideAnswerBox() {
            DOM.answerBox.classList.add('hidden');
        }

        function hideQuestionBox() {
            DOM.questionBox.classList.add("display-none");
        }

        function showQuestionBox() {
            DOM.questionBox.classList.remove("display-none");
        }

        function randomIntGenerator(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        function stopBrainTeaserExcercise() {
            var stopExcercise = document.getElementById("stop-excercise");
            stopExcercise.onclick = function () {

                document.getElementById('dialogAcceptButton').addEventListener('click', () => {
                    const Menu = menu_load_methods();
                    Menu.menu_load_brainteaser();
                })
            }
        }

        function setTime() {
            ++DOM.totalSeconds;
            DOM.secondsLabel.innerHTML = pad(DOM.totalSeconds % 60);
            DOM.minutesLabel.innerHTML = pad(parseInt(DOM.totalSeconds / 60));
        }

        function pad(val) {
            var valString = val + "";
            if (valString.length < 2) {
                return "0" + valString;
            } else {
                return valString;
            }
        }


        return {

            'buildBrainTeaserExcercise': buildBrainTeaserExcercise
        }


    }




    return {
        'buildBrainTeaserPage': buildBrainTeaserPage
    }

}
