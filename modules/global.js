import * as st from './state.js';
const state = st.state;

export function GlobalObjectScope() {

    function renderDictionaryListInput(contener) {

        contener.innerHTML += `
        <div class= "select-dictionary mb-3">
            <label for="dictionary-name-select" class="form-label">Válassz egy szótárt:</label>
            <select class="form-select" id="dictionary-name-select">
            </select>
        </div>
        `
        renderDictionaryListOptions();
    }
    function renderDictionaryListOptions() {

        state.dictionaries.sort(compareValues("dictionaryName", "asc"));

        const content = document.querySelector("#dictionary-name-select");
        content.innerHTML = '';
        Object.values(state.dictionaries).map((item, i) => {
            content.innerHTML += `<option value = "${i}" data-dictid="${item.autoID}">${item.dictionaryName}</option>`;
        });
    }

    function showDialogPanel(dialogIndex) {

        var dialogID = dialogObjects[dialogIndex].id;
        var dialogTitle = dialogObjects[dialogIndex].title;
        var dialogBody = dialogObjects[dialogIndex].body;
        var acceptBtnColor = dialogObjects[dialogIndex].color;
        var acceptBtnText = dialogObjects[dialogIndex].text;

        renderDialogPanel(dialogID, dialogTitle, dialogBody, acceptBtnColor, acceptBtnText);
    }

    function renderDialogPanel(dialogID, dialogTitle, dialogBody, acceptBtnColor, acceptBtnText) {

        const dialogArea = document.getElementById('dialog-area');
        dialogArea.innerHTML = `
        <div class="modal fade" id="${dialogID}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">

            <div class="modal-dialog modal-dialog-centered" id="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">${dialogTitle}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-block" id="dialog-body-content">
                    ${dialogBody}
                    <p id="dialog-body-param"></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Mégsem</button>
                        <button type="button" class="btn btn-${acceptBtnColor}" data-bs-dismiss="modal" id="dialogAcceptButton">${acceptBtnText}</button>
                    </div>
                </div>
            </div>
        </div>
    `
    }

    function renderSearchBar() {
        return `
            <div class="search-bar d-block mb-2">
                <div class="line-1 d-flex">
                    <div class="search-input w-100">
                        <input type="search" class="form-control" id="search-element-input" placeholder="Keresés...">
                    </div>
                    <div class="search-buttons d-flex">
                        <button type="button" class="btn btn-secondary ms-1" id="search-element-button"><i class="fas fa-search"></i></button>
                        <button type="button" class="btn btn-danger ms-1 d-none align-items-center mw-50" id="clear-dictionary-filter"><i class="fas fa-filter"></i></button>
                    </div>
                </div>
                <div class="form-text mb-2 d-none justify-content-start cursor-pointer text-danger" id="search-alert">
                    <div class="search-alert-close"><i class="far fa-window-close"></i></div>
                    <div class="search-alert-text ms-1">Nincs találat!</div>
                </div>
            </div>
    `
    }

    function closeSearchAlert() {

        var alertMsg = document.getElementById('search-alert');
        var searchInput = document.getElementById('search-element-input');

        alertMsg.addEventListener('click', () => {
            alertMsg.classList.add('d-none');
            searchInput.value = "";
        })

    }



    function fillDialogPanel(data) {
        var parameter = document.getElementById('dialog-body-param');
        parameter.innerHTML = data;
    }


    function defDialogPanel(dialogID) {
        return new bootstrap.Modal(document.getElementById(`${dialogID}`), {
            keyboard: false
        });
    }


    function compareValues(key, order = 'asc') {

        return function innerSort(a, b) {

            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {

                return 0;
            }

            const varA = (typeof a[key] === 'string')
                ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
                ? b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    }


    function startSpeech(language, text) {

        let speech = new SpeechSynthesisUtterance();
        speech.lang = language;
        speech.text = text;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);

    }

    async function loadSpinner(locationID) {
        document.getElementById(locationID).innerHTML = `
            <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
                <div class="spinner-border" style="width: 3rem; height: 3rem; color:white;" role="status"></div>
            </div>
        `
    }


    function generateID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function generateID_short() {
        return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    var dialogObjects = [
        {
            name: "deleteRowObject",
            title: "Elem törlése",
            body: "Biztosan törölni szeretnéd a következőt?",
            id: "delete-row-dialog",
            color: "danger",
            text: "Törlés"
        },
        {
            name: "endOfExcercise",
            title: "Gyakorlás vége",
            body: "Biztosan ki szeretnél lépni a gyakorlásból?",
            id: "stop-excercise-dialog",
            color: "warning",
            text: "Kilépés"
        }
    ];



    return {
        'renderDictionaryListInput': renderDictionaryListInput,
        'showDialogPanel': showDialogPanel,
        'fillDialogPanel': fillDialogPanel,
        'defDialogPanel': defDialogPanel,
        'compareValues': compareValues,
        'startSpeech': startSpeech,
        'renderSearchBar': renderSearchBar,
        'closeSearchAlert': closeSearchAlert,
        'generateID': generateID,
        'generateID_short': generateID_short,
        'loadSpinner': loadSpinner,
        'dialogObjects': dialogObjects

    }

}