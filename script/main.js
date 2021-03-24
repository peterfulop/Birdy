
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

window.onload = function () {
    renderFirst();
    runHttpRequest();
};



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


function resetPaginationState() {
    state.pagination.selectedPageIndex = 0;
    state.pagination.visisibledPages = [0, 1, 2];
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



var dashboardLinkContainer = document.querySelector(".links");
var mobileMenuButton = document.getElementById("mobile-menu-button");
var appWindow = document.querySelector(".app");


var actualPageContainer = document.querySelector("#active-page-name");
var actualPageIcon = document.querySelector("#active-page-icon");

var mobileMenuContainer = document.querySelector(".mobile-menu-container");
var mobileMenuElements = document.querySelectorAll(".mobile-menu-items");


var hideableText = document.querySelectorAll(".hideable");

var showHideBtn = document.querySelector("#show-hide-button");
var mainContent = document.querySelector(".main-content");
var dashboardLinks = document.querySelectorAll(".link");


var fullScreenButton = document.getElementById("full-screen-button");




function renderAppPanel() {
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

function renderApp() {

    resetState();

    renderAppPanel();

    dashboardLinkContainer = document.querySelector(".links");
    mobileMenuButton = document.getElementById("mobile-menu-button");
    appWindow = document.querySelector(".app");

    actualPageContainer = document.querySelector("#active-page-name"); //
    actualPageIcon = document.querySelector("#active-page-icon"); //
    renderMainMenu(); //

    dashboardLinks = document.querySelectorAll(".link"); //
    selectPages();//
    renderMobileMenu();//
    displayMobileMenu();//

    mobileMenuContainer = document.querySelector(".mobile-menu-container");//
    mobileMenuElements = document.querySelectorAll(".mobile-menu-items");//
    selectMobilePages();//

    hideableText = document.querySelectorAll(".hideable"); //
    showHideBtn = document.querySelector("#show-hide-button"); //
    showHideDashboard();//

    mainContent = document.querySelector(".main-content");//

    fullScreenButton = document.getElementById("full-screen-button");

    fullScreenMode();
    const mediaQuery = window.matchMedia('(max-width: 960px)');
    autoFullScreen(mediaQuery);
    mediaQuery.addListener(autoFullScreen);

}



function renderMainMenu() {

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

    var mobileMenuContainer = document.querySelector(".mobile-menu-container");

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
    appWindow.classList.remove("full-screen");
    document.getElementById('dashboard').classList.remove("full-screen");
    fullScreenButton.className = "fas fa-expand-arrows-alt";
    state.screenMode = 1;
}

function disableFullScreen() {
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

    var firstElement = document.querySelector(".links> div:nth-child(1) > div > i");
    firstElement.classList.add("active-page");
    actualPageContainer.innerHTML = dashboardMenuItems[0].text;
    actualPageIcon.className = dashboardMenuItems[0].icon;

    const Home = HomePageScope();

    Home.renderHomePage();


}


function removeActivePageClass() {
    dashboardLinks.forEach(item => {
        var activeIcon = item.querySelector("div > i");
        activeIcon.classList.remove("active-page");
    })
}

function selectPages() {

    var dashboardLinks = document.querySelectorAll(".link");

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
    var activeIcon = dashboardLinks[index].querySelector("div > i");
    removeActivePageClass();
    activeIcon.classList.add("active-page");
}

const mediaQueryDashboard = window.matchMedia('(max-width: 810px)');

function displayMobileMenu() {

    mobileMenuButton.addEventListener("click", () => {
        mobileMenuShowHide();
    })
}

function mobileMenuShowHide() {

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


function loadMethods(methodName) {
    var fn = window[methodName];
    if (typeof fn === "function") fn();
}


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


function showHideDashboard() {

    var show = true;

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
    mainContent.innerHTML = '';
}


/** LISTENING MODULE */
var listeningSelectLanguage
var listeningTextarea;
var listeningStartBtn;
var listeningClearBtn;



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
    Dictionary.renderDictionariesPage();

}


function resetFilteredState() {
    state.filterArray = [];
    state.filtered = false;

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
    renderLoginPage();
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


function searchInLexicon(input) {

    state.filterArray = state.dictionaries.filter(elem => {
        return elem.autoID == state.selectedDictionary
    });

    state.filterArray = state.filterArray[0].lexicon.filter(element => {
        return (element['word_1'].toLowerCase().includes(input.value.toLowerCase()) || element['word_2'].toLowerCase().includes(input.value.toLowerCase()))
    });

    if (state.filterArray.length > 0) state.filtered = true;

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



function renderPaginationFooter(array) {

    var counterBlock = document.getElementById('counter-block');
    var paginationBlock = document.getElementById('pagination-block');

    state.pagination.pages = Math.ceil(array.length / state.pagination.itemsPerPage);

    var countOf = state.filtered ? state.filterArray.length : state.pagination.itemNumber;
    var countAll = state.selectedDictionaryLength;

    counterBlock.innerHTML = `        
        <div class="element-counts align-items-center">
            <small>${countOf}/${countAll}</small>
        </div>
    `

    paginationBlock.innerHTML = `
        <nav aria-label="Page navigation example">
            <ul class="pagination" id="page-items">
                <li id="page-item-prev-arrow" class="cursor-pointer page-item ${state.pagination.pages <= 3 ? "disabled" : ""}"><span class="page-link nav">&laquo;</span></li>
            </ul>
        </nav>
    `

    renderPaginationButtons(array);

}

function renderPaginationButtons(array) {


    var paginationPages = document.getElementById('page-items');

    for (let i = 0; i < state.pagination.pages; i++) {
        paginationPages.innerHTML += `
        <li class="cursor-pointer page-item ${state.pagination.selectedPageIndex === i ? "active" : ""}">
        <span class="page-link button ${state.pagination.visisibledPages.includes(i) ? "" : "d-none"}" data-btnID="${i}">${i + 1}</span></li>
        `
    }

    paginationPages.innerHTML += `<li id="page-item-next-arrow" class="cursor-pointer page-item ${state.pagination.pages <= 3 ? "disabled" : ""}"><span class="page-link nav">&raquo;</span></li>`

    navButtonsEvent(array);
    navNextBtnEvent(array);
    navPrevBtnEvent(array);
}

function navButtonsEvent(array) {

    var navButtons = document.querySelectorAll('.page-link.button');

    for (let j = 0; j < navButtons.length; j++) {
        navButtons[j].addEventListener('click', () => {
            navigatePagination(j, array);
        })
    }

}

function navNextBtnEvent(array) {

    var pageItemNext = document.getElementById('page-item-next-arrow');

    pageItemNext.addEventListener('click', () => {

        if (state.pagination.visisibledPages[2] + 2 <= state.pagination.pages) {

            for (let m = 0; m < state.pagination.visisibledPages.length; m++) {
                state.pagination.visisibledPages[m] += 1;
            }

            showHideNavButtons(true);
            navigatePagination(state.pagination.selectedPageIndex, array);
        }

    })
}

function navPrevBtnEvent(array) {

    var pageItemPrev = document.getElementById('page-item-prev-arrow');

    pageItemPrev.addEventListener('click', () => {

        if (state.pagination.visisibledPages[0] > 0) {

            for (let m = 0; m < state.pagination.visisibledPages.length; m++) {
                state.pagination.visisibledPages[m] -= 1;
            }

            showHideNavButtons(false);

            navigatePagination(state.pagination.selectedPageIndex, array);
        }
    })
}


function showHideNavButtons(plus) {

    var navButtons = document.querySelectorAll('.page-link.button');

    state.pagination.selectedPageIndex = plus ? state.pagination.selectedPageIndex + 1 : state.pagination.selectedPageIndex - 1

    for (let i = 0; i < navButtons.length; i++) {

        var id = parseInt(navButtons[i].dataset.btnid);

        if (state.pagination.visisibledPages.includes(id)) {
            navButtons[i].classList.remove('d-none');
        }
        else {
            navButtons[i].classList.add('d-none');
        }
    }

}


function sliceArray(array) {

    state.pagination.slicedArray = array.slice(0, state.pagination.itemsPerPage);

}

function navigatePagination(selectedPageIndex, actualArray) {

    const Dictionary = DictionaryScope();

    state.pagination.selectedPageIndex = selectedPageIndex;
    const start = state.pagination.itemsPerPage * selectedPageIndex;
    const end = start + state.pagination.itemsPerPage;
    state.pagination.slicedArray = actualArray.slice(start, end);

    state.pagination.slicedArray = state.filtered ? state.filterArray.slice(start, end) : actualArray.slice(start, end);

    Dictionary.setPaginationMethod();

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