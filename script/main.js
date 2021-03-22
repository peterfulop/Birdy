const state = {
    screenMode: 0,
    activeMenu: dashboardMenuItems[0].buttonID,
    selectedDictionary: "",
    selectedDictionaryLength: 0,
    dictionaryID: "",
    dictionaryName: "",
    dictionaries: array_dictionaries,
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
    }
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
    renderLoginForm();

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




function renderLoginForm() {

    resetState();

    document.getElementById('main-app').innerHTML = `

        <section class="login-app d-flex justify-content-center" id="login-app-box">

            <form class="col-10 justify-content-center mb-n2">

                <div class="d-flex flex-column align-items-center login-logo-box justify-content-center mb-4"
                    id="login-logo-box">
                    <img src="./images/avatar.png" alt="logo" id="login-form-logo">
                    <h3>LOGIN</h3>
                </div>

                <div class="my-3">
                    <label for="login-username" class="form-label">Felhasználónév</label>
                    <input type="text" class="form-control" id="login-username">
                    <div class="form-text"></div>
                </div>
                <div class="mb-3">
                    <label for="login-password" class="form-label">Jelszó</label>
                    <input type="password" class="form-control" id="login-password" autocomplete="on">
                </div>

                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="remember-me-checker">
                    <label class="form-check-label" for="remember-me-checker">Emlékezz rám!</label>
                </div>

                <button type="button" class="btn btn-primary rounded-pill w-100 mb-3">Bejelentkezés</button>
                <button type="button" class="btn btn-light rounded-pill mb-3 w-100" id="register-new-user-button">Regisztráció</button>
                <button type="button" class="btn btn-link rounded-pill mb-3 w-100">Elfelejtett jelszó</button>

                <div class="d-flex social-icon-bar align-items-center justify-content-center">
                    <div class="social-icon-box"><i class="fab fa-google"></i></div>
                    <div class="social-icon-box"><i class="fab fa-facebook-f"></i></div>
                </div>
            </form>
        </section>
    `

    document.getElementById("register-new-user-button").onclick = function () {
        console.log("render register....");
        renderRegisterForm();
    }

    var LoginImage = document.getElementById('login-form-logo');

    if (LoginImage) {
        LoginImage.onclick = function () {
            renderApp();
        }
    }

}


function renderRegisterForm() {

    resetState();

    document.getElementById('main-app').innerHTML = `
         <section class="register-app d-flex justify-content-center" id="login-app-box">

            <form class="col-10 justify-content-center mb-n2">

                <div class="d-flex flex-column align-items-center login-logo-box justify-content-center mb-4"
                    id="login-logo-box">
                    <img src="./images/avatar.png" alt="" id="login-form-logo">
                    <h3>REGISTER</h3>
                </div>

                <div class="my-3">
                    <label for="register-username" class="form-label">Felhasználónév</label>
                    <input type="text" class="form-control" id="register-username">
                    <div class="form-text"></div>
                </div>
                <div class="mb-3">
                    <label for="register-email" class="form-label">Emailcím</label>
                    <input type="email" class="form-control" id="register-email">
                </div>
                <div class="mb-3">
                    <label for="register-password" class="form-label">Jelszó</label>
                    <input type="password" name="password" class="form-control" id="register-password" autocomplete="on">
                </div>
                <div class="mb-3">
                    <label for="register-password-again" class="form-label">Jelszó megerősítése</label>
                    <input type="password" name="password" class="form-control" id="register-password-again" autocomplete="on">
                </div>

                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="remember-me-checker">
                    <label class="form-check-label" for="remember-me-checker">Elfogadom a felhasználási
                        feltételeket!</label>
                </div>

                <button type="button" class="btn btn-primary rounded-pill mb-3 w-100">Regisztráció</button>
                <button type="button" class="btn btn-light rounded-pill mb-3 w-100" id="back-to-login-button">Vissza</button>
            </form>

        </section>
    `

    document.getElementById("back-to-login-button").onclick = function () {
        console.log("render login....");
        renderLoginForm();
    }

    var LoginImage = document.getElementById('login-form-logo');

    if (LoginImage) {
        LoginImage.onclick = function () {
            renderApp();
        }
    }
}



function renderApp() {


    resetState();

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


/*  MAIN CONTENT */

//var mainContent = document.querySelector(".main-content");


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


/** LISTENING MODULE */
var listeningSelectLanguage
var listeningTextarea;
var listeningStartBtn;
var listeningClearBtn;


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

    var searchBar = renderSearchBar();
    //var paginationBlock = pagination();

    mainContent.innerHTML = `
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

            

            <!--<div class="search-bar d-block mb-2">
                <div class="line-1 d-flex">
                    <div class="search-input w-100">
                        <input type="search" class="form-control" id="dictionaries-search-input" placeholder="Keresés...">
                    </div>
                    <div class="search-buttons d-flex">
                        <button type="button" class="btn btn-secondary ms-1" id="search-dictionary-button"><i class="fas fa-search"></i></button>
                        <button type="button" class="btn btn-danger ms-1 d-none align-items-center mw-50" id="clear-dictionary-filter"><i class="fas fa-filter"></i></button>
                    </div>
                </div>
                <div class="form-text mb-2 d-none justify-content-start cursor-pointer text-danger" id="search-alert">
                    <div class="search-alert-close"><i class="far fa-window-close"></i></div>
                    <div class="search-alert-text ms-1">vvNincs találat!</div>
                </div>
            </div>-->

             ${searchBar}

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


    renderDictionaryList(state.dictionaries);


    createNewDictionaryButton = document.querySelector(".add-new-block");
    addNewBlock = document.querySelector(".add-new-block");
    createNewBlock = document.querySelector(".create-new-dictionary");
    createNewAcceptBtn = document.getElementById("create-new-accept");
    createNewClearBtn = document.getElementById("create-new-close");
    createNewTextInput = document.getElementById("create-new-text-input");


    /* Load Enabled Methods */
    createNewDictionary();
    backToNewDictionary();


    var searchDictionaryInput = document.getElementById("search-element-input");
    var searchDictionaryBtn = document.getElementById("search-element-button");
    var clearfilterBtn = document.getElementById("clear-dictionary-filter");
    var searchAlert = document.getElementById("search-alert");
    closeSearchAlert();



    searchDictionaryBtn.onclick = function () {

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
    }

    clearfilterBtn.onclick = function () {
        renderDictionaryList(state.dictionaries);
        clearfilterBtn.classList.add("d-none");
        searchDictionaryInput.value = "";
        resetPaginationState();
        resetFilteredState();
        sliceArray(state.dictionaries);
        renderPaginationFooter(state.dictionaries);
    }


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


}


function resetFilteredState() {
    state.filterArray = [];
    state.filtered = false;
    //state.pagination.visisibledPages = [0, 1, 2];

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
    // sliceArray(renderArray);

    if (state.filtered) {
        renderPaginationFooter(state.filterArray)
    }
    else {
        renderPaginationFooter(state.dictionaries)

    };
}


function filterBy(arr, filterBy, input) {

    state.filterArray = arr.filter(element => {
        return state.filterArray = element[filterBy].toLowerCase().includes(input.toLowerCase());
    });

    if (state.filterArray.length > 0) state.filtered = true;
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

    mainContent.innerHTML = `
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

    listeningSelectLanguage = document.querySelector("#listening-select-language");
    listeningTextarea = document.querySelector("#listening-textarea");
    listeningStartBtn = document.querySelector("#listening-start-button");
    listeningClearBtn = document.querySelector("#listening-clear-button");


    listeningSelectLanguage.innerHTML = '';
    var langCounter = 0;
    Object.values(languages).map(item => {
        listeningSelectLanguage.innerHTML += `<option value = "${langCounter}" data-languageid="${item.countryCode}"> ${item.countryName}</option>`;
        langCounter++;
    });


    listeningStartSpeech();
    listeningClearTextarea();


}


/** LISTENING MODUL FUNCTIONS */


function listeningStartSpeech() {

    listeningStartBtn.addEventListener("click", () => {

        var textContent = listeningTextarea;

        if (textContent.textLength != 0) {
            var language = listeningSelectLanguage[listeningSelectLanguage.value].dataset.languageid;
            console.log(language, textContent.value);
            startSpeech(language, textContent.value);
        }
    })

};


function listeningClearTextarea() {

    listeningClearBtn.addEventListener("click", () => {
        listeningTextarea.value = '';
    })

};


/** END OF REGIO */


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
    renderLoginForm();
}

function createNewDictionary() {
    if (createNewDictionaryButton) {
        createNewDictionaryButton.addEventListener('click', () => {
            console.log("Új szótár létrehozása")
            addNewBlock.classList.add('dislay-none');
            createNewBlock.classList.remove('dislay-none');
        })
    }
};

function backToNewDictionary() {
    if (createNewClearBtn) {
        createNewClearBtn.addEventListener('click', () => {
            console.log("Vissza")
            createNewTextInput.value = '';
            createNewBlock.classList.add('dislay-none');
            addNewBlock.classList.remove('dislay-none');
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

    for (let i = 0; i < state.dictionaries.length; i++) {

        if (state.dictionaries[i].autoID === state.selectedDictionary) {
            state.dictionaryID = i;
            state.dictionaryName = array_dictionaries[i].dictionaryName;
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


function renderDictionaryElements(renderArray) {

    state.pagination.location = 1;
    state.selectedDictionaryLength = getActualDictionaryLength();

    renderArray.sort(compareValues(state.columnID, state.sortBy));

    sliceArray(renderArray);
    renderArray = state.pagination.slicedArray;

    //resetListeningMode();
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

    //sliceArray(renderArray);
    //renderPaginationFooter(state.dictionaries[state.dictionaryID].lexicon); //ok


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



//var excerciseStartButton;

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

    state.pagination.selectedPageIndex = selectedPageIndex;
    const start = state.pagination.itemsPerPage * selectedPageIndex;
    const end = start + state.pagination.itemsPerPage;
    state.pagination.slicedArray = actualArray.slice(start, end);

    state.pagination.slicedArray = state.filtered ? state.filterArray.slice(start, end) : actualArray.slice(start, end);

    setPaginationMethod();

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