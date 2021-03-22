export default class State {

    constructor(screenMode, activeMenu, selectedDictionary, selectedDictionaryLength, dictionaryID, dictionaryName, dictionaries, editDictionaryMode, editDictionaryContent, listeningMode, filterArray, filtered, sortBy, columnID, pagination) {

        this.screenMode = screenMode = 0;
        this.activeMenu = activeMenu = '';
        this.selectedDictionary = selectedDictionary = '';
        this.selectedDictionaryLength = selectedDictionaryLength = '';
        this.dictionaryID = dictionaryID = '';
        this.dictionaryName = dictionaryName = '';
        this.dictionaries = dictionaries = [];
        this.editDictionaryMode = editDictionaryMode = false;
        this.editDictionaryContent = editDictionaryContent = false;
        this.listeningMode = listeningMode = false;
        this.filterArray = filterArray = [];
        this.filtered = filtered = false;
        this.sortBy = sortBy = 'asc';
        this.columnID = columnID = 'word_1';
        this.pagination = pagination = {
            pages: 0,
            selectedPageIndex: 0,
            visisibledPages: [0, 1, 2],
            slicedArray: [],
            itemsPerPage: 6,
            itemNumber: 0,
            location: 0,
        };

    }
}

