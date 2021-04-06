import * as global from './global.js';
import * as st from './state.js';
const state = st.state;

export function ReaderPageScope() {


    const Global = global.GlobalObjectScope();


    function renderReaderPageContent() {

        document.querySelector(".main-content").innerHTML = `
        <div class="row">
            <div class="col-12">
                <label for="dictionary-name-select" class="form-label">Kiejtés nyelve:</label>
                <select class="dictionary-language-select form-select mb-3"
                    id="listening-select-language"></select>
            </div>
            <div class="col-12 form-group mb-3">
                <label for="dictionary-name-select" class="form-label">Szöveg:</label>
                <textarea class="form-control" id="listening-textarea" rows="3"></textarea>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-10">
                <button type="button" class="btn btn-secondary w-100 mb-2"
                    id="listening-start-button"><i class="fas fa-volume-up"></i></button>
            </div>
            <div class="col-sm-2">
                <button type="button" class="btn btn-danger w-100" id="listening-clear-button"><i
                        class="fas fa-trash-alt"></i></button>
            </div>
        </div>
        `
        const listeningSelectLanguage = document.querySelector("#listening-select-language");
        listeningSelectLanguage.innerHTML = '';

        var langCounter = 0;
        Object.values(state.languages).map(item => {
            listeningSelectLanguage.innerHTML += `<option value = "${langCounter}" data-languageid="${item.countryCode}"> ${item.countryName}</option>`;
            langCounter++;
        });


        listeningStartSpeech();
        listeningClearTextarea();

    }

    function listeningStartSpeech() {

        const listeningStartBtn = document.querySelector("#listening-start-button");

        listeningStartBtn.addEventListener("click", () => {

            const textContent = document.querySelector("#listening-textarea");

            if (textContent.textLength != 0) {
                var language = listeningSelectLanguage[listeningSelectLanguage.value].dataset.languageid;
                Global.startSpeech(language, textContent.value);
            }
        })

    };

    function listeningClearTextarea() {
        const listeningClearBtn = document.querySelector("#listening-clear-button");
        const textContent = document.querySelector("#listening-textarea");

        listeningClearBtn.addEventListener("click", () => {
            textContent.value = '';
        })

    };
    return {
        renderReaderPageContent
    }
}