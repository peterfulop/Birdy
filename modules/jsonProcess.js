import * as st from './state.js';


export function jsonProcessScope() {

    const array_words = [];
    const array_dictionaries = [];
    const array_notes = [];
    const array_excercise = [];
    const array_languages = [];
    const dashboardMenuItems = [];
    const state = st.state;

    async function singleFetchProcess(url, createObjectsMethod, arrayTo) {

        try {
            const response = await fetch(url);
            const data = await response.json();
            createObjectsMethod(data, arrayTo);

        } catch (err) {
            console.error(err);
            alert('singleFetchProcess sikertelen!');
            return;
        };
    };

    function createDictionaryObject(sourcePuffer, array) {
        for (const data of sourcePuffer) {
            let component = new Dictionaries(data.ID, data.Dictionary_Name, data.Lang_Prim, data.Lang_Sec, data.RelaseDate);
            array.push(component);
        };
        console.log('3. createDictionaryObject is ready...');
    };

    function createDictionaryElementObject(sourcePuffer, array) {
        for (const data of sourcePuffer) {
            let component = new DictionaryElement(data.id, data.DictionaryID, data.Word_1, data.Word_2, data.Lang_1, data.Lang_2, data.RelaseDate);
            array.push(component);
        };
        console.log('4. createDictionaryElementObject2 is ready...');
    };

    function fillLexiconArrays() {
        for (const dictionary of array_dictionaries) {
            for (let i = 0; i < array_words.length; i++) {
                if (dictionary.id == array_words[i].dictionaryName) {
                    dictionary.lexicon.push(array_words[i]);
                }
            }
        }
        console.log('6. fillLexiconArrays is ready...');
    };

    function createNotelistObject(sourcePuffer, array) {
        for (const data of sourcePuffer) {
            let component = new Notes(data.id, data.text, data.dateTime);
            array.push(component);
        }
        console.log('1. createNotelistObject is ready...');
    };

    function createExcerciselistObject(sourcePuffer, array) {
        for (const data of sourcePuffer) {
            let component = new Excercise(data.id, data.dictionary_name, data.excercise_type, data.start_time, data.end_time, data.duration);
            array.push(component);
        }
        console.log('2. createExcerciselistObject is ready...');
    };

    function createLanguageListObject(sourcePuffer, array) {
        for (const data of sourcePuffer) {
            let component = new Language(data.countryCode, data.countryName);
            array.push(component);
        }
        console.log('5. createLanguageListObject is ready...');
    };

    function createDashboardMenuItemsObject(sourcePuffer, array) {
        for (const data of sourcePuffer) {
            let component = new MenuItems(data.icon, data.text, data.link, data.method);
            array.push(component);
        }
        console.log('0. createDashboardMenuItemsObject is ready...');
    };

    async function setState() {
        state.activeMenu = dashboardMenuItems[0].buttonID;
        state.generalSettings.dashboardMenuItems = dashboardMenuItems;
        state.dictionaries = array_dictionaries;
        state.words = array_words;
        state.notes = array_notes;
        state.excerciseHistory = array_excercise;
        state.languages = array_languages;
    };

    async function runHttpRequest() {

        Promise.allSettled([
            await singleFetchProcess('./data/db_menu_HU.json', createDashboardMenuItemsObject, dashboardMenuItems),
            await singleFetchProcess('./data/db_noteList.json', createNotelistObject, array_notes),
            await singleFetchProcess('./data/db_excercise_history.json', createExcerciselistObject, array_excercise),
            await singleFetchProcess('./data/db_dictionaries.json', createDictionaryObject, array_dictionaries),
            await singleFetchProcess('./data/db_words.json', createDictionaryElementObject, array_words),
            await singleFetchProcess('./data/db_languages.json', createLanguageListObject, array_languages),
        ]);

        await setState();
        fillLexiconArrays();
    };

    return {
        runHttpRequest
    };
};


class AutoID {
    generateID() {
        return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
};

class Dictionaries {
    constructor(id, dictionaryName, langPrim, langSec, relaseDate) {
        this.id = id;
        this.autoID = new AutoID().generateID();
        this.dictionaryName = dictionaryName;
        this.langPrim = langPrim;
        this.langSec = langSec;
        this.relaseDate = relaseDate;
        this.lexicon = [];
    };
};

class DictionaryElement {
    constructor(id, dictionaryName, word_1, word_2, lang_1, lang_2, relaseDate) {
        this.id = id;
        this.dictionaryName = dictionaryName;
        this.word_1 = word_1;
        this.word_2 = word_2;
        this.lang_1 = lang_1;
        this.lang_2 = lang_2;
        this.relaseDate = relaseDate;
    };
};

class Notes {
    constructor(id, text, dateTime) {
        this.autoID = new AutoID().generateID();
        this.id = id;
        this.text = text;
        this.dateTime = new Date(dateTime);
    };
};

class Excercise {
    constructor(id, dictionaryName, excerciseType, startTime, endTime, duration) {
        this.autoID = new AutoID().generateID();
        this.id = id;
        this.dictionaryName = dictionaryName;
        this.excerciseType = excerciseType;
        this.startTime = new Date(startTime);
        this.endTime = new Date(endTime);
        this.duration = duration;
    };
};

class Language {
    constructor(countryCode, countryName) {
        this.autoID = new AutoID().generateID();
        this.countryCode = countryCode;
        this.countryName = countryName;
    };
};

class MenuItems {
    constructor(icon, text, link, method) {
        this.buttonID = new AutoID().generateID();
        this.icon = icon;
        this.text = text;
        this.link = link;
        this.method = method;
    };
};

