var array_words = [];
var array_dictionaries = [];
var array_notes = [];

class Dictionaries {

    constructor(id, dictionaryName, langPrim, langSec, relaseDate) {
        this.id = id;
        this.autoID = this.generateID();
        this.dictionaryName = dictionaryName;
        this.langPrim = langPrim;
        this.langSec = langSec;
        this.relaseDate = relaseDate;
        this.lexicon = [];
    }

    generateID() {
        return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
};

class DictionaryElement {

    constructor(id, dictionaryName, article_1, word_1, plural_1, article_2, word_2, plural_2, lang_1, lang_2, relaseDate) {
        this.id = id;
        this.dictionaryName = dictionaryName;
        this.article_1 = article_1;
        this.word_1 = word_1;
        this.plural_1 = plural_1;
        this.article_2 = article_2;
        this.word_2 = word_2;
        this.plural_2 = plural_2;
        this.lang_1 = lang_1;
        this.lang_2 = lang_2;
        this.relaseDate = relaseDate;
    }
};

class Notes {
    constructor(id, text, dateTime) {
        this.autoID = this.generateID();
        this.id = id;
        this.text = text;
        this.dateTime = new Date(dateTime);
    }

    generateID() {
        return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}


async function singleFetchProcess(url, createObjectsMethod, arrayTo) {

    var response = await fetch(url);

    if (!response.ok) {
        alert('Kérés sikertelen!');
        return;
    }

    var response = await response.json();
    createObjectsMethod(response, arrayTo);

};

function createDictionaryObject(sourcePuffer, array) {
    for (const data of sourcePuffer) {
        var component = new Dictionaries(data.ID, data.Dictionary_Name, data.Lang_Prim, data.Lang_Sec, data.RelaseDate);
        array.push(component);
    }
    console.log('1. createDictionaryObject is ready...');

};

function createDictionaryElementObject(sourcePuffer, array) {

    for (const data of sourcePuffer) {
        var component = new DictionaryElement(data.ID, data.DictionaryID, data.Article_1, data.Word_1, data.Plural_1, data.Article_2, data.Word_2, data.Plural_2, data.Lang_1, data.Lang_2, data.RelaseDate);
        array.push(component);
    }
    console.log('2. createDictionaryElementObject is ready...');

};


function fillLexiconArrays() {
    for (const dictionary of array_dictionaries) {
        for (let i = 0; i < array_words.length; i++) {
            if (dictionary.id === array_words[i].dictionaryName) {
                dictionary.lexicon.push(array_words[i]);
            }
        }
    }
    console.log('3. fillLexiconArrays is ready...');
};


function createNotelistObject(sourcePuffer, array) {
    for (const data of sourcePuffer) {
        var component = new Notes(data.id, data.text, data.dateTime);
        array.push(component);
    }
    console.log('0. createNotelistObject is ready...');

};

async function runHttpRequest() {

    await singleFetchProcess('./data/db_noteList.json', createNotelistObject, array_notes);

    await singleFetchProcess('./data/db_dictionaries.json', createDictionaryObject, array_dictionaries);

    await singleFetchProcess('./data/db_words.json', createDictionaryElementObject, array_words)

    fillLexiconArrays();


};

