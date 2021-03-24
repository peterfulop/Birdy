
window.onload = function () {
    renderFirst();
    runHttpRequest();
};


const state = {
    screenMode: 0,
    activeMenu: dashboardMenuItems[0].buttonID,
    selectedDictionary: "",
    selectedDictionaryLength: 0,
    dictionaryID: "",
    dictionaryName: "",
    dictionaries: array_dictionaries,
    words: array_words,
    editDictionaryMode: false,
    editDictionaryContent: false,
    listeningMode: false,
    filterArray: [],
    filtered: false,
    sortBy: 'asc',
    columnID: 'word_1',
    pagination: {
        pages: 0,
        selectedPageIndex: 0,
        visisibledPages: [0, 1, 2],
        slicedArray: [],
        itemsPerPage: 6,
        itemNumber: 0,
        location: 0,
    },
    notes: array_notes
}

function resetState() {
    state.selectedDictionary = "";
    state.dictionaryID = "";
    state.dictionaryName = "";
    state.dictionaries = array_dictionaries;
    state.words = array_words;
    state.editDictionaryMode = false;
    state.editDictionaryContent = false;
    state.listeningMode = false;
    resetFilteredState();
    state.sortBy = 'asc';
    state.columnID = 'word_1';
    state.pagination = {
        pages: 0,
        selectedPageIndex: 0,
        visisibledPages: [0, 1, 2],
        slicedArray: [],
        itemsPerPage: 6,
        itemNumber: 0,
        location: 0
    };
    state.notes = array_notes;
}

function renderFirst() {

    var section = document.createElement("section");
    section.setAttribute('id', 'circles');
    document.body.appendChild(section);

    document.getElementById('circles').innerHTML = `
            <div class="circle1 circle"></div>
            <div class="circle2 circle"></div>
            <div class="circle3 circle"></div>
            <div class="circle4 circle"></div>
            <div class="circle5 circle"></div>
            <div class="circle6 circle"></div>
        `
    renderLoginPage();

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



function renderAppHTML() {

    document.getElementById('main-app').innerHTML = `   
        <section class="app" id="app-box">
            <div class="dashboard wide" id="dashboard">

                <div class="dashboard-header">
                    <i id="full-screen-button" class="fas fa-expand-arrows-alt"></i>
                    <i id="show-hide-button" class="fas fa-angle-double-left"></i>
                </div>

                <div class="user">
                    <img src="./images/avatar.png" alt="" id="avatar">
                    <h5 class="user-username hideable">Username</h5>
                    <p class="user-extra-data hideable">Pro Member</p>
                </div>

                <div class="links" style="max-height: 50vh; overflow:auto">
                </div>
            </div>
            <div class="pages" id="page-content-box">
                <div class="status d-block p-0" id="status-bar">

                    <div class="status d-flex w-100 px-3 py-2 align-items-center justify-content-between">
                        <div class="page-name">
                            <h3 id="active-page-name"></h3>
                        </div>
                        <div class="page-icon">
                            <i id="active-page-icon"></i>
                            <div class="mobile-menu-icon">
                                <i class="fas fa-bars" id="mobile-menu-button"></i>
                            </div>
                        </div>
                    </div>

                    <div class="mobile-menu-container d-none">
                    </div>

                </div>

                <div class="main">
                    <div class="main-content p-3 p-sm-4" id="main-content-box">
                    </div>
                </div>
            </div>
        </section>     
    `
}

function buildApp() {

}


function renderApp() {

    resetState();

    renderAppHTML();

    renderMainMenu();

    selectPages();

    renderMobileMenu();

    displayMobileMenu();

    selectMobilePages();

    showHideDashboard();

    fullScreenMode();

    mediaQuery();

}

function mediaQuery() {

    //const mediaQueryDashboard = window.matchMedia('(max-width: 810px)');
    const mediaQuery = window.matchMedia('(max-width: 960px)');
    autoFullScreen(mediaQuery);
    mediaQuery.addListener(autoFullScreen);
}

function renderMainMenu() {

    const dashboardLinkContainer = document.querySelector(".links");
    dashboardLinkContainer.innerHTML = '';

    Object.values(dashboardMenuItems).map(item => {
        dashboardLinkContainer.innerHTML += `
        <div class="link wide" data-buttonId="${item.buttonID}" title=${item.text}>
            <div class="link-icon-box">
                <i class="${item.icon}"></i>
            </div>
            <h3 class="hideable">${item.text}</h3>
        </div>`
    });

    setHomepage();
}

function renderMobileMenu() {

    const mobileMenuContainer = document.querySelector(".mobile-menu-container");

    mobileMenuContainer.innerHTML = '';

    Object.values(dashboardMenuItems).map(item => {
        mobileMenuContainer.innerHTML += `
        <div class="mobile-menu-items py-2" data-buttonId="${item.buttonID}">
            <div class="link-icon-box">
                <i class="${item.icon}"></i>
            </div>
            <h3 id="mobile-menu-text">${item.text}</h3>
        </div>`
    });

}

function fullScreenMode() {

    const fullScreenButton = document.getElementById("full-screen-button");

    fullScreenButton.addEventListener("click", () => {

        if (state.screenMode == 1) {
            disableFullScreen();
        }
        else {
            enableFullScreen();
        }
    });
}

function enableFullScreen() {
    const appWindow = document.querySelector(".app");
    const fullScreenButton = document.getElementById("full-screen-button");

    appWindow.classList.remove("full-screen");
    document.getElementById('dashboard').classList.remove("full-screen");
    fullScreenButton.className = "fas fa-expand-arrows-alt";
    state.screenMode = 1;
}

function disableFullScreen() {

    const appWindow = document.querySelector(".app");
    const fullScreenButton = document.getElementById("full-screen-button");

    appWindow.classList.add("full-screen");
    document.getElementById('dashboard').classList.add("full-screen");
    fullScreenButton.className = "fas fa-compress-arrows-alt";
    state.screenMode = 0;

}

function autoFullScreen(mediaQuery) {

    if (document.getElementById('dashboard') != undefined) {
        if (mediaQuery.matches) {
            disableFullScreen();

        } else {
            enableFullScreen();
        }
    }
}

function setHomepage() {

    const actualPageContainer = document.querySelector("#active-page-name"); //
    const actualPageIcon = document.querySelector("#active-page-icon"); //

    const firstElement = document.querySelector(".links> div:nth-child(1) > div > i");
    firstElement.classList.add("active-page");
    actualPageContainer.innerHTML = dashboardMenuItems[0].text;
    actualPageIcon.className = dashboardMenuItems[0].icon;

    const Home = HomePageScope();

    Home.renderHomePage();

}

function removeActivePageClass() {
    const dashboardLinks = document.querySelectorAll(".link");

    dashboardLinks.forEach(item => {
        var activeIcon = item.querySelector("div > i");
        activeIcon.classList.remove("active-page");
    })
}

function selectPages() {

    const dashboardLinks = document.querySelectorAll(".link");
    const actualPageContainer = document.querySelector("#active-page-name"); //
    const actualPageIcon = document.querySelector("#active-page-icon"); //


    for (let i = 0; i < dashboardLinks.length; i++) {

        dashboardLinks[i].addEventListener('click', () => {
            state.activeMenu = dashboardLinks[i].dataset.buttonid;
            setActivePage(i);
            actualPageIcon.className = dashboardMenuItems[i].icon;
            actualPageContainer.innerHTML = dashboardMenuItems[i].text;
            loadMethods(dashboardMenuItems[i].method);
        })
    }
}

function setActivePage(index) {
    const dashboardLinks = document.querySelectorAll(".link");

    var activeIcon = dashboardLinks[index].querySelector("div > i");
    removeActivePageClass();
    activeIcon.classList.add("active-page");
}

function displayMobileMenu() {

    const mobileMenuButton = document.getElementById("mobile-menu-button");

    mobileMenuButton.addEventListener("click", () => {
        mobileMenuShowHide();
    })
}

function mobileMenuShowHide() {

    const mobileMenuContainer = document.querySelector(".mobile-menu-container");
    if (mobileMenuContainer.classList.contains("d-none")) {
        console.log('tartalmaz');
        mobileMenuContainer.classList.remove("d-none");
    }
    else {
        console.log('nem tartalmaz');
        mobileMenuContainer.classList.add("d-none");
    }
}


function selectMobilePages() {

    const actualPageContainer = document.querySelector("#active-page-name"); //
    const actualPageIcon = document.querySelector("#active-page-icon"); //
    const dashboardLinks = document.querySelectorAll(".link");
    const mobileMenuElements = document.querySelectorAll(".mobile-menu-items");//


    for (let i = 0; i < mobileMenuElements.length; i++) {

        mobileMenuElements[i].addEventListener('click', () => {
            state.activeMenu = dashboardLinks[i].dataset.buttonid;
            actualPageIcon.className = dashboardMenuItems[i].icon;
            actualPageContainer.innerHTML = dashboardMenuItems[i].text;
            loadMethods(dashboardMenuItems[i].method);
            mobileMenuShowHide();
            setActivePage(i);
        })
    }
}





function hideMainMenuText() {

    const hideableText = document.querySelectorAll(".hideable");

    hideableText.forEach(element => {
        element.style.display = "none";
    });
    addTightClass();
}

function showMainMenuText() {

    const hideableText = document.querySelectorAll(".hideable");


    hideableText.forEach(element => {
        element.style.display = "block";
    });

    addWideClass();
}

function addTightClass() {
    const dashboardLinks = document.querySelectorAll(".link");


    dashboardLinks.forEach(element => {
        element.classList.remove("wide");
        element.classList.add("tight");
    })
}

function addWideClass() {
    const dashboardLinks = document.querySelectorAll(".link");


    dashboardLinks.forEach(element => {
        element.classList.remove("tight");
        element.classList.add("wide");
    })
}

function showHideDashboard() {

    const showHideBtn = document.querySelector("#show-hide-button");

    let show = true;

    showHideBtn.addEventListener('click', () => {

        var showIconClass = "fas fa-angle-double-right";
        var hideIconClass = "fas fa-angle-double-left";
        var showHideBtn = document.querySelector("#show-hide-button");

        if (show) {
            show = false;
            showHideBtn.className = showIconClass;
            hideMainMenuText();
        }

        else {
            show = true;
            showHideBtn.className = hideIconClass;
            showMainMenuText();
        }
    })
}

function Menu_Clear_MainContent() {
    const mainContent = document.querySelector(".main-content");
    mainContent.innerHTML = '';
}




function loadMethods(methodName) {
    var fn = window[methodName];
    if (typeof fn === "function") fn();
}

function menu_load_home() {

    resetState();
    Menu_Clear_MainContent();

    const Home = HomePageScope();
    Home.renderHomePage();
}

function menu_load_profile() {

    resetState();
    Menu_Clear_MainContent();

    const Profile = ProfilePageScope();
    Profile.renderProfilePage();

}

function menu_load_dictionaries() {

    resetState();
    Menu_Clear_MainContent();

    const Dictionary = DictionaryPageScope();
    Dictionary.buildDictionariesPage();

}

function menu_load_addwords() {

    resetState();
    Menu_Clear_MainContent();

    const AddWords = AddWordsScope();
    AddWords.renderAddWordsContent();

}

function menu_load_brainteaser() {

    resetState();
    Menu_Clear_MainContent();
    excerciseLoadSettings();
}

function menu_load_listening() {
    resetState();
    Menu_Clear_MainContent();

    const Reader = ReaderPageScope()
    Reader.renderReaderPageContent();

}

function menu_load_search() {
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
    renderLoginPage();
}




function resetFilteredState() {
    state.filterArray = [];
    state.filtered = false;

}


function filterBy(arr, filterBy, input) {

    state.filterArray = arr.filter(element => {
        return state.filterArray = element[filterBy].toLowerCase().includes(input.toLowerCase());
    });

    if (state.filterArray.length > 0) state.filtered = true;
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

function setColumnID(button) {
    state.columnID = button.dataset.columnid;
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

function getActualDictionaryLength() {
    var actual = state.dictionaries.filter(elem => {
        return elem.autoID == state.selectedDictionary
    });

    return actual[0].lexicon.length;
}

function sliceArray(array) {
    state.pagination.slicedArray = array.slice(0, state.pagination.itemsPerPage);
}



///** RANDOM ID GENERATOR */ //

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