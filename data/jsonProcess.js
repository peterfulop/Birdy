
//var puffer = [];
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


function sendRequest(url, method, body, callback) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    }
    xhr.open(method, url);
    xhr.send(body);
}

// function jsonToArray(source, myMethod, array) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         stateChange(xhttp);
//         myMethod(array);
//     }
//     xhttp.open("GET", source, true);
//     xhttp.send();
// }

function jsonToArray(url, myMethod, array) {

    sendRequest(url, 'GET', null, function (responseText) {
        myMethod(array, responseText);
    })

}


// function stateChange(xhttp) {
//     if (xhttp.readyState == 4 && xhttp.status == 200) {
//         puffer = JSON.parse(xhttp.responseText);
//     }
// }

function createDictionaryElementObject(array, sourcePuffer) {

    for (const data of sourcePuffer) {
        var component = new DictionaryElement(data.ID, data.DictionaryID, data.Article_1, data.Word_1, data.Plural_1, data.Article_2, data.Word_2, data.Plural_2, data.Lang_1, data.Lang_2, data.RelaseDate);
        array.push(component);
    }
    //puffer = [];
};

function createDictionaryObject(array, sourcePuffer) {
    for (const data of sourcePuffer) {
        var component = new Dictionaries(data.ID, data.Dictionary_Name, data.Lang_Prim, data.Lang_Sec, data.RelaseDate);
        array.push(component);
    }
    //puffer = [];
};

function fillLexiconArrays() {
    for (const dictionary of array_dictionaries) {
        for (let i = 0; i < array_words.length; i++) {
            if (dictionary.id === array_words[i].dictionaryName) {
                dictionary.lexicon.push(array_words[i]);
            }
        }
    }
}

function groupByKey(array, key) {
    return array
        .reduce((hash, obj) => {
            if (obj[key] === undefined) return hash;
            return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
        }, {})
};

function runProcess() {

    jsonToArray("./data/db_words.json", createDictionaryElementObject, array_words);
    jsonToArray("./data/db_dictionaries.json", createDictionaryObject, array_dictionaries);

    setTimeout(fillLexiconArrays, 100);

}

runProcess();