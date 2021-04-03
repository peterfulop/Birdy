import * as dictionary from './dictionaries.js';
import * as st from './state.js';
const state = st.state;

export function paginationFunctionScope() {

    function renderPaginationFooter(array) {

        var counterBlock = document.getElementById('counter-block');
        var paginationBlock = document.getElementById('pagination-block');

        state.pagination.pages = Math.ceil(array.length / state.pagination.itemsPerPage);

        var countOf = state.filtered ? state.filterArray.length : state.pagination.itemNumber;
        if (state.pagination.pages === 0) countOf = 0;

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

    function setPaginationMethod() {

        const Dictionary = dictionary.DictionaryPageScope();

        switch (state.pagination.location) {
            case 0:
                Dictionary.renderDictionaryList(state.pagination.slicedArray);
                break;
            case 1:
                Dictionary.buildDictionaryElementsPage(state.pagination.slicedArray);
                break;
            default:
                break;
        }
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

    function navigatePagination(selectedPageIndex, actualArray) {


        state.pagination.selectedPageIndex = selectedPageIndex;
        const start = state.pagination.itemsPerPage * selectedPageIndex;
        const end = start + state.pagination.itemsPerPage;
        state.pagination.slicedArray = actualArray.slice(start, end);

        state.pagination.slicedArray = state.filtered ? state.filterArray.slice(start, end) : actualArray.slice(start, end);

        setPaginationMethod();

    }

    function resetPaginationState() {
        state.pagination.selectedPageIndex = 0;
        state.pagination.visisibledPages = [0, 1, 2];
    }


    return {
        'renderPaginationFooter': renderPaginationFooter,
        'resetPaginationState': resetPaginationState,
    }
}
