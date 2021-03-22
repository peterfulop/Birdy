
var array_words = [];
var array_dictionaries = [];

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

/*
async function fetchProcess(url, createObjectsMethod, arrayTo, finishLexiconMethod) {

    var response = await fetch(url);

    if (!response.ok) {
        alert('Keresés sikertelen!');
        return;
    }
    var response = await response.json();
    createObjectsMethod(arrayTo, response);

    if (finishLexiconMethod) finishLexiconMethod();
};
*/

async function fetchProcess() {

    // First fetch
    var response = await fetch('./data/db_dictionaries.json');
    if (!response.ok) {
        alert('Keresés sikertelen!');
        return;
    }

    var response = await response.json();
    createDictionaryObject(response, array_dictionaries);

    // Second fetch
    var response = await fetch('./data/db_words.json');
    if (!response.ok) {
        alert('Keresés sikertelen!');
        return;
    }

    var response = await response.json();
    createDictionaryElementObject(response, array_words);

    // Third method
    fillLexiconArrays();

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



async function runHttpRequest() {

    //fetchProcess('./data/db_dictionaries.json', createDictionaryObject, array_dictionaries);
    //fetchProcess('./data/db_words.json', createDictionaryElementObject, array_words, fillLexiconArrays);

    fetchProcess();

};

//export { array_dictionaries, runHttpRequest };