const myDictionaryElements = [];
const myDictionaries = [];
const puffer = [];

class Dictionaries {

    constructor(id, dictionaryName, langPrim, langSec, relaseDate) {
        this.id = id;
        this.dictionaryName = dictionaryName;
        this.langPrim = langPrim;
        this.langSec = langSec;
        this.relaseDate = relaseDate;
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


function readJson(source, myObject, myMethod) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myMethod(JSON.parse(this.responseText), myObject);
        }
    };
    xmlhttp.open("GET", source, true);
    xmlhttp.send();
};

function readJson_V2(source, myObject) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myObject.push(JSON.parse(this.responseText));
        }
    };
    xmlhttp.open("GET", source, true);
    xmlhttp.send();
};


function createDictionaryObject(sourceObj, targetObj) {
    for (const data of sourceObj) {
        var element = {};
        var component = new Dictionaries(data.ID, data.Dictionary_Name, data.Lang_Prim, data.Lang_Sec, data.RelaseDate);
        element[data.DictionaryID] = component;
        targetObj.push(element);
    }
};


function createDictionaryElementObject(sourceObj, targetObj) {
    for (const data of sourceObj) {
        var element = {};
        var component = new DictionaryElement(data.ID, data.DictionaryID, data.Article_1, data.Word_1, data.Plural_1, data.Article_2, data.Word_2, data.Plural_2, data.Lang_1, data.Lang_2, data.RelaseDate);
        element[data.ID - 1] = component;
        targetObj.push(element);
    }
};


function initalizeObjects() {
    readJson("./data/db_dictionaries.json", myDictionaries, createDictionaryObject);
    readJson("./data/db_words.json", myDictionaryElements, createDictionaryElementObject);
}

initalizeObjects();



var test = [
    {
        "ID": 1,
        "DictionaryID": "Angol-Magyar",
        "Article_1": "",
        "Word_1": "apple",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "alma",
        "Plural_2": "",
        "Lang_1": "en-GB",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.04 12:10"
    },
    {
        "ID": 2,
        "DictionaryID": "Angol-Magyar",
        "Article_1": "",
        "Word_1": "book",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "könny",
        "Plural_2": "",
        "Lang_1": "en-GB",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.05 12:10"
    },
    {
        "ID": 3,
        "DictionaryID": "Angol-Magyar",
        "Article_1": "",
        "Word_1": "car",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "autó",
        "Plural_2": "",
        "Lang_1": "en-GB",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.06 12:10"
    },
    {
        "ID": 4,
        "DictionaryID": "Angol-Magyar",
        "Article_1": "",
        "Word_1": "dictionary",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "szótár",
        "Plural_2": "",
        "Lang_1": "en-GB",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.07 12:10"
    },
    {
        "ID": 5,
        "DictionaryID": "Francia-Magyar",
        "Article_1": "",
        "Word_1": "pome",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "alma",
        "Plural_2": "",
        "Lang_1": "fr-FR",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.08 12:10"
    },
    {
        "ID": 6,
        "DictionaryID": "Francia-Magyar",
        "Article_1": "",
        "Word_1": "amour",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "szerelem",
        "Plural_2": "",
        "Lang_1": "fr-FR",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.09 12:10"
    },
    {
        "ID": 7,
        "DictionaryID": "Francia-Magyar",
        "Article_1": "",
        "Word_1": "livre",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "könyv",
        "Plural_2": "",
        "Lang_1": "fr-FR",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.10 12:10"
    },
    {
        "ID": 8,
        "DictionaryID": "Francia-Magyar",
        "Article_1": "",
        "Word_1": "automobile",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "autó",
        "Plural_2": "",
        "Lang_1": "fr-FR",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.11 12:10"
    },
    {
        "ID": 9,
        "DictionaryID": "Francia-Magyar",
        "Article_1": "",
        "Word_1": "arbre",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "fa",
        "Plural_2": "",
        "Lang_1": "fr-FR",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.12 12:10"
    },
    {
        "ID": 10,
        "DictionaryID": "Francia-Magyar",
        "Article_1": "",
        "Word_1": "orange",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "narancs",
        "Plural_2": "",
        "Lang_1": "fr-FR",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.13 12:10"
    },
    {
        "ID": 11,
        "DictionaryID": "Német-Magyar",
        "Article_1": "das",
        "Word_1": "Auto",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "autó",
        "Plural_2": "",
        "Lang_1": "de-DE",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.14 12:10"
    },
    {
        "ID": 12,
        "DictionaryID": "Német-Magyar",
        "Article_1": "das",
        "Word_1": "Buch",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "könyv",
        "Plural_2": "",
        "Lang_1": "de-DE",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.15 12:10"
    },
    {
        "ID": 13,
        "DictionaryID": "Német-Magyar",
        "Article_1": "die",
        "Word_1": "Autobahn",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "autópálya",
        "Plural_2": "",
        "Lang_1": "de-DE",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.16 12:10"
    },
    {
        "ID": 14,
        "DictionaryID": "Német-Magyar",
        "Article_1": "der",
        "Word_1": "Highway",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "autópálya",
        "Plural_2": "",
        "Lang_1": "de-DE",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.17 12:10"
    },
    {
        "ID": 15,
        "DictionaryID": "Német-Magyar",
        "Article_1": "die",
        "Word_1": "Schnellstraße",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "autópálya",
        "Plural_2": "",
        "Lang_1": "de-DE",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.18 12:10"
    },
    {
        "ID": 16,
        "DictionaryID": "Német-Magyar",
        "Article_1": "die",
        "Word_1": "Freiheit",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "szabadság",
        "Plural_2": "",
        "Lang_1": "de-DE",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.19 12:10"
    },
    {
        "ID": 17,
        "DictionaryID": "Német-Magyar",
        "Article_1": "die",
        "Word_1": "Birne",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "körte",
        "Plural_2": "",
        "Lang_1": "de-DE",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.20 12:10"
    },
    {
        "ID": 18,
        "DictionaryID": "Német-Magyar",
        "Article_1": "der",
        "Word_1": "Wald",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "erdő",
        "Plural_2": "",
        "Lang_1": "de-DE",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.21 12:10"
    },
    {
        "ID": 19,
        "DictionaryID": "Angol-Magyar",
        "Article_1": "",
        "Word_1": "face",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "arc",
        "Plural_2": "",
        "Lang_1": "en-GB",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.22 12:10"
    },
    {
        "ID": 20,
        "DictionaryID": "Angol-Magyar",
        "Article_1": "",
        "Word_1": "wrist",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "csukló",
        "Plural_2": "",
        "Lang_1": "en-GB",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.23 12:10"
    },
    {
        "ID": 21,
        "DictionaryID": "Angol-Magyar",
        "Article_1": "",
        "Word_1": "head",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "fej",
        "Plural_2": "",
        "Lang_1": "en-GB",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.24 12:10"
    },
    {
        "ID": 22,
        "DictionaryID": "Angol-Magyar",
        "Article_1": "",
        "Word_1": "shoulder",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "váll",
        "Plural_2": "",
        "Lang_1": "en-GB",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.25 12:10"
    },
    {
        "ID": 23,
        "DictionaryID": "Olasz-Magyar",
        "Article_1": "",
        "Word_1": "pomo",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "alma",
        "Plural_2": "",
        "Lang_1": "it-IT",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.26 12:10"
    },
    {
        "ID": 24,
        "DictionaryID": "Olasz-Magyar",
        "Article_1": "",
        "Word_1": "auto",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "autó",
        "Plural_2": "",
        "Lang_1": "it-IT",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.27 12:10"
    },
    {
        "ID": 25,
        "DictionaryID": "Olasz-Magyar",
        "Article_1": "",
        "Word_1": "pane",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "kenyér",
        "Plural_2": "",
        "Lang_1": "it-IT",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.02.28 12:10"
    },
    {
        "ID": 26,
        "DictionaryID": "Olasz-Magyar",
        "Article_1": "",
        "Word_1": "vigneto",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "szőlő",
        "Plural_2": "",
        "Lang_1": "it-IT",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.03.01 12:10"
    },
    {
        "ID": 27,
        "DictionaryID": "Olasz-Magyar",
        "Article_1": "",
        "Word_1": "formaggio",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "sajt",
        "Plural_2": "",
        "Lang_1": "it-IT",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.03.02 12:10"
    },
    {
        "ID": 28,
        "DictionaryID": "Olasz-Magyar",
        "Article_1": "",
        "Word_1": "cacio",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "sajt",
        "Plural_2": "",
        "Lang_1": "it-IT",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.03.03 12:10"
    },
    {
        "ID": 29,
        "DictionaryID": "Olasz-Magyar",
        "Article_1": "",
        "Word_1": "mare",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "tenger",
        "Plural_2": "",
        "Lang_1": "it-IT",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.03.04 12:10"
    },
    {
        "ID": 30,
        "DictionaryID": "Olasz-Magyar",
        "Article_1": "",
        "Word_1": "maggiore",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "nagyobb",
        "Plural_2": "",
        "Lang_1": "it-IT",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.03.05 12:10"
    },
    {
        "ID": 31,
        "DictionaryID": "Olasz-Magyar",
        "Article_1": "",
        "Word_1": "maggiore",
        "Plural_1": "",
        "Article_2": "",
        "Word_2": "idősebb",
        "Plural_2": "",
        "Lang_1": "it-IT",
        "Lang_2": "hu-HU",
        "RelaseDate": "2021.03.06 12:10"
    }

]



var cars = [
    {
        'make': 'audi',
        'model': 'r8',
        'year': '2012'
    }, {
        'make': 'audi',
        'model': 'rs5',
        'year': '2013'
    }, {
        'make': 'ford',
        'model': 'mustang',
        'year': '2012'
    }, {
        'make': 'ford',
        'model': 'fusion',
        'year': '2015'
    }, {
        'make': 'kia',
        'model': 'optima',
        'year': '2012'
    },
];


console.log(groupByKey(cars, 'make'));
console.log(groupByKey(myDictionaryElements, 'DictionaryID'));


function groupByKey(array, key) {
    return array
        .reduce((hash, obj) => {
            if (obj[key] === undefined) return hash;
            return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
        }, {})
};


//console.log(groupByKey(myDictionaryElements, 'DictionaryID'))
