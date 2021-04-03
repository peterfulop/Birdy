const state = {
    screenMode: 0,
    activeMenu: "",
    selectedDictionary: "",
    selectedDictionaryLength: 0,
    dictionaryID: "",
    dictionaryName: "",
    dictionaries: [],
    words: [],
    languages: [],
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
    notes: [],
    generalSettings: {
        dashboardMenuItems: [],
        excerciseTypes: [],
        excerciseRunTime: [],
        dialogObjects: []
    },
    excerciseHistory: []
};


const resetState = function (state) {

    state.selectedDictionary = "";
    state.dictionaryID = "";
    state.dictionaryName = "";
    state.dictionaries = [];
    state.words = [];
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
    state.notes = [];
    state.generalSettings = {
        dashboardMenuItems: [],
        excerciseTypes: [],
        excerciseRunTime: [],
        dialogObjects: []
    };
    state.excerciseHistory = [];
}

export { state, resetState };