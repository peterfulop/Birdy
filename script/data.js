var dashboardMenuItems = [
    {
        icon: "fas fa-home",
        text: "Kezdőoldal",
        link: "0",
        method: "menu_load_home",
        buttonID: generateID()
    },
    {
        icon: "fas fa-user-circle",
        text: "Profil",
        link: "1",
        method: "menu_load_profile",
        buttonID: generateID()
    },
    {
        icon: "fas fa-search",
        text: "Keresés",
        link: "6",
        method: "menu_load_records",
        buttonID: generateID()
    },
    {
        icon: "fas fa-book",
        text: "Szótáraim",
        link: "2",
        method: "menu_load_dictionaries",
        buttonID: generateID()
    },
    {
        icon: "fas fa-plus-circle",
        text: "Új szavak",
        link: "3",
        method: "menu_load_addwords",
        buttonID: generateID()
    },
    {
        icon: "fas fa-brain",
        text: "Agytorna",
        link: "4",
        method: "menu_load_brainteaser",
        buttonID: generateID()
    },
    {
        icon: "fas fa-headphones",
        text: "Felolvasó",
        link: "5",
        method: "menu_load_listening",
        buttonID: generateID()
    },
    {
        icon: "fas fa-cog",
        text: "Beállítások",
        link: "7",
        method: "menu_load_settings",
        buttonID: generateID()
    },
    {
        icon: "fas fa-sign-out-alt",
        text: "Kijelentkezés",
        link: "8",
        method: "menu_load_signout",
        buttonID: generateID()
    },
];


var excerciseTypes = [
    {
        name: "Idegenről magyar nyelvre",
        value: 0
    },
    {
        name: "Magyar nyelvről idegenre",
        value: 1
    },
    {
        name: "Véletlenszerű kikérdezés",
        value: 2
    }
];

var excerciseRunTime = [
    {
        name: "Teljes szótár tartalma",
        value: 0
    },
    {
        name: "Manuális értékadás",
        value: 1
    },
    {
        name: "Futás megszakításig",
        value: 2
    }
];


var dialogObjects = [
    {
        name: "deleteRowObject",
        title: "Elem törlése",
        body: "Biztosan törölni szeretnéd a következőt?",
        id: "delete-row-dialog",
        color: "danger",
        text: "Törlés"
    },
    {
        name: "endOfExcercise",
        title: "Gyakorlás vége",
        body: "Biztosan ki szeretnél lépni a gyakorlásból?",
        id: "stop-excercise-dialog",
        color: "warning",
        text: "Kilépés"
    }
];

//'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
function generateID() {
    return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


// export { dashboardMenuItems, excerciseTypes, excerciseRunTime, dialogObjects };