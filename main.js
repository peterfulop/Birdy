let myDictionaryElements = [];
const myDictionaries = [];

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



var oXHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
oXHR.onreadystatechange = reportStatus;
oXHR.open("GET", "./data/db_words.json", true);
oXHR.send();


function reportStatus() {

    if (oXHR.readyState == 4 && this.status == 200) {
        showTheList(this.responseText);
    }

}


var data = [];

function showTheList(json) {

    var puffer = JSON.parse(json);


    for (const item of puffer) {

        var component = new DictionaryElement(item.ID, item.DictionaryID, item.Article_1, item.Word_1, item.Plural_1, item.Article_2, item.Word_2, item.Plural_2, item.Lang_1, item.Lang_2, item.RelaseDate);

        myDictionaryElements.push(component);
    }

    data = groupByKey(myDictionaryElements, 'dictionaryName');

}


function countOfDictionaries() {
    var elements = [];
    for (let i = 0; i < myDictionaryElements.length; i++) {
        var e = myDictionaryElements[i].dictionaryName;
        // if (!elements.includes(e)) {
        //     elements.push(e);
        // };
        elements.push(e);

    }

    return elements;

}



function createDictionaryObject(sourceObj, targetObj) {
    for (const data of sourceObj) {
        // var element = {};
        var component = new Dictionaries(data.ID, data.Dictionary_Name, data.Lang_Prim, data.Lang_Sec, data.RelaseDate);
        //element[data.DictionaryID] = component;
        targetObj.push(component);
    }
};


var groupName = [];

function initalizeObjects() {


    reportStatus();

    readJson("./data/db_dictionaries.json", myDictionaries, createDictionaryObject);

    //countOfDictionaries();

}


initalizeObjects();

function groupByKey(array, key) {
    return array
        .reduce((hash, obj) => {
            if (obj[key] === undefined) return hash;
            return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) })
        }, {})
};

cars = [
    {
        "id": 1,
        "make": "Ford",
        "model": "Focus",
        "engine_power": "55",
        "cylinder_capacity": "1750",
        "production_year": "2006",
        "color": "gray",
    },
    {
        "id": 2,
        "make": "Ford",
        "model": "Fiesta",
        "engine_power": "80",
        "cylinder_capacity": "1880",
        "production_year": "2008",
        "color": "jellow"
    },
    {
        "id": 3,
        "make": "Opel",
        "model": "Astra",
        "engine_power": "75",
        "cylinder_capacity": "1550",
        "production_year": "2001",
        "color": "red"
    }
]

class Car {
    constructor(id, make, model, enginePower, cylinderCapacity, productionYear, color) {
        this.id = id;
        this.make = make;
        this.model = model;
        this.enginePower = enginePower;
        this.cylinderCapacity = cylinderCapacity;
        this.productionYear = productionYear;
        this.color = color;
    }
}

var myCars = [];

for (const item of cars) {

    var car = new Car(item.id, item.make, item.model, item.engine_power, item.cylinder_capacity, item.production_year, item.color);
    myCars.push(car);

}

