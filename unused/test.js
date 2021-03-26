
function ParentScope() {

    const child_1 = ChildScope_1();
    const child_2 = ChildScope_2();

    let myChildren = {
        child_1: child_1,
        child_2: child_2
    }

    function getChildren() {
        return { ...myChildren };
    }


    function modifyChildren(key, value) {

        if (myChildren[key] !== undefined) {
            myChildren[key] = value;
        }
        else {
            console.log('A kulcs még nem létezik! A létrehozáshoz  használd a setChildren() metódust!');
        }
    }

    function setChildren(key, value) {

        if (myChildren[key] == undefined) {
            myChildren[key] = value;
        }
        else {
            console.log('A kulcs már létezik! Módosításhoz használd a modifyChildren() metódust!');
        }
    }

    return {
        getChildren: getChildren,
        setChildren: setChildren,
        modifyChildren: modifyChildren
    }

}


function adminScope() {

    let parent = ParentScope();

    return {
        parent: parent,
    }

}


function ChildScope_1() {

    let child = 100;

    function child_1() {
        return child_1_test_1(child_1_test_2());
    }

    function child_1_test_1() {
        return child += 1;
    }

    function child_1_test_2() {
        return child += 2;
    }

    return child_1();


}


function ChildScope_2() {


    let child = 200;

    function child_2() {
        return child_2_test_1(child_2_test_2());
    }

    function child_2_test_1() {
        return child += 1;
    }

    function child_2_test_2() {
        return child += 2;
    }

    return child_2();

}



function MainScope_1() {

    let admin =

        function setDefaultPerentValues() {


        }


    function runAlert() {


    }



    return {
        runAlert: runAlert
    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var evek = [1954, 1990, 1963, 2000, 2010];

function tombMuvelet(tomb, fv) {

    var eredmeny = [];

    for (let i = 0; i < tomb.length; i++) {
        eredmeny.push(fv(tomb[i]));
    }

    return eredmeny;

}

function korSzamitas(elem) {
    let aktualisEv = new Date;
    aktualisEv = aktualisEv.getFullYear();
    return aktualisEv - elem;
}

function felnott(korhatar, elem) {
    return elem >= korhatar;
}

let korok = tombMuvelet(evek, korSzamitas);
console.log(korok);

let felnottek = tombMuvelet(korok, felnott.bind(this, 32));
console.log(felnottek);




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




var odon = {
    nev: 'Ödön',
    szuletesiEv: 1978,
    foglalkozas: 'grafikus'
};


var Szemely = function (nev, szuletesiEv, foglalkozas) {
    this.nev = nev;
    this.szuletesiEv = szuletesiEv;
    this.foglalkozas = foglalkozas;

    // Konstructor függvény, öröklődik minden példányosításnál.
    this.korSzamitas = function () {
        let aktualisEv = new Date;
        aktualisEv = aktualisEv.getFullYear();
        return aktualisEv - this.szuletesiEv;
    }
}



// Csak az ősosztály tartalamzza a metódust, de minden elemre ugyan úgy emghívható!
Szemely.prototype.adult = function () {
    return this.korSzamitas() >= 18;
}

var pista = new Szemely('Pista', 1995, 'asztalos');
console.log('pista: ', pista);
console.log('pista kora: ', pista.korSzamitas());


var erzsi = new Szemely('Erzsi', 1955, 'nyugdíjas');
console.log('erzsi: ', erzsi);
console.log('erzsi kora: ', erzsi.korSzamitas());



// Közvetlen öröklés, Object.create metódus esetén

var SzemelyProto = {
    korSzamitas: function () {
        console.log(2022 - this.szuletesiEv);
    }
};

var Jozsi = Object.create(SzemelyProto);
Jozsi.nev = 'Józsi';
Jozsi.szuletesiEv = 1985;
Jozsi.foglalkozas = 'pék';

var Kati = Object.create(SzemelyProto, {
    nev: { value: 'Kati' },
    szuletesiEv: { value: 1991 },
    foglalkozas: { value: 'kozmetikus' }
});




// Egyszerű típusok és objektumok

var a = {
    name: 'Peti',
    age: 28
}
var b = a;
var c = { ...a };

console.log(a);
console.log(b);
console.log(c);

b.name = 'Kati';
c.name = 'Sanyi';

console.log(a);
console.log(b);
console.log(c);


// Visszaadott függvények


function returnFunction(foglalkozas) {

    if (foglalkozas === 'tanár') {
        return function (name) {
            console.log(name, foglalkozas);
        }
    }
    else if (foglalkozas === 'programozó') {
        return function (name) {
            console.log(name, foglalkozas);
        }
    }
    else {
        return function (name) {
            console.log(name);
        }
    }
}

var test = returnFunction('programozó')('Péter');


// IIFE (Immediately Invoked Function Expressions) Azonnal meghívódó függvények 


(function jatek(teszt) {

    var pont = Math.floor(Math.random() * 10);
    console.log(teszt, pont >= 5, pont);
})('hello');



// Closure

// Egy belső függvény mindig képes hozzáférni az őt tartalmazó külső függvény paramétereihez és változóihoz
// még azután is, hogy a külső függévny befejezte a futást. 



var year = (new Date).getFullYear();

function nyugdij(ev) {

    var text = 'A nyugdíjazásig hátralévő évek száma: ';

    return function (szuletesiEv) {
        var kor = year - szuletesiEv;
        console.log(text, ev - kor);
    }
}

var nyugdijazasUSA = nyugdij(66);
nyugdijazasUSA(1978);

nyugdij(66)(1978);



// How to Create Singleton Classes in JavaScript - Design Patterns Tutorial
// https://www.youtube.com/watch?v=C2NxMWQn85c&ab_channel=dcode

class Settings {

    constructor() {

        if (Settings.instance instanceof Settings) {
            return Settings.instance;
        }

        this.settingsObject = {
            'background': '#ff0000',
            'version': Math.floor(Math.random() * 4000)
        }

        //Object.freeze(this.settingsObject);
        //Object.freeze(this);
        Settings.instance = this;
    }

    get(key) {
        return this.settingsObject[key];
    }

}


const s = new Settings();
console.log(s.settingsObject);

const ss = new Settings();
console.log(ss.settingsObject);
































//////////////////////////////////////////////////////////////////////////////////////////////

class State {
    constructor() {
        this.screenMode = 0;
        this.activeMenu = '';
        this.selectedDictionary = '';
        this.selectedDictionaryLength = '';
        this.dictionaryID = '';
        this.dictionaryName = '';
        this.dictionaries = [];
        this.editDictionaryMode = false;
        this.editDictionaryContent = false;
        this.listeningMode = false;
        this.filterArray = [];
        this.filtered = false;
        this.sortBy = 'asc';
        this.columnID = 'word_1';
        this.pagination = {
            pages: 0,
            selectedPageIndex: 0,
            visisibledPages: [0, 1, 2],
            slicedArray: [],
            itemsPerPage: 6,
            itemNumber: 0,
            location: 0,
        };
    };
};




function asd() {

    var state = createState();

    console.log('lefutok egyáltalán?');
    console.log(state);


    function getState() {
        return { ...state };
    }

    function startApp() {
        method_1();
        method_2();
        method_3();
        method_4();
    }

    function method_1() {
        state.selectedPageIndex = 1;
    }

    function method_2() {
        for (let i = 0; i < 10; i++) {
            state.filterArray.push(i);
        }
        state.filtered = true;
    }

    function method_3() {
        state.listeningMode = true;
    }

    function method_4() {
        state.pagination.selectedPageIndex = 10;
    }

    // return {
    //     getState: getState,
    //     startApp: startApp
    //}

};

//const start = App();

// https://scotch.io/tutorials/understanding-scope-in-javascript





var Module = (function () {

    function privateMethod() {
        console.log('This is a private method');

    }


    var state = new State();
    Object.seal(state);
    Object.freeze(state);


    function getState() {
        return { ...state };
    }



    return {
        state: state,
        getState: getState,
    }

})();


function modifyState() {

    Module.state.screenMode = 10;
    console.log(Module.state.screenMode);

}




///  apply, bind, call   ///////////////////////////////////////////////////////////////////////////////////////////



var peti = {
    nev: 'Peti',
    kor: 45,
    foglalkozas: 'csillagász',

    udvozles: function (stilus, napszak) {

        if (stilus === 'hivatalos') {
            console.log(`Üdvözlöm, jó ${napszak} kívánok! ${this.nev} vagyok!`);
        }
        else if (stilus === 'baráti') {
            console.log(`Szia, jó ${napszak}!`);
        }
    }
}

peti.udvozles('hivatalos', 'napot');
peti.udvozles('baráti', 'reggelt');


var bela = {
    nev: 'Béla',
    kor: 62,
    foglalkozas: 'portás',
};

// call method
peti.udvozles.call(bela, 'hivatalos', 'estét');


// apply
peti.udvozles.apply(bela, ['hivatalos', 'hajnalt']);


// bind
let bleaUdv = peti.udvozles.bind(bela, 'hivatalos')('szelet');

//bleaUdv('reggelt');