var state = {
    activeMenu: dashboardMenuItems[0].buttonID,
    selectedDictionary: "",
    dictionaryID: "",
    dictionaryName: "",
    dictionaries: dictionaries,
    editDictionaryMode: false,
    editDictionaryContent: false
}


function resetState() {
    state.selectedDictionary = "";
    state.dictionaryID = "";
    state.dictionaryName = "";
    state.dictionaries = dictionaries;
    state.editDictionaryMode = false;
    state.editDictionaryContent = false;
}


var dashboardLinkContainer = document.querySelector(".links");
var mobileMenuButton = document.querySelector("#mobile-menu-button");
var fullScreenButton = document.querySelector("#full-screen-button");
var appWindow = document.querySelector(".glass");


function renderMainMenu() {

    dashboardLinkContainer.innerHTML = '';

    Object.values(dashboardMenuItems).map(item => {
        dashboardLinkContainer.innerHTML += `
        <div class="link wide" data-buttonId="${item.buttonID}">
            <div class="link-icon-box">
                <i class="${item.icon}"></i>
            </div>
            <h3 id="hideable">${item.text}</h3>
        </div>`
    });

    setHomepage();
}

function renderMobileMenu() {

    var mobileMenuContainer = document.querySelector(".mobile-menu-container");

    mobileMenuContainer.innerHTML = '';

    Object.values(dashboardMenuItems).map(item => {
        mobileMenuContainer.innerHTML += `
        <div class="mobile-menu-items" data-buttonId="${item.buttonID}">
            <div class="link-icon-box">
                <i class="${item.icon}"></i>
            </div>
            <h3 id="mobile-menu-text">${item.text}</h3>
        </div>`
    });

}


fullScreenMode();

function fullScreenMode() {

    fullScreenButton.addEventListener("click", () => {

        if (appWindow.className == "glass full-screen") {
            appWindow.classList.remove("full-screen");
            fullScreenButton.className = "fas fa-expand-arrows-alt";
        }
        else {
            appWindow.classList.add("full-screen");
            fullScreenButton.className = "fas fa-compress-arrows-alt";
        }
    });
}

var actualPageContainer = document.querySelector("#active-page-name");
var actualPageIcon = document.querySelector("#active-page-icon");


function setHomepage() {
    var firstElement = document.querySelector(".links> div:nth-child(1) > div > i");
    firstElement.classList.add("active-page");
    actualPageContainer.innerHTML = dashboardMenuItems[0].text;
    actualPageIcon.className = dashboardMenuItems[0].icon;
}

renderMainMenu();

var dashboardLinks = document.querySelectorAll(".link");

function removeActivePageClass() {

    dashboardLinks.forEach(item => {
        var activeIcon = item.querySelector("div > i");
        activeIcon.classList.remove("active-page");
    })
}

function selectPages() {

    for (let i = 0; i < dashboardLinks.length; i++) {

        dashboardLinks[i].addEventListener('click', () => {
            state.activeMenu = dashboardLinks[i].dataset.buttonid;

            setActivePage(i);

            actualPageIcon.className = dashboardMenuItems[i].icon;
            actualPageContainer.innerHTML = dashboardMenuItems[i].text;
            loadMenuMethods(dashboardMenuItems[i].method);
        })
    }
}

function setActivePage(index) {
    var activeIcon = dashboardLinks[index].querySelector("div > i");
    removeActivePageClass();
    activeIcon.classList.add("active-page");
}

selectPages();
renderMobileMenu();
displayMobileMenu();


var mobileMenuContainer = document.querySelector(".mobile-menu-container");

function displayMobileMenu() {

    mobileMenuButton.addEventListener("click", () => {
        mobileMenuShowHide();
    })
}

function mobileMenuShowHide() {
    if (mobileMenuContainer.className == "mobile-menu-container disabled") {
        mobileMenuContainer.classList.remove("disabled");
    }
    else {
        mobileMenuContainer.classList.add("disabled");
    }
}


var mobileMenuElements = document.querySelectorAll(".mobile-menu-items");

function selectMobilePages() {

    for (let i = 0; i < mobileMenuElements.length; i++) {

        mobileMenuElements[i].addEventListener('click', () => {
            state.activeMenu = dashboardLinks[i].dataset.buttonid;
            actualPageIcon.className = dashboardMenuItems[i].icon;
            actualPageContainer.innerHTML = dashboardMenuItems[i].text;
            loadMenuMethods(dashboardMenuItems[i].method);
            mobileMenuShowHide();
            setActivePage(i);
        })
    }
}

selectMobilePages();


function loadMenuMethods(methodName) {

    var fn = window[methodName];
    if (typeof fn === "function") fn();

}


var hideableText = document.querySelectorAll("#hideable");

function hideMainMenuText() {
    hideableText.forEach(element => {
        element.style.display = "none";
    });
    addTightClass();
}

function showMainMenuText() {

    hideableText.forEach(element => {
        element.style.display = "block";
    });

    addWideClass();
}

function addTightClass() {

    dashboardLinks.forEach(element => {
        element.classList.remove("wide");
        element.classList.add("tight");
    })

}

function addWideClass() {

    dashboardLinks.forEach(element => {
        element.classList.remove("tight");
        element.classList.add("wide");
    })

}

var showHideBtn = document.querySelector("#show-hide-button");

showHideDashboard();


function showHideDashboard() {

    var show = true;

    showHideBtn.addEventListener('click', () => {

        var showIconClass = "fas fa-angle-double-right";
        var hideIconClass = "fas fa-angle-double-left";
        var dashboardPanel = document.querySelector(".dashboard");
        var dashboardHeader = document.querySelector("#show-hide-button");

        if (show) {
            show = false;
            dashboardHeader.innerHTML = '';
            dashboardHeader.innerHTML = `<i class="${showIconClass}" id="show-hide-button"></i>`;
            dashboardPanel.classList.remove('wide');
            dashboardPanel.classList.add('tight');
            hideMainMenuText();
        }

        else {
            show = true;
            dashboardHeader.innerHTML = '';
            dashboardHeader.innerHTML = `<i class="${hideIconClass}" id="show-hide-button"></i>`;
            dashboardPanel.classList.remove('tight');
            dashboardPanel.classList.add('wide');
            setTimeout(showMainMenuText, 500);
        }
    })
}


/*  MAIN CONTENT */

var mainContent = document.querySelector(".main-content");


function Menu_Clear_MainContent() {
    mainContent.innerHTML = '';
}

/* IMPORTANT VARAIBLES */

var createNewDictionaryButton;
var addNewBlock;
var createNewBlock;
var createNewAcceptBtn;
var createNewClearBtn;
var createNewTextInput;
//var openDictionaryButtons;

/* -------------------------- */


function menu_load_home() {
    resetState();
    Menu_Clear_MainContent();

}

function menu_load_profile() {
    resetState();
    Menu_Clear_MainContent();

    mainContent.innerHTML = `
        <form>
        <div class="mb-3">
            <label for="" class="form-label">Username</label>
            <input type="text" class="form-control" aria-describedby="">
            <div  class="form-text"></div>
        </div>
        <div class="mb-3">
            <label for="" class="form-label">Email address</label>
            <input type="email" class="form-control" aria-describedby="emailHelp">
            <div  class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="" class="form-label">Email address</label>
            <input type="email" class="form-control" aria-describedby="emailHelp">
            <div class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="" class="form-label">Password</label>
            <input type="password" class="form-control">
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" >
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    `
}

function menu_load_dictionaries() {

    resetState();
    Menu_Clear_MainContent();


    mainContent.innerHTML = `
        <h5 class="text-center mb-4">Szótárak listája</h5>

        <div class="view-menu-bar-create my-3">

            <div class="add-new-block">
                <p class="m-2">Új szótár!</p>
                <i class="fas fa-plus-square" id="add-button"></i>
            </div>
            
            <div class="create-new-dictionary disabled mb-3">
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
            <div class="mb-2 dictionaries-search-bar">
                <input type="text" class="form-control" id= "dictionaries-search-input" placeholder="Search...">
                <button type="button" class="btn btn-secondary " id="search-dictionary-button"><i class="fas fa-search"></i></button>
            </div>
            <div class="dictionary-list-header d-flex py-2 pl-2 border-bottom border-white">
                <div class="col-8 d-flex justify-content-start">
                    <div class="d-flex justify-content-between text-muted cursor-pointer">
                        <i class="fas fa-sort-alpha-up pr-2"></i>
                        <p class="mb-0 px-2 text-muted">Név</p></div>
                    </div>
                <div class="col-4 d-flex justify-content-end"><p class="mb-0 text-muted">Művelet</p></div>
            </div>

            <div class="dictionary-list-items overflow-scroll p-2" style="max-height: 300px">

            </div>
        </div>
        <div class="dictionary-item-list-pagination mt-2 d-flex justify-content-end">
             <nav aria-label="...">
                <ul class="pagination">
                    <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1">Previous</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item active">
                        <a class="page-link" href="#">2 <span class="sr-only"></span></a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    `


    /** */
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
    /** */

    var content = document.querySelector(".dictionary-list-items");
    content.innerHTML = '';

    Object.values(dictionaries).map(dictionary => {
        content.innerHTML +=
            `
            <div class="dictionary-list-item border-bottom">
                <div class="dictionary-list-item-1">
                    <div class="dictionary-list-item-details">
                        <i class="fas fa-bookmark"></i>
                        <h6>${dictionary.name} <small>[${dictionary.lexicon.length}]</small></h6>
                    </div>
                </div>    
                <div class="btn-group dictionary-list-item-button" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-sm open-content content-action" id="open-content" data-dictid ="${dictionary.id}"><i class="fab fa-readme"></i></button>
                    <button type="button" class="btn btn-sm edit-content content-action" id="edit-content"  data-dictid ="${dictionary.id}"><i class="fas fa-edit"></i></button>
                    <button type="button" class="btn btn-sm delete-content content-action" id="delete-content" data-dictid ="${dictionary.id}"><i class="fas fa-trash-alt"></i></i></button>
                </div>
            </div>
        `
    });

    createNewDictionaryButton = document.querySelector(".add-new-block");
    addNewBlock = document.querySelector(".add-new-block");
    createNewBlock = document.querySelector(".create-new-dictionary");
    createNewAcceptBtn = document.querySelector("#create-new-accept");
    createNewClearBtn = document.querySelector("#create-new-close");
    createNewTextInput = document.querySelector("#create-new-text-input");


    /* Load Enabled Methods */
    createNewDictionary();
    backToNewDictionary();
    selectDictionaryMethod();

}

function menu_load_addwords() {

    resetState();
    Menu_Clear_MainContent();

    createDictionaryDDList(mainContent);

    mainContent.innerHTML += `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Holy guacamole!</strong> You should check in on some of those fields below.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        </div>

        <div class="add-new-words-input">
            <div class="col-md-12 input-box-1">
                <label for="validationServer01" class="form-label">Idegen kifejezés</label>
                <div class="new-word-input-1">
                    <input type="text" class="form-control" id="validationServer01" value="" required><button class="btn btn-secondary" type=""><i class="fas fa-volume-up"></i></button>
                </div>
                <div class="feedback new-word-input-1">Looks good!</div>
            </div>

            <div class="col-md-12 input-box-2">
                <label for="validationServer02" class="form-label">Magyar kifejezés</label>
                    <div class="new-word-input-2">
                        <input type="text" class="form-control" id="validationServer02" value="" required>
                        <button class="btn btn-secondary" type=""><i class="fas fa-volume-up"></i></button>
                    </div>
                    <div class="feedback new-word-input-2">Looks good!</div>
                </div>
             </div>

            <div class="add-new-words-buttons">
                <div class="buttons-left">
                    <button class="btn btn-success" type="">Rögzítés</button>
                </div>
                <div class="buttons-right">
                    <button class="btn btn-danger" type=""><i class="fas fa-eraser"></i></button>
                    <button class="btn btn-warning" type=""><i class="fas fa-sync-alt"></i></button>
                </div>
            </div>
        </div>
    `

}

function menu_load_brainteaser() {

    resetState();
    Menu_Clear_MainContent();
    excerciseLoadSettings();
}

function menu_load_listening() {
    resetState();
    Menu_Clear_MainContent();

}

function menu_load_records() {
    resetState();
    Menu_Clear_MainContent();

}

function menu_load_settings() {
    resetState();
    Menu_Clear_MainContent();

}

function menu_load_signout() {
    resetState();
    Menu_Clear_MainContent();

}

function createNewDictionary() {
    if (createNewDictionaryButton) {
        createNewDictionaryButton.addEventListener('click', () => {
            console.log("Új szótár létrehozása")
            addNewBlock.classList.add('disabled');
            createNewBlock.classList.remove('disabled');
        })
    }
};

function backToNewDictionary() {
    if (createNewClearBtn) {
        createNewClearBtn.addEventListener('click', () => {
            console.log("Vissza")
            createNewTextInput.value = '';
            createNewBlock.classList.add('disabled');
            addNewBlock.classList.remove('disabled');
        })
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
}

function openDictionary() {

    console.log("Open Dictionary");

    for (let i = 0; i < dictionaries.length; i++) {

        if (dictionaries[i].id === state.selectedDictionary) {
            state.dictionaryID = i;
            state.dictionaryName = dictionaries[i].name;
            console.log(state.dictionaryID);
            console.log(dictionaries[i].id);
            console.log(dictionaries[i].name);
            console.log(dictionaries[i].relaseDate);

            renderDinctionaryContent();
        }
    }
}

function editDictionary() {

    console.log("Edit Dictionary");

    for (let i = 0; i < dictionaries.length; i++) {

        if (dictionaries[i].id === state.selectedDictionary) {
            console.log(dictionaries[i].id);
            console.log(dictionaries[i].name);
            console.log(dictionaries[i].relaseDate);
        }
    }
}

function deleteDictionary() {

    console.log("Delete Dictionary");

    for (let i = 0; i < dictionaries.length; i++) {
        if (dictionaries[i].id === state.selectedDictionary) {
            console.log(dictionaries[i].id);
            console.log(dictionaries[i].name);
            console.log(dictionaries[i].relaseDate);
        }
    }
}



function renderDinctionaryContent() {


    mainContent.innerHTML = '';

    mainContent.innerHTML = `
        <h5 class="text-center mb-4">${state.dictionaryName} szótár tartalma</h5>
        <div class="mb-2 dictionaries-search-bar">
            <button type="button" class="btn bg-info bt-sm text-white" id="back-dictionary-button"><i class="fas fa-arrow-left"></i></button>
            <div class="search-bar">
            <input type="text" class="form-control" id="dictionaries-search-input"
                placeholder="Search...">
            <button type="button" class="btn btn-secondary" id="search-dictionary-button"><i class="fas fa-search"></i></button>
            </div>
        </div>

        
        <div class="dictionary-content-toolbar  mb-3 mt-3 d-flex justify-content-around">
            <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="edit-content-checker">
            <label class="form-check-label" for="edit-content-checker">Editot mode</label>
            </div>
            <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="listen-content-checker">
            <label class="form-check-label" for="listen-content-checker">Listening mode</label>
            </div>
        </div>

        <div class="dictionary-item-list overflow-scroll p-2" style="max-height: 350px">
        </div>

        <div class="dictionary-item-list-pagination mt-2 d-flex justify-content-end">
            <nav aria-label="...">
                <ul class="pagination">
                    <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1">Previous</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item active">
                        <a class="page-link" href="#">2 <span class="sr-only"></span></a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>

    `


    var dictionaryItemList = document.querySelector('.dictionary-item-list');

    var counter = 0;
    Object.values(state.dictionaries[state.dictionaryID].lexicon).map(item => {
        dictionaryItemList.innerHTML += `
        <div class="dictionary-item mb-1">
            <div class="dictionary-item-count">
                <span>${counter + 1}.</span>
            </div>
            <div class="dictionary-item-words">
                <div class="dictionary-first-word mr-1">
                    <span class="dictionary-text-content p-1 enabled" data-inputid="${counter}_0">${item.array[0]}</span>
                    <input type="text" class="dictionary-edit-content p-1 disabled" data-inputid="${counter}_0" data-wordid="0" value="${item.array[0]}">
                    <div class="dictionary-item-buttons">

                        <i class="fas fa-edit edit-actual-word disabled" data-inputid="${counter}_0" data-wordid="0"></i>
                        <i class="fas fa-check save-edit disabled" data-inputid="${counter}_0" data-wordid="0"></i>
                        <i class="fas fa-volume-up listening-mode disabled" data-inputid="${counter}_0" data-wordid="0"></i>

                    </div>
                </div>
                <div class="dictionary-second-word mr-1">
                        <span class="dictionary-text-content p-1 enabled" data-inputid="${counter}_1">${item.array[1]}</span>
                        <input type="text" class="dictionary-edit-content p-1 disabled" data-inputid="${counter}_1" data-wordid="1" value="${item.array[1]}">

                        <div class="dictionary-item-buttons listen">

                            <i class="fas fa-edit edit-actual-word disabled" data-inputid="${counter}_1" data-wordid="1"></i>
                            <i class="fas fa-check save-edit disabled" data-inputid="${counter}_1" data-wordid="1"></i>
                            <i class="fas fa-volume-up listening-mode disabled" data-inputid="${counter}_1" data-wordid="1"></i>

                        </div>
                </div>
            </div>
        </div>
        `
        counter++;
    });




    var backButton = document.getElementById('back-dictionary-button');

    backButton.addEventListener('click', () => {
        menu_load_dictionaries();
    })

    editSelectedWord();
    saveEditedWord();

    enabledEditorMode();

    enabledListeningMode();
    readSelectedWord();

}


function enabledEditorMode() {

    var editorModeButton = document.getElementById('edit-content-checker');
    var editBtn = document.querySelectorAll('.edit-actual-word');

    editorModeButton.addEventListener("change", () => {

        state.editDictionaryMode = !state.editDictionaryMode;

        if (state.editDictionaryMode && !state.editDictionaryContent) {
            for (const button of editBtn) {
                button.classList.remove("disabled");
            }
        }
        else {
            for (const button of editBtn) {
                button.classList.add("disabled");
            }
        }
    })
}


function enabledListeningMode() {

    var listeningModeButton = document.getElementById('listen-content-checker');
    var listenBtn = document.querySelectorAll('.listening-mode');

    listeningModeButton.addEventListener("change", () => {
        if (listeningModeButton.checked) {
            for (const button of listenBtn) {
                button.classList.remove("disabled");
                enabledEditorMode();
            }
        }
        else {
            for (const button of listenBtn) {
                button.classList.add("disabled");
            }
        }
    })
}

function editSelectedWord() {

    var editBtn = document.querySelectorAll('.edit-actual-word');

    for (const button of editBtn) {

        button.onclick = function () {

            if (!state.editDictionaryContent) {

                var editorModeButton = document.getElementById('edit-content-checker');
                editorModeButton.disabled = true;
                state.editDictionaryContent = true;

                inputID = button.dataset.inputid;

                console.log(inputID);
                button.classList.add("disabled");


                var saveButtons = document.querySelectorAll('.save-edit');

                for (const saveBtn of saveButtons) {
                    if (saveBtn.dataset.inputid === inputID) {
                        saveBtn.classList.remove("disabled");
                    }
                }

                var inputs = document.querySelectorAll('.dictionary-edit-content');

                for (const input of inputs) {
                    if (input.dataset.inputid === inputID) {
                        input.classList.remove("disabled");
                    }
                }

                var labels = document.querySelectorAll('.dictionary-text-content');

                for (const label of labels) {
                    if (label.dataset.inputid === inputID) {
                        label.classList.add("disabled");
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
                        startSpeech(dictionaries[state.dictionaryID].langugagePrimary, label.textContent);
                    }
                    else {
                        startSpeech(dictionaries[state.dictionaryID].languageSecondary, label.textContent);
                    }
                }
            }
        }
    }
}

function saveEditedWord() {

    var editBtn = document.querySelectorAll('.edit-actual-word');
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
            button.classList.add("disabled");

            var newInput;

            for (const input of inputs) {
                if (input.dataset.inputid === inputID) {
                    input.classList.add("disabled");
                    newInput = input.value;
                }
            }

            for (const label of labels) {

                if (label.dataset.inputid === inputID) {
                    label.classList.remove("disabled");
                    label.innerHTML = newInput;

                }
            }

            for (const buton of editBtn) {

                if (buton.dataset.inputid === inputID) {
                    buton.classList.remove("disabled");

                }
            }
        }
    }
}



function resetDictionariesPage() {

}


var excerciseStartButton;

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


/* Szótárlista létrehozása, és feltöltése ****************************************************/

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

    var content = document.querySelector("#dictionary-name-select");
    content.innerHTML = '';
    Object.values(dictionaries).map(item => {
        content.innerHTML += `<option value = "${item.value}" data-dictid="${item.id}">${item.name}</option>`;
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
/* ******************************************************************************************* */


/* Futási idő lista létrehozása, és feltöltése ************************************************/

function createExcerciseRunTimeDDList(contener) {

    var wordCount = setEnabledWordsCount();

    contener.innerHTML += `
    <div class= "select-dictionary mb-3">
            <label for="" class="form-label">Gyakorlás hossza:</label>
            <select class="form-select" id="runtime-name-select">
            </select>
        </div>
        <div class="mb-3 disabled" id="set-word-count-section">
            <label for="" class="form-label">Kikérdezett szavak mennyisége:</label>
            <input type="number" class="form-control " id="set-word-count-input" max="${wordCount}" min="1">
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
            countManualBox.classList.remove("disabled");
            // Érték adása az input boxhoz!
            setCountManual.value = wordCount;
            updateRunTimeCount();
        }
        else {
            countManualBox.classList.add("disabled");
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
    })

    // frissítés
    defineExcercise();

}
/* ******************************************************************************************* */


/* Start gomb létrehozása, és paraméterezése ****************************************************/

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

    })

}

var defineExcercise = () => {

    state.dictionaryID = dictionaryNameSelect.value;
    state.selectedDictionary = dictionaryNameSelect[dictionaryNameSelect.value].dataset.dictid;
    state.dictionaryName = dictionaryNameSelect[dictionaryNameSelect.value].textContent;

    return excInfo = {
        maxValue: dictionaries[dictionaryNameSelect.value].lexicon.length,
        dictionary: dictionaryNameSelect.value,
        excIndex: excerciseNameSelect.value,
        timeIndex: runtimeNameSelect.value,
        countIndex: setCountManual.value
    };
}

/* ******************************************************************************************* */


function setEnabledWordsCount() {
    return dictionaries[dictionaryNameSelect.value].lexicon.length;
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
                        <div class="question-box-value">
                            <p></p>
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
                                    type="">Tovább!</button>
                                <button class="btn btn-secondary" id="answer-button-next" type=""><i
                                    class="fas fa-step-forward"></i></button>
                                <button class="btn btn-danger" type=""><i class="fas fa-stop"></i></button>
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
    answerBoxInput = document.querySelector("#answer-box-input");
    answerBoxAcceptButton = document.querySelector("#answer-button-accept");

    minutesLabel = document.querySelector("#minutes");
    secondsLabel = document.querySelector("#seconds");

    numberOfExcercise = document.querySelector("#number-of-excercise");
    countOfNumbers = document.querySelector("#count-of-numbers");

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

        var randomText = dictionaries[excInfo.dictionary].lexicon[randomIndex].array;

        var questionIndex = excInfo.excIndex == 2 ? randomIntGenerator(0, 1) : excInfo.excIndex;

        console.log("question: " + randomText[0] + ' - ' + randomText[1]);

        questionBoxText.innerHTML = randomText[questionIndex];

        numberOfExcercise.innerHTML = indexPuffer.length;
        countOfNumbers.innerHTML = maxNumber;

        showQuestionBox();
        answerBoxInput.focus();

    }

}


function sendAnswerToScreen() {


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
    questionBox.classList.add("disabled");
}

function showQuestionBox() {
    questionBox.classList.remove("disabled");
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


///** RANDOM ID GENERATOR */ //

function generateID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

