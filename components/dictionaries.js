function DictionaryPageScope() {

    //#region methods for Dictionaries

    function renderDictionariesPage() {

        renderHTMLContent();

        var langContent = document.querySelector("#dictionary-language-primary");
        langContent.innerHTML = '';
        var langCounter = 0;
        Object.values(languagesJS).map(item => {
            langContent.innerHTML += `<option value = "${langCounter}" data-languageid="${item.countryCode}"> ${item.countryName}</option>`;
            langCounter++;
        });

        var langContent = document.querySelector("#dictionary-language-secondary");
        langContent.innerHTML = '';
        var langCounter = 0;
        Object.values(languagesJS).map(item => {
            langContent.innerHTML += `<option value = "${langCounter}" data-languageid="${item.countryCode}"> ${item.countryName}</option>`;
            langCounter++;
        });


        renderDictionaryList(state.dictionaries);
        createNewDictionary();
        backToNewDictionary();
        dictionarySearchMethods();
        sortDictionaryList();
    };

    function renderHTMLContent() {

        document.querySelector(".main-content").innerHTML = `
            <h5 class="text-center mb-4">Szótárak listája</h5>
    
            <div class="view-menu-bar-create my-3">
    
                <div class="add-new-block">
                    <p class="m-2">Új szótár!</p>
                    <i class="fas fa-plus-square" id="add-button"></i>
                </div>
                <div class="create-new-dictionary dislay-none mb-3">
                    <div class="create-new-block-form w-100">
    
                        <form>
                            <div class="dictionary-name mb-2">
                                <label for="create-new-text-input" class="form-label">Add meg az új szótár nevét:</label>
    
                                <input type="text" class="form-control" id= "create-new-text-input" placeholder="Name of the new Dictionary">
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <label for="dictionary-name-select" class="form-label">Elsődleges nyelv:</label>
                                    <select class="dictionary-language-select form-select mb-3" id="dictionary-language-primary"></select>
                                </div>
                                <div class="col-sm-6">
                                    <label for="dictionary-name-select" class="form-label">Másodlagos nyelv:</label>
                                    <select class="dictionary-language-select form-select mb-3" id="dictionary-language-secondary"></select>
                                </div>
    
                            </div>  
                            <div class="row create-new-block-buttons">
                                <div class="col-sm-10">
                                    <button type="button" class="btn btn-success w-100 mb-2" id="create-new-accept"><i class="fas fa-check"></i></button>
                                </div>
    
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-danger w-100" id="create-new-close"><i class="fas fa-times"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    
    
            <div class="dictionary-list-block">
    
                 ${renderSearchBar()}
    
                <div class="dictionary-list-header d-flex py-2 align-items-center border-bottom border-white">
    
                    <div class="col-9 d-flex justify-content-start align-items-center">
    
                        <div class="edit-btn-container me-1">
                            <input type="checkbox" class="btn-check" id="sort-alpha-check" autocomplete="off" checked="">
                            <label class="btn btn-sm btn-outline-listen mw-50" id="sort-alpha-btn" for="sort-alpha-check"><i class="fas fa-sort-alpha-up" id="sort-alpha-icon"></i></label>
                        </div>
    
                        <div class="d-flex justify-content-between text-muted cursor-pointer">
                            <p class="mb-0 px-2 text-muted">Név</p>
                        </div>
                     </div>
    
                    <div class="col-3 d-none d-sm-flex justify-content-end">
                        <p class="mb-0 text-muted">Művelet</p>
                    </div>
                </div>
                <div class="dictionary-list-items  p-2">
                </div>
            </div>
    
            <div class="dictionary-item-list-pagination mt-2 d-flex align-items-center justify-content-between" id="pagination-footer">
                <div id="counter-block">
                </div>
                <div id="pagination-block">
                </div>
            </div>
        `
    }

    function renderDictionaryList(renderArray) {

        state.pagination.location = 0;
        state.selectedDictionaryLength = state.dictionaries.length;

        renderArray.sort(compareValues("dictionaryName", state.sortBy));

        sliceArray(renderArray);
        renderArray = state.pagination.slicedArray;

        var content = document.querySelector(".dictionary-list-items");
        content.innerHTML = '';

        var counter = 0;
        var index = state.filtered ? 1 : (state.pagination.selectedPageIndex + 1) * state.pagination.itemsPerPage - (state.pagination.itemsPerPage - 1);

        Object.values(renderArray).map(dictionary => {
            content.innerHTML +=
                `
                <div class="row d-flex py-2 justify-content-between dictionary-list-item border-bottom">
    
                    <div class="d-flex col-12 col-sm-8 col-xl-8 align-items-center justify-content-center justify-content-sm-start my-sm-0 my-2 px-0 dictionary-list-item-details" id="dictionary-list-item-details">
                            <i class="fas fa-bookmark d-none d-sm-flex mx-2"></i>
                            <small class="col-auto col-sm-1 me-2 col-lg-1 col-xl-auto">[${dictionary.lexicon.length}]</small>
                            <h6 class="m-0">${dictionary.dictionaryName}</h6>
                    </div>
    
                    <div class="d-flex col-12 col-sm-4 col-xl-4 px-0 justify-content-center justify-content-sm-end">
                        <div class="d-flex w-100 btn-group dictionary-list-item-button justify-content-start justify-content-sm-end" role="group" style="max-width: 275px">
                            <button type="button" class="btn btn-sm open-content content-action" id="open-content" data-dictid ="${dictionary.autoID}"><i class="far fa-folder-open"></i></button>
                            <button type="button" class="btn btn-sm edit-content content-action" id="edit-content"  data-dictid ="${dictionary.autoID}"><i class="fas fa-edit"></i></button>
                            <button type="button" class="btn btn-sm delete-content content-action" id="delete-content" data-dictid ="${dictionary.autoID}"><i class="fas fa-trash-alt"></i></i></button>
                        </div>
                    </div>
                    
                </div>
            `

            state.pagination.itemNumber = index + counter;
            counter++;
        });

        selectDictionaryMethod();

        if (state.filtered) {
            renderPaginationFooter(state.filterArray)
        }
        else {
            renderPaginationFooter(state.dictionaries)

        };
    };

    function createNewDictionary() {
        const createNewDictionaryButton = document.querySelector(".add-new-block");
        const addNewBlock = document.querySelector(".add-new-block");
        createNewBlock = document.querySelector(".create-new-dictionary");

        if (createNewDictionaryButton) {
            createNewDictionaryButton.addEventListener('click', () => {
                console.log("Új szótár létrehozása")
                addNewBlock.classList.add('dislay-none');
                createNewBlock.classList.remove('dislay-none');
            })
        }
    };

    function backToNewDictionary() {

        const addNewBlock = document.querySelector(".add-new-block");
        createNewBlock = document.querySelector(".create-new-dictionary");
        createNewTextInput = document.getElementById("create-new-text-input");
        createNewClearBtn = document.getElementById("create-new-close");

        if (createNewClearBtn) {
            createNewClearBtn.addEventListener('click', () => {
                console.log("Vissza")
                createNewTextInput.value = '';
                createNewBlock.classList.add('dislay-none');
                addNewBlock.classList.remove('dislay-none');
            })
        }
    };

    function dictionarySearchMethods() {

        var searchDictionaryInput = document.getElementById("search-element-input");
        var searchDictionaryBtn = document.getElementById("search-element-button");
        var clearfilterBtn = document.getElementById("clear-dictionary-filter");
        var searchAlert = document.getElementById("search-alert");
        closeSearchAlert();


        searchDictionaryBtn.addEventListener('click', function () {

            if (searchDictionaryInput.value != "") {

                filterBy(state.dictionaries, "dictionaryName", searchDictionaryInput.value);

                if (state.filtered) {
                    resetPaginationState();
                    renderDictionaryList(state.filterArray);
                    clearfilterBtn.classList.remove("d-none");
                    clearfilterBtn.classList.add("d-flex");
                }
                else {
                    console.log("nincs renderelés!");
                    searchAlert.classList.remove("d-none");
                    searchAlert.classList.add("d-flex");
                }
            }
            else {
                console.log("üres mező")
                renderDictionaryList(state.dictionaries);
                clearfilterBtn.classList.add("d-none");
                searchAlert.classList.add("d-none");
                resetFilteredState();
            }
        })


        clearfilterBtn.addEventListener('click', () => {
            renderDictionaryList(state.dictionaries);
            clearfilterBtn.classList.add("d-none");
            searchDictionaryInput.value = "";
            resetPaginationState();
            resetFilteredState();
            sliceArray(state.dictionaries);
            renderPaginationFooter(state.dictionaries);
        })


    };

    function sortDictionaryList() {

        var sortButton = document.getElementById("sort-alpha-btn");

        sortButton.onclick = function () {

            var sortIcon = document.getElementById('sort-alpha-icon');
            var sortChecker = document.getElementById("sort-alpha-check");

            sortChecker.checked != sortChecker.checked;

            if (!sortChecker.checked) {

                sortIcon.classList.remove('fa-sort-alpha-down');
                sortIcon.classList.add('fa-sort-alpha-up');
                state.sortBy = 'asc';
                state.pagination.selectedPageIndex = 0;
                const renderRoot = state.filtered ? state.filterArray : state.dictionaries;
                resetPaginationState();
                renderDictionaryList(renderRoot);
            }
            else {

                sortIcon.classList.remove('fa-sort-alpha-up');
                sortIcon.classList.add('fa-sort-alpha-down');
                state.sortBy = 'desc';
                state.pagination.selectedPageIndex = 0;
                const renderRoot = state.filtered ? state.filterArray : state.dictionaries;
                resetPaginationState();
                renderDictionaryList(renderRoot);
            }
        }

    };


    function selectDictionaryMethod() {

        var dictionaryContentButtons = document.querySelectorAll('.content-action');
        var ID;

        for (const element of dictionaryContentButtons) {
            element.addEventListener('click', () => {
                ID = element.dataset.dictid;
                state.selectedDictionary = ID;

                var buttonName = element.id;

                switch (buttonName) {
                    case 'open-content':
                        openDictionary();
                        break;
                    case 'edit-content':
                        editDictionary();
                        break;
                    case 'delete-content':
                        deleteDictionary();
                        break;
                    default:
                        break;
                }
            })
        };
    };

    function openDictionary() {

        console.log("Open Dictionary");

        for (let i = 0; i < state.dictionaries.length; i++) {

            if (state.dictionaries[i].autoID === state.selectedDictionary) {
                state.dictionaryID = i;
                state.dictionaryName = array_dictionaries[i].dictionaryName;
                renderDinctionaryContent();
            }
        }
    };

    function editDictionary() {

        console.log("Edit Dictionary");

        for (let i = 0; i < dictionaries.length; i++) {

            if (dictionaries[i].id === state.selectedDictionary) {
                console.log(dictionaries[i].id);
                console.log(dictionaries[i].name);
                console.log(dictionaries[i].relaseDate);
            }
        }
    };

    function deleteDictionary() {

        console.log("Delete Dictionary");

        for (let i = 0; i < dictionaries.length; i++) {
            if (dictionaries[i].id === state.selectedDictionary) {
                console.log(dictionaries[i].id);
                console.log(dictionaries[i].name);
                console.log(dictionaries[i].relaseDate);
            }
        }
    };


    //#endregion



    function renderDinctionaryContent() {

        var searchBar = renderSearchBar();
        mainContent.innerHTML = '';

        mainContent.innerHTML = `
            <h5 class="text-center mb-4">${state.dictionaryName} szótár tartalma</h5>
    
            <div class="mb-2 dictionaries-search-bar">
    
                <div class="back-button-area">
                    <button type="button" class="btn bg-info me-1 text-white" id="back-dictionary-button"><i class="fas fa-arrow-left"></i></button>
                </div>
    
                ${searchBar}
    
            </div>
            
            <div class="d-flex dictionary-content-toolbar my-1 py-2 justify-content-between align-items-center border-bottom border-white">
    
                <div class="d-flex dictionary-list-header">
    
                    <div class="d-flex justify-content-start align-items-center">
    
                         <div class="edit-btn-container me-1">
                            <input type="checkbox" class="btn-check" id="sort-alpha-check" autocomplete="off" checked>
                            <label class="btn btn-sm  btn-outline-listen mw-50" id="sort-alpha-btn" for="sort-alpha-check" ><i class="fas fa-sort-alpha-up" id="sort-alpha-icon"></i></label>
                        </div>
    
                        <div class="edit-btn-container btn btn-group p-0">
    
                            <input type="radio" class="btn-check" name="select_column" id="select_column_1" autocomplete="off" checked>
                            <label class="btn btn-sm btn-outline-corn" for="select_column_1" id="select_column_button_1" data-columnid ="word_1" ><i class="fas fa-align-left"></i></label>
    
                            <input type="radio" class="btn-check" name="select_column" id="select_column_2" autocomplete="off">
                            <label class="btn btn-sm btn-outline-lgray" for="select_column_2"  id="select_column_button_2" data-columnid ="word_2"><i class="fas fa-align-right"></i></label>
    
                        </div>
                    </div>
                </div>
                
                <div class="d-flex">
                    <div class="edit-btn-container me-1">
                        <input type="checkbox" class="btn-check" id="edit-content-checker" autocomplete="off">
                        <label class="btn btn-sm btn-outline-listen mw-50" for="edit-content-checker"><i class="fas fa-edit"></i></label>
                    </div>
    
                    <div class="listen-btn-container">
                        <input type="checkbox" class="btn-check" id="listen-content-checker" autocomplete="off">
                        <label class="btn btn-sm btn-outline-listen mw-50" for="listen-content-checker"><i class="fas fa-volume-up"></i></label>
                    </div>
                </div>
            </div>
    
            </div>
    
            <div class="dictionary-item-list overflow-scroll p-2" id="dictionary-item-list" style="max-height: 40vh">
            </div>
    
    
            <div class="dictionary-item-list-pagination mt-2 d-flex align-items-center justify-content-between" id="pagination-footer">
                <div id="counter-block">
                </div>
                <div id="pagination-block">
                </div>
            </div>
    
        `

        renderDictionaryElements(state.dictionaries[state.dictionaryID].lexicon);


        var searchInput = document.getElementById("search-element-input");
        var searchBtn = document.getElementById("search-element-button");
        var clearfilterBtn = document.getElementById("clear-dictionary-filter");
        var searchAlert = document.getElementById("search-alert");
        var sortButton = document.getElementById("sort-alpha-btn");

        var selectColumnBtn_1 = document.getElementById("select_column_button_1");
        var selectColumnBtn_2 = document.getElementById("select_column_button_2");


        searchBtn.onclick = function () {

            if (searchInput.value != "") {

                searchInLexicon(searchInput);

                if (state.filtered) {
                    resetPaginationState();
                    renderDictionaryElements(state.filterArray);
                    clearfilterBtn.classList.remove("d-none");
                    clearfilterBtn.classList.add("d-flex");
                    searchAlert.classList.add("d-none");
                }
                else {
                    console.log("nincs renderelés!");
                    searchAlert.classList.remove("d-none");
                    searchAlert.classList.add("d-flex");
                }
            }
            else {

                console.log("üres mező")
                renderDictionaryElements(state.dictionaries[state.dictionaryID].lexicon);
                clearfilterBtn.classList.add("d-none");
                searchAlert.classList.add("d-none");
                state.filterArray = [];
            }
        }

        closeSearchAlert();

        clearfilterBtn.onclick = function () {

            renderDictionaryElements(state.dictionaries[state.dictionaryID].lexicon)
            clearfilterBtn.classList.add("d-none");
            searchInput.value = "";
            resetFilteredState();
            resetPaginationState();
            sliceArray(state.dictionaries[state.dictionaryID].lexicon);
            renderPaginationFooter(state.dictionaries[state.dictionaryID].lexicon);
        }

        var backButton = document.getElementById('back-dictionary-button');
        backButton.addEventListener('click', () => {
            menu_load_dictionaries();
        })

        sortButton.addEventListener('click', () => {

            var sortIcon = document.getElementById('sort-alpha-icon');
            var sortChecker = document.getElementById("sort-alpha-check");

            sortChecker.checked != sortChecker.checked;

            if (!sortChecker.checked) {
                sortIcon.classList.remove('fa-sort-alpha-down');
                sortIcon.classList.add('fa-sort-alpha-up');
                state.sortBy = 'asc';
                const renderRoot = state.filtered ? state.filterArray : state.dictionaries[state.dictionaryID].lexicon;
                state.pagination.selectedPageIndex = 0;
                resetPaginationState();
                renderDictionaryElements(renderRoot);

            }
            else {
                sortIcon.classList.remove('fa-sort-alpha-up');
                sortIcon.classList.add('fa-sort-alpha-down');
                state.sortBy = 'desc';
                const renderRoot = state.filtered ? state.filterArray : state.dictionaries[state.dictionaryID].lexicon;
                state.pagination.selectedPageIndex = 0;
                resetPaginationState();
                renderDictionaryElements(renderRoot);
            }

        })


        selectColumnBtn_1.addEventListener('click', () => {
            setColumnID(selectColumnBtn_1);

            const renderRoot = state.filtered ? state.filterArray : state.dictionaries[state.dictionaryID].lexicon;
            state.pagination.selectedPageIndex = 0;
            resetPaginationState();
            renderDictionaryElements(renderRoot);

        })

        selectColumnBtn_2.addEventListener('click', () => {
            setColumnID(selectColumnBtn_2);

            const renderRoot = state.filtered ? state.filterArray : state.dictionaries[state.dictionaryID].lexicon;
            state.pagination.selectedPageIndex = 0;
            resetPaginationState();
            renderDictionaryElements(renderRoot);
        })

    }



    function renderDictionaryElements(renderArray) {

        state.pagination.location = 1;
        state.selectedDictionaryLength = getActualDictionaryLength();

        renderArray.sort(compareValues(state.columnID, state.sortBy));

        sliceArray(renderArray);
        renderArray = state.pagination.slicedArray;

        resetEditorMode();


        var dictionaryItemList = document.getElementById('dictionary-item-list');

        dictionaryItemList.innerHTML = '';

        var counter = 0;
        var index = state.filtered ? 1 : (state.pagination.selectedPageIndex + 1) * state.pagination.itemsPerPage - (state.pagination.itemsPerPage - 1);

        Object.values(renderArray).map(item => {

            var randomIndex = generateID_short();
            dictionaryItemList.innerHTML += `
            <div class="dictionary-item mb-1" data-rowinfo="${randomIndex}">
                <div class="dictionary-item-count">
                    <span>${index + counter}.</span>
                </div>
                <div class="dictionary-item-words">
                    <div class="dictionary-first-word mr-1">
                        <span class="dictionary-text-content p-1 enabled" data-inputid="${counter}_0">${item.article_1} ${item.word_1}</span>
                        <input type="text" class="dictionary-edit-content p-1 dislay-none" data-inputid="${counter}_0" data-wordid="0" value="${item.word_1}">
                        <div class="dictionary-item-buttons">
    
                            <i class="fas fa-edit edit-actual-word edit dislay-none" data-inputid="${counter}_0" data-wordid="0"></i>
                            <i class="fas fa-check save-edit dislay-none" data-inputid="${counter}_0" data-wordid="0"></i>
                            <i class="fas fa-volume-up listening-mode dislay-none" data-inputid="${counter}_0" data-wordid="0"></i>
    
                        </div>
                    </div>
                    <div class="dictionary-second-word mr-1">
                            <span class="dictionary-text-content p-1 enabled" data-inputid="${counter}_1">${item.word_2}</span>
                            <input type="text" class="dictionary-edit-content p-1 dislay-none" data-inputid="${counter}_1" data-wordid="1" value="${item.word_2}">
    
                            <div class="dictionary-item-buttons listen">
                                <i class="fas fa-edit edit-actual-word edit dislay-none" data-inputid="${counter}_1" data-wordid="1"></i>
                                <i class="fas fa-check save-edit dislay-none" data-inputid="${counter}_1" data-wordid="1"></i>
                                <i class="fas fa-volume-up listening-mode dislay-none" data-inputid="${counter}_1" data-wordid="1"></i>
                            </div>
                    </div>
                </div>
    
                <div class="dictionary-item-remove cursor-pointer" data-rowinfo="${randomIndex}" data-bs-toggle="modal" data-bs-target="#${dialogObjects[0].id}">
                    <i class="fas fa-trash edit-actual-word remove dislay-none" data-inputid="${counter}" data-dictionary="${state.dictionaryID}" ></i>
                </div>
            </div>
            `
            state.pagination.itemNumber = index + counter;
            counter++;
        });




        enabledEditorMode();
        isEnabledListeningMode();

        editSelectedWord();
        saveEditedWord();
        removeSelectedWord();
        readSelectedWord();



        if (state.filtered) {
            renderPaginationFooter(state.filterArray); //ok
        }
        else {
            renderPaginationFooter(state.dictionaries[state.dictionaryID].lexicon); //ok

        };


    }


    function enabledEditorMode() {

        var editorModeBtn = document.getElementById('edit-content-checker');
        var editBtn = document.querySelectorAll('.edit-actual-word');

        editorModeBtn.addEventListener("change", () => {

            if (editorModeBtn.checked) {
                state.editDictionaryMode = true;
                for (const button of editBtn) {
                    button.classList.remove("dislay-none");
                    showDialogPanel(0);
                }
            }
            else {
                state.editDictionaryMode = false;
                for (const button of editBtn) {
                    button.classList.add("dislay-none");
                }
            }
        })
    }

    function resetEditorMode() {

        var editorModeBtn = document.getElementById('edit-content-checker');
        editorModeBtn.checked = false;
        state.editDictionaryMode = false;
    }


    function isEnabledListeningMode() {

        var listeningModeButton = document.getElementById('listen-content-checker');
        var listenBtn = document.querySelectorAll('.listening-mode');


        if (state.listeningMode) {
            enabledListeningMode(listenBtn);
        }
        else {
            disabledListeningMode(listenBtn);
        }

        listeningModeButton.addEventListener("change", () => {

            if (listeningModeButton.checked) {
                state.listeningMode = true;
                enabledListeningMode(listenBtn)
            }
            else {
                state.listeningMode = false;
                disabledListeningMode(listenBtn);
            }
        })
    }

    function enabledListeningMode(listenBtn) {

        for (const button of listenBtn) {
            button.classList.remove("dislay-none");
        }

    }

    function disabledListeningMode(listenBtn) {

        for (const button of listenBtn) {
            button.classList.add("dislay-none");
        }

    }


    function resetListeningMode() {

        var listeningModeButton = document.getElementById('listen-content-checker');
        listeningModeButton.checked = false;
        state.listeningMode = false;
    }


    function editSelectedWord() {

        var editBtn = document.querySelectorAll('.edit-actual-word.edit');

        for (const button of editBtn) {

            button.onclick = function () {

                if (!state.editDictionaryContent) {

                    var editorModeButton = document.getElementById('edit-content-checker');
                    editorModeButton.disabled = true;
                    state.editDictionaryContent = true;

                    inputID = button.dataset.inputid;

                    console.log(inputID);
                    button.classList.add("dislay-none");


                    var saveButtons = document.querySelectorAll('.save-edit');

                    for (const saveBtn of saveButtons) {
                        if (saveBtn.dataset.inputid === inputID) {
                            saveBtn.classList.remove("dislay-none");
                        }
                    }

                    var inputs = document.querySelectorAll('.dictionary-edit-content');

                    for (const input of inputs) {
                        if (input.dataset.inputid === inputID) {
                            input.classList.remove("dislay-none");
                        }
                    }

                    var labels = document.querySelectorAll('.dictionary-text-content');

                    for (const label of labels) {
                        if (label.dataset.inputid === inputID) {
                            label.classList.add("dislay-none");
                        }
                    }
                }
            }
        }
    }

    function readSelectedWord() {

        var readButtons = document.querySelectorAll('.listening-mode');

        for (const button of readButtons) {

            button.onclick = function () {

                var inputID = button.dataset.inputid;
                var labels = document.querySelectorAll('.dictionary-text-content');

                for (const label of labels) {
                    if (label.dataset.inputid === inputID) {
                        if (button.dataset.wordid === '0') {
                            startSpeech(state.dictionaries[state.dictionaryID].langPrim, label.textContent);
                        }
                        else {
                            startSpeech(state.dictionaries[state.dictionaryID].langSec, label.textContent);
                        }
                    }
                }
            }
        }
    }

    function saveEditedWord() {

        var editBtn = document.querySelectorAll('.edit-actual-word.edit');
        var inputs = document.querySelectorAll('.dictionary-edit-content');
        var labels = document.querySelectorAll('.dictionary-text-content');
        var saveButtons = document.querySelectorAll('.save-edit');

        for (const button of saveButtons) {

            button.onclick = function () {

                var editorModeButton = document.getElementById('edit-content-checker');
                editorModeButton.disabled = false;

                state.editDictionaryContent = false;

                var editorModeButton = document.getElementById('edit-content-checker');
                editorModeButton.disabled = false;

                inputID = button.dataset.inputid;
                button.classList.add("dislay-none");

                var newInput;

                for (const input of inputs) {
                    if (input.dataset.inputid === inputID) {
                        input.classList.add("dislay-none");
                        newInput = input.value;
                    }
                }

                for (const label of labels) {

                    if (label.dataset.inputid === inputID) {
                        label.classList.remove("dislay-none");
                        label.innerHTML = newInput;

                    }
                }

                for (const buton of editBtn) {

                    if (buton.dataset.inputid === inputID) {
                        buton.classList.remove("dislay-none");

                    }
                }
            }
        }
    }

    function removeSelectedWord() {

        var removeBtn = document.querySelectorAll('.dictionary-item-remove');
        var dictItem = document.querySelectorAll('.dictionary-item');



        for (const button of removeBtn) {
            button.onclick = function () {

                console.log(button.dataset.rowinfo);

                for (const line of dictItem) {

                    if (button.dataset.rowinfo === line.dataset.rowinfo) {

                        var word_1 = line.querySelector(".dictionary-first-word > span").innerText;
                        var word_2 = line.querySelector(".dictionary-second-word > span").innerText;

                        console.log("törlés >> ", line.dataset.rowinfo, word_1, word_2);

                        fillDialogPanel(`"${word_1} - ${word_2}"`);

                        document.getElementById('dialogAcceptButton').addEventListener('click', () => {
                            line.remove();
                        })

                    }
                }
            }
        }
    }

    function setPaginationMethod() {


        switch (state.pagination.location) {
            case 0:
                renderDictionaryList(state.pagination.slicedArray);

                break;
            case 1:
                renderDictionaryElements(state.pagination.slicedArray);
                break;

            default:
                break;
        }
    }


    return {
        'renderDictionariesPage': renderDictionariesPage,
        'renderDictionaryElements': renderDictionaryElements,
        'renderDictionaryList': renderDictionaryList,
        'createNewDictionary': createNewDictionary,
        'backToNewDictionary': backToNewDictionary,
        'renderDinctionaryContent': renderDinctionaryContent,
        'resetListeningMode': resetListeningMode,
        'setPaginationMethod': setPaginationMethod
    }

}
