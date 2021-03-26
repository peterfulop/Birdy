function DictionaryPageScope() {

    const Pagination = paginationFunctionScope();
    const Global = GlobalObjectScope();

    //#region methods for Dictionaries

    function renderDictionariesPageHTML() {

        document.querySelector(".main-content").innerHTML = `
            <h5 class="text-center mb-4">Szótárak listája</h5>
    
            <div class="view-menu-bar-create my-3">
    
                <div class="add-new-block">
                    <p class="m-2">Új szótár!</p>
                    <i class="fas fa-plus-square" id="add-button"></i>
                </div>
                <div class="create-new-dictionary display-none mb-3">
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
    
                 ${Global.renderSearchBar()}
    
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

    function buildDictionariesPage() {

        const Pagination = paginationFunctionScope();
        Pagination.resetPaginationState();

        renderDictionariesPageHTML();
        renderLanguageCombobox("dictionary-language-primary");
        renderLanguageCombobox("dictionary-language-secondary");
        renderDictionaryList(state.dictionaries);

        createNewDictionary();
        backToNewDictionary();
        dictionarySearchMethods();
        sortDictionaryList();
    };


    function renderLanguageCombobox(selectInputId) {

        const langContent = document.getElementById(selectInputId);
        langContent.innerHTML = '';

        Object.values(languagesJS).map((item, i) => {
            langContent.innerHTML += `<option value = "${i}" data-languageid="${item.countryCode}"> ${item.countryName}</option>`;
        });

    }

    function renderDictionaryList(renderArray) {

        state.pagination.location = 0;
        state.selectedDictionaryLength = state.dictionaries.length;

        renderArray.sort(Global.compareValues("dictionaryName", state.sortBy));

        sliceArray(renderArray);
        renderArray = state.pagination.slicedArray;

        const content = document.querySelector(".dictionary-list-items");
        content.innerHTML = '';

        const index = state.filtered ? 1 : (state.pagination.selectedPageIndex + 1) * state.pagination.itemsPerPage - (state.pagination.itemsPerPage - 1);

        Object.values(renderArray).map((dictionary, i) => {
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
            state.pagination.itemNumber = index + i;
        });

        selectDictionaryMethod();

        if (state.filtered) {
            Pagination.renderPaginationFooter(state.filterArray)
        }
        else {
            Pagination.renderPaginationFooter(state.dictionaries)
        };
    };

    function createNewDictionary() {
        const createNewDictionaryButton = document.querySelector(".add-new-block");
        const addNewBlock = document.querySelector(".add-new-block");
        createNewBlock = document.querySelector(".create-new-dictionary");

        if (createNewDictionaryButton) {
            createNewDictionaryButton.addEventListener('click', () => {
                console.log("Új szótár létrehozása")
                addNewBlock.classList.add('display-none');
                createNewBlock.classList.remove('display-none');
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
                createNewBlock.classList.add('display-none');
                addNewBlock.classList.remove('display-none');
            })
        }
    };

    function dictionarySearchMethods() {

        const searchDictionaryInput = document.getElementById("search-element-input");
        const searchDictionaryBtn = document.getElementById("search-element-button");
        const clearfilterBtn = document.getElementById("clear-dictionary-filter");
        const searchAlert = document.getElementById("search-alert");
        Global.closeSearchAlert();


        searchDictionaryBtn.addEventListener('click', function () {

            if (searchDictionaryInput.value != "") {

                filterBy(state.dictionaries, "dictionaryName", searchDictionaryInput.value);

                if (state.filtered) {
                    Pagination.resetPaginationState();
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
            Pagination.resetPaginationState();
            resetFilteredState();
            sliceArray(state.dictionaries);
            Pagination.renderPaginationFooter(state.dictionaries);
        })


    };

    function sortDictionaryList() {

        const sortButton = document.getElementById("sort-alpha-btn");

        sortButton.onclick = function () {

            const sortIcon = document.getElementById('sort-alpha-icon');
            const sortChecker = document.getElementById("sort-alpha-check");

            sortChecker.checked != sortChecker.checked;

            if (!sortChecker.checked) {

                sortIcon.classList.remove('fa-sort-alpha-down');
                sortIcon.classList.add('fa-sort-alpha-up');
                state.sortBy = 'asc';
                state.pagination.selectedPageIndex = 0;
                const renderRoot = state.filtered ? state.filterArray : state.dictionaries;
                Pagination.resetPaginationState();
                renderDictionaryList(renderRoot);
            }
            else {

                sortIcon.classList.remove('fa-sort-alpha-up');
                sortIcon.classList.add('fa-sort-alpha-down');
                state.sortBy = 'desc';
                state.pagination.selectedPageIndex = 0;
                const renderRoot = state.filtered ? state.filterArray : state.dictionaries;
                Pagination.resetPaginationState();
                renderDictionaryList(renderRoot);
            }
        }

    };

    function selectDictionaryMethod() {

        const dictionaryContentButtons = document.querySelectorAll('.content-action');
        let ID;

        for (const element of dictionaryContentButtons) {
            element.addEventListener('click', () => {
                ID = element.dataset.dictid;
                state.selectedDictionary = ID;

                const buttonName = element.id;

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
                buildDinctionaryContent();
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



    function renderDinctionaryContentHTML() {

        document.querySelector(".main-content").innerHTML = `
            <h5 class="text-center mb-4">${state.dictionaryName} szótár tartalma</h5>
    
            <div class="mb-2 dictionaries-search-bar">
    
                <div class="back-button-area">
                    <button type="button" class="btn bg-info me-1 text-white" id="back-dictionary-button"><i class="fas fa-arrow-left"></i></button>
                </div>
    
                ${Global.renderSearchBar()}
    
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
    }

    function buildDinctionaryContent() {


        renderDinctionaryContentHTML();

        buildDictionaryElementsPage(state.dictionaries[state.dictionaryID].lexicon);

        backToDictionariesPage();

        startSearchButtonMethod();

        clearSearchButtonMethod();

        Global.closeSearchAlert();

        sortByAscDescButton();

        sortByColumn_1();

        sortBytColumn_2();

    }

    //#region Event handler regio

    function startSearchButtonMethod() {

        const searchInput = document.getElementById("search-element-input");
        const searchBtn = document.getElementById("search-element-button");
        const clearfilterBtn = document.getElementById("clear-dictionary-filter");
        const searchAlert = document.getElementById("search-alert");

        searchBtn.onclick = function () {

            if (searchInput.value != "") {

                searchInLexicon(searchInput);

                if (state.filtered) {
                    Pagination.resetPaginationState();
                    buildDictionaryElementsPage(state.filterArray);
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
                buildDictionaryElementsPage(state.dictionaries[state.dictionaryID].lexicon);
                clearfilterBtn.classList.add("d-none");
                searchAlert.classList.add("d-none");
                state.filterArray = [];
            }
        }

    }

    function backToDictionariesPage() {

        const App = AppVisualisationScope().menu_load_methods();

        const backButton = document.getElementById('back-dictionary-button');
        backButton.addEventListener('click', () => {
            App.menu_load_dictionaries();
        })
    }

    function clearSearchButtonMethod() {

        const searchInput = document.getElementById("search-element-input");
        const clearfilterBtn = document.getElementById("clear-dictionary-filter");

        clearfilterBtn.addEventListener('click', () => {
            buildDictionaryElementsPage(state.dictionaries[state.dictionaryID].lexicon)
            clearfilterBtn.classList.add("d-none");
            searchInput.value = "";
            resetFilteredState();
            Pagination.resetPaginationState();
            sliceArray(state.dictionaries[state.dictionaryID].lexicon);
            Pagination.renderPaginationFooter(state.dictionaries[state.dictionaryID].lexicon);
        })

    }

    function sortByAscDescButton() {

        const sortButton = document.getElementById("sort-alpha-btn");

        sortButton.addEventListener('click', () => {

            const sortIcon = document.getElementById('sort-alpha-icon');
            const sortChecker = document.getElementById("sort-alpha-check");

            sortChecker.checked != sortChecker.checked;

            if (!sortChecker.checked) {
                sortIcon.classList.remove('fa-sort-alpha-down');
                sortIcon.classList.add('fa-sort-alpha-up');
                state.sortBy = 'asc';
                const renderRoot = state.filtered ? state.filterArray : state.dictionaries[state.dictionaryID].lexicon;
                state.pagination.selectedPageIndex = 0;
                Pagination.resetPaginationState();
                buildDictionaryElementsPage(renderRoot);

            }
            else {
                sortIcon.classList.remove('fa-sort-alpha-up');
                sortIcon.classList.add('fa-sort-alpha-down');
                state.sortBy = 'desc';
                const renderRoot = state.filtered ? state.filterArray : state.dictionaries[state.dictionaryID].lexicon;
                state.pagination.selectedPageIndex = 0;
                Pagination.resetPaginationState();
                buildDictionaryElementsPage(renderRoot);
            }

        })


    }

    function sortByColumn_1() {
        const selectColumnBtn_1 = document.getElementById("select_column_button_1");

        selectColumnBtn_1.addEventListener('click', () => {
            setColumnID(selectColumnBtn_1);

            const renderRoot = state.filtered ? state.filterArray : state.dictionaries[state.dictionaryID].lexicon;
            state.pagination.selectedPageIndex = 0;
            Pagination.resetPaginationState();
            buildDictionaryElementsPage(renderRoot);

        })

    }

    function sortBytColumn_2() {

        const selectColumnBtn_2 = document.getElementById("select_column_button_2");

        selectColumnBtn_2.addEventListener('click', () => {
            setColumnID(selectColumnBtn_2);

            const renderRoot = state.filtered ? state.filterArray : state.dictionaries[state.dictionaryID].lexicon;
            state.pagination.selectedPageIndex = 0;
            Pagination.resetPaginationState();
            buildDictionaryElementsPage(renderRoot);
        })

    }

    //#endregion

    function renderDictionaryElementsHTML(renderArray) {

        const dictionaryItemList = document.getElementById('dictionary-item-list');

        dictionaryItemList.innerHTML = '';

        const index = state.filtered ? 1 : (state.pagination.selectedPageIndex + 1) * state.pagination.itemsPerPage - (state.pagination.itemsPerPage - 1);

        Object.values(renderArray).map((item, i) => {

            const randomIndex = Global.generateID_short();
            dictionaryItemList.innerHTML += `
            <div class="dictionary-item mb-1" data-rowinfo="${randomIndex}">
                <div class="dictionary-item-count">
                    <span>${index + i}.</span>
                </div>
                <div class="dictionary-item-words">
                    <div class="dictionary-first-word mr-1">
                        <span class="dictionary-text-content p-1 enabled" data-inputid="${i}_0">${item.article_1} ${item.word_1}</span>
                        <input type="text" class="dictionary-edit-content p-1 display-none" data-inputid="${i}_0" data-wordid="0" value="${item.word_1}">
                        <div class="dictionary-item-buttons">
    
                            <i class="fas fa-edit edit-actual-word edit display-none" data-inputid="${i}_0" data-wordid="0"></i>
                            <i class="fas fa-check save-edit display-none" data-inputid="${i}_0" data-wordid="0"></i>
                            <i class="fas fa-volume-up listening-mode display-none" data-inputid="${i}_0" data-wordid="0"></i>
    
                        </div>
                    </div>
                    <div class="dictionary-second-word mr-1">
                            <span class="dictionary-text-content p-1 enabled" data-inputid="${i}_1">${item.word_2}</span>
                            <input type="text" class="dictionary-edit-content p-1 display-none" data-inputid="${i}_1" data-wordid="1" value="${item.word_2}">
    
                            <div class="dictionary-item-buttons listen">
                                <i class="fas fa-edit edit-actual-word edit display-none" data-inputid="${i}_1" data-wordid="1"></i>
                                <i class="fas fa-check save-edit display-none" data-inputid="${i}_1" data-wordid="1"></i>
                                <i class="fas fa-volume-up listening-mode display-none" data-inputid="${i}_1" data-wordid="1"></i>
                            </div>
                    </div>
                </div>
    
                <div class="dictionary-item-remove cursor-pointer" data-rowinfo="${randomIndex}" data-bs-toggle="modal" data-bs-target="#${dialogObjects[0].id}">
                    <i class="fas fa-trash edit-actual-word remove display-none" data-inputid="${i}" data-dictionary="${state.dictionaryID}" ></i>
                </div>
            </div>
            `
            state.pagination.itemNumber = index + i;
        });

    }


    function buildDictionaryElementsPage(renderArray) {

        state.pagination.location = 1;
        state.selectedDictionaryLength = getActualDictionaryLength();

        renderArray.sort(Global.compareValues(state.columnID, state.sortBy));

        sliceArray(renderArray);
        renderArray = state.pagination.slicedArray;

        resetEditorMode();


        renderDictionaryElementsHTML(renderArray);


        enabledEditorMode();
        isEnabledListeningMode();

        editSelectedWord();
        saveEditedWord();
        removeSelectedWord();
        readSelectedWord();



        if (state.filtered) {
            Pagination.renderPaginationFooter(state.filterArray); //ok
        }
        else {
            Pagination.renderPaginationFooter(state.dictionaries[state.dictionaryID].lexicon); //ok

        };


    }

    function searchInLexicon(input) {

        state.filterArray = state.dictionaries.filter(elem => {
            return elem.autoID == state.selectedDictionary
        });

        state.filterArray = state.filterArray[0].lexicon.filter(element => {
            return (element['word_1'].toLowerCase().includes(input.value.toLowerCase()) || element['word_2'].toLowerCase().includes(input.value.toLowerCase()))
        });

        if (state.filterArray.length > 0) state.filtered = true;

    }

    function enabledEditorMode() {

        const editorModeBtn = document.getElementById('edit-content-checker');
        const editBtn = document.querySelectorAll('.edit-actual-word');

        editorModeBtn.addEventListener("change", () => {

            if (editorModeBtn.checked) {
                state.editDictionaryMode = true;
                for (const button of editBtn) {
                    button.classList.remove("display-none");
                    const Global = GlobalObjectScope();
                    Global.showDialogPanel(0);
                }
            }
            else {
                state.editDictionaryMode = false;
                for (const button of editBtn) {
                    button.classList.add("display-none");
                }
            }
        })
    }

    function resetEditorMode() {

        const editorModeBtn = document.getElementById('edit-content-checker');
        editorModeBtn.checked = false;
        state.editDictionaryMode = false;
    }

    function isEnabledListeningMode() {

        const listeningModeButton = document.getElementById('listen-content-checker');
        const listenBtn = document.querySelectorAll('.listening-mode');


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
            button.classList.remove("display-none");
        }

    }

    function disabledListeningMode(listenBtn) {

        for (const button of listenBtn) {
            button.classList.add("display-none");
        }

    }

    function resetListeningMode() {

        const listeningModeButton = document.getElementById('listen-content-checker');
        listeningModeButton.checked = false;
        state.listeningMode = false;
    }

    function editSelectedWord() {

        const editBtn = document.querySelectorAll('.edit-actual-word.edit');

        for (const button of editBtn) {

            button.onclick = function () {

                if (!state.editDictionaryContent) {

                    const editorModeButton = document.getElementById('edit-content-checker');
                    editorModeButton.disabled = true;
                    state.editDictionaryContent = true;

                    inputID = button.dataset.inputid;

                    console.log(inputID);
                    button.classList.add("display-none");


                    const saveButtons = document.querySelectorAll('.save-edit');

                    for (const saveBtn of saveButtons) {
                        if (saveBtn.dataset.inputid === inputID) {
                            saveBtn.classList.remove("display-none");
                        }
                    }

                    const inputs = document.querySelectorAll('.dictionary-edit-content');

                    for (const input of inputs) {
                        if (input.dataset.inputid === inputID) {
                            input.classList.remove("display-none");
                        }
                    }

                    const labels = document.querySelectorAll('.dictionary-text-content');

                    for (const label of labels) {
                        if (label.dataset.inputid === inputID) {
                            label.classList.add("display-none");
                        }
                    }
                }
            }
        }
    }

    function readSelectedWord() {

        const readButtons = document.querySelectorAll('.listening-mode');

        for (const button of readButtons) {

            button.onclick = function () {

                const inputID = button.dataset.inputid;
                const labels = document.querySelectorAll('.dictionary-text-content');

                for (const label of labels) {
                    if (label.dataset.inputid === inputID) {
                        if (button.dataset.wordid === '0') {
                            Global.startSpeech(state.dictionaries[state.dictionaryID].langPrim, label.textContent);
                        }
                        else {
                            Global.startSpeech(state.dictionaries[state.dictionaryID].langSec, label.textContent);
                        }
                    }
                }
            }
        }
    }

    function saveEditedWord() {

        const editBtn = document.querySelectorAll('.edit-actual-word.edit');
        const inputs = document.querySelectorAll('.dictionary-edit-content');
        const labels = document.querySelectorAll('.dictionary-text-content');
        const saveButtons = document.querySelectorAll('.save-edit');

        for (const button of saveButtons) {

            button.onclick = function () {

                const editorModeButton = document.getElementById('edit-content-checker');
                editorModeButton.disabled = false;

                state.editDictionaryContent = false;

                inputID = button.dataset.inputid;
                button.classList.add("display-none");

                let newInput;

                for (const input of inputs) {
                    if (input.dataset.inputid === inputID) {
                        input.classList.add("display-none");
                        newInput = input.value;
                    }
                }

                for (const label of labels) {

                    if (label.dataset.inputid === inputID) {
                        label.classList.remove("display-none");
                        label.innerHTML = newInput;

                    }
                }

                for (const buton of editBtn) {

                    if (buton.dataset.inputid === inputID) {
                        buton.classList.remove("display-none");

                    }
                }
            }
        }
    }

    function removeSelectedWord() {

        const removeBtn = document.querySelectorAll('.dictionary-item-remove');
        const dictItem = document.querySelectorAll('.dictionary-item');
        for (const button of removeBtn) {
            button.onclick = function () {

                console.log(button.dataset.rowinfo);

                for (const line of dictItem) {

                    if (button.dataset.rowinfo === line.dataset.rowinfo) {

                        const word_1 = line.querySelector(".dictionary-first-word > span").innerText;
                        const word_2 = line.querySelector(".dictionary-second-word > span").innerText;
                        const Global = GlobalObjectScope();

                        console.log("törlés >> ", line.dataset.rowinfo, word_1, word_2);


                        Global.fillDialogPanel(`"${word_1} - ${word_2}"`);

                        document.getElementById('dialogAcceptButton').addEventListener('click', () => {
                            line.remove();
                        })

                    }
                }
            }
        }
    }

    function setColumnID(button) {
        state.columnID = button.dataset.columnid;
    }

    function getActualDictionaryLength() {
        var actual = state.dictionaries.filter(elem => {
            return elem.autoID == state.selectedDictionary
        });

        return actual[0].lexicon.length;
    }

    function sliceArray(array) {
        state.pagination.slicedArray = array.slice(0, state.pagination.itemsPerPage);
    }


    function filterBy(arr, filterBy, input) {
        state.filterArray = arr.filter(element => {
            return state.filterArray = element[filterBy].toLowerCase().includes(input.toLowerCase());
        });

        if (state.filterArray.length > 0) state.filtered = true;
    }


    return {
        'buildDictionariesPage': buildDictionariesPage,
        'renderDictionaryList': renderDictionaryList,
        'buildDictionaryElementsPage': buildDictionaryElementsPage,
    }

}
