import * as global from './global.js';
import * as home from './home.js';
import * as profile from './profile.js';
import * as brain from './brainteaser.js';
import * as add from './addwords.js';
import * as dictionary from './dictionaries.js';
import * as reader from './reader.js';
import * as login from './login.js';


export function AppVisualisationScope() {


    async function buildApplication() {
        await global.GlobalObjectScope().loadSpinner("main-app");
        await runHttpRequest();
        loadVisualisation();
    }


    function loadVisualisation() {

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

    function resetState() {

        state.selectedDictionary = "";
        state.dictionaryID = "";
        state.dictionaryName = "";
        state.dictionaries = array_dictionaries;
        state.words = array_words;
        state.editDictionaryMode = false;
        state.editDictionaryContent = false;
        state.listeningMode = false;
        state.filterArray = [];
        state.filtered = false;
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





    function renderAppHTML() {

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

    function mediaQuery() {

        //const mediaQueryDashboard = window.matchMedia('(max-width: 810px)');
        const mediaQuery = window.matchMedia('(max-width: 960px)');
        autoFullScreen(mediaQuery);
        mediaQuery.addListener(autoFullScreen);
    }

    function renderMainMenu() {

        const dashboardLinkContainer = document.querySelector(".links");
        dashboardLinkContainer.innerHTML = '';

        Object.values(generalSettings.dashboardMenuItems).map(item => {
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

        Object.values(generalSettings.dashboardMenuItems).map(item => {
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

        const actualPageContainer = document.getElementById("active-page-name");
        const actualPageIcon = document.getElementById("active-page-icon");
        const firstElement = document.querySelector(".links> div:nth-child(1) > div > i");

        firstElement.classList.add("active-page");
        actualPageContainer.innerHTML = generalSettings.dashboardMenuItems[0].text;
        actualPageIcon.className = generalSettings.dashboardMenuItems[0].icon;

        const Home = home.HomePageScope();
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
        const actualPageContainer = document.getElementById("active-page-name"); //
        const actualPageIcon = document.getElementById("active-page-icon"); //


        for (let i = 0; i < dashboardLinks.length; i++) {

            dashboardLinks[i].addEventListener('click', () => {
                state.activeMenu = dashboardLinks[i].dataset.buttonid;
                setActivePage(i);
                actualPageIcon.className = generalSettings.dashboardMenuItems[i].icon;
                actualPageContainer.innerHTML = generalSettings.dashboardMenuItems[i].text;
                loadMethods(generalSettings.dashboardMenuItems[i].method);
            })
        }
    }

    function setActivePage(index) {

        const dashboardLinks = document.querySelectorAll(".link");

        if (dashboardLinks.length > 0) {
            var activeIcon = dashboardLinks[index].querySelector("div > i");
            removeActivePageClass();
            activeIcon.classList.add("active-page");
        }
    }

    function displayMobileMenu() {

        const mobileMenuButton = document.getElementById("mobile-menu-button");

        mobileMenuButton.addEventListener("click", () => {
            mobileMenuShowHide();
        })
    }

    function mobileMenuShowHide() {

        const mobileMenuContainer = document.querySelector(".mobile-menu-container");

        if (mobileMenuContainer) {
            if (mobileMenuContainer.classList.contains("d-none")) {
                console.log('tartalmaz');
                mobileMenuContainer.classList.remove("d-none");
            }
            else {
                console.log('nem tartalmaz');
                mobileMenuContainer.classList.add("d-none");
            }
        }
    }


    function selectMobilePages() {

        const actualPageContainer = document.getElementById("active-page-name"); //
        const actualPageIcon = document.getElementById("active-page-icon"); //
        const dashboardLinks = document.querySelectorAll(".link");
        const mobileMenuElements = document.querySelectorAll(".mobile-menu-items");//


        for (let i = 0; i < mobileMenuElements.length; i++) {

            mobileMenuElements[i].addEventListener('click', () => {
                state.activeMenu = dashboardLinks[i].dataset.buttonid;
                actualPageIcon.className = generalSettings.dashboardMenuItems[i].icon;
                actualPageContainer.innerHTML = generalSettings.dashboardMenuItems[i].text;
                loadMethods(generalSettings.dashboardMenuItems[i].method);
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

        const showHideBtn = document.getElementById("show-hide-button");

        let show = true;

        showHideBtn.addEventListener('click', () => {

            var showIconClass = "fas fa-angle-double-right";
            var hideIconClass = "fas fa-angle-double-left";
            var showHideBtn = document.getElementById("show-hide-button");

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


    function loadMethods(methodName) {

        const mainMethods = menu_load_methods();
        var fn = mainMethods[methodName];
        if (typeof fn === "function") {
            fn();
        }
    }

    function menu_load_methods() {

        function Menu_Clear_MainContent() {

            const mainContent = document.querySelector(".main-content");
            mainContent.innerHTML = '';
        }

        function menu_load_home() {

            Menu_Clear_MainContent();

            // const Home = HomePageScope();
            // Home.renderHomePage();

            const Home = home.HomePageScope();
            Home.renderHomePage();

        }

        function menu_load_profile() {

            Menu_Clear_MainContent();

            const Profile = profile.ProfilePageScope();
            Profile.renderProfilePage();

        }

        function menu_load_dictionaries() {

            Menu_Clear_MainContent();

            const Dictionary = dictionary.DictionaryPageScope();
            Dictionary.buildDictionariesPage();

        }

        function menu_load_addwords() {

            Menu_Clear_MainContent();
            const AddWords = add.AddWordsScope();
            AddWords.renderAddWordsContent();
            // const AddWords = AddWordsScope();
            // AddWords.renderAddWordsContent();

        }

        function menu_load_brainteaser() {

            Menu_Clear_MainContent();

            // const Brain = brainTeaserScope();
            // Brain.buildBrainTeaserPage();
            const Brain = brain.brainTeaserScope();
            Brain.buildBrainTeaserPage();


        }

        function menu_load_listening() {
            Menu_Clear_MainContent();

            const Reader = reader.ReaderPageScope()
            Reader.renderReaderPageContent();

        }

        function menu_load_search() {
            Menu_Clear_MainContent();

        }

        function menu_load_settings() {
            Menu_Clear_MainContent();

        }

        function menu_load_signout() {

            const Login = login.LoginPageScope();

            Menu_Clear_MainContent();
            Login.renderLoginPage();

        }

        return {
            'Menu_Clear_MainContent': Menu_Clear_MainContent,
            'menu_load_home': menu_load_home,
            'menu_load_profile': menu_load_profile,
            'menu_load_dictionaries': menu_load_dictionaries,
            'menu_load_addwords': menu_load_addwords,
            'menu_load_brainteaser': menu_load_brainteaser,
            'menu_load_listening': menu_load_listening,
            'menu_load_search': menu_load_search,
            'menu_load_settings': menu_load_settings,
            'menu_load_signout': menu_load_signout
        }

    }


    return {
        'menu_load_methods': menu_load_methods,
        'buildApplication': buildApplication,
        'loadVisualisation': loadVisualisation,
        'resetState': resetState
    }

}

