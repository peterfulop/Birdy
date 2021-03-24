function GlobalObjectScope() {

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


    function fillDialogPanel(data) {
        var parameter = document.getElementById('dialog-body-param');
        parameter.innerHTML = data;
    }


    function defDialogPanel(dialogID) {
        return new bootstrap.Modal(document.getElementById(`${dialogID}`), {
            keyboard: false
        });
    }



    return {
        'renderDictionaryListInput': renderDictionaryListInput,
        'showDialogPanel': showDialogPanel,
        'fillDialogPanel': fillDialogPanel,
        'defDialogPanel': defDialogPanel
    }

}