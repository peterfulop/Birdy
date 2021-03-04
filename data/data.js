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
        icon: "fas fa-chart-line",
        text: "Eredmények",
        link: "6",
        method: "menu_load_records",
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


var dictionaries = [
    {
        id: generateID(),
        name: "Angol-Magyar",
        table: "angol_magyar",
        relaseDate: "2021.02.04",
        langugagePrimary: "en-GB",
        languageSecondary: "hu-HU",
        value: 0,
        lexicon: [
            {
                array: ['apple', 'alma'],
                id: 0
            },
            {
                array: ['car', 'auto'],
                id: 1
            },
            {
                array: ['How can I help you?', 'Miben segíthetek?'],
                id: 2
            },
            {
                array: ['dream', 'álom'],
                id: 3
            },
            {
                array: ['red', 'piros'],
                id: 4
            },
            {
                array: ['watch', 'óra'],
                id: 5
            },
            {
                array: ['I think this is the beginning of a beautiful friendship', 'Úgy gondolom, ez egy csodálatos barátság kezdete!'],
                id: 6
            }
        ]
    },
    {
        id: generateID(),
        name: "Olasz-Magyar",
        table: "olasz_magyar",
        relaseDate: "2020.11.15",
        langugagePrimary: "it-IT",
        languageSecondary: "hu-HU",
        value: 1,
        lexicon: [
            {
                array: ['pomo', 'alma'],
                id: 0
            },
            {
                array: ['auto', 'autó'],
                id: 1
            },
            {
                array: ['automobilista', 'autós'],
                id: 2
            },

            {
                array: ['pane', 'kenyér'],
                id: 3
            },

            {
                array: ['vigneto', 'szőlő'],
                id: 4
            }

        ]
    },
    {
        id: generateID(),
        name: "Francia-Magyar",
        table: "francia_magyar",
        relaseDate: "2020.09.24",
        langugagePrimary: "fr-FR",
        languageSecondary: "hu-HU",
        value: 2,
        lexicon: [
            {
                array: ['pomme', 'alma'],
                id: 0
            },
            {
                array: ['amour', 'szerelem'],
                id: 1
            },
            {
                array: ['bonne journée', 'jó napot kívánok'],
                id: 2
            }
        ]
    },
    {
        id: generateID(),
        name: "Spanyol-Magyar",
        table: "spanyol_magyar",
        relaseDate: "2021.01.11",
        langugagePrimary: "es-ES",
        languageSecondary: "hu-HU",
        value: 3,
        lexicon: [
            {
                array: ['pistola', 'pisztoly'],
                id: 0
            },
            {
                array: ['autopista', 'országút'],
                id: 1
            },
            {
                array: ['juego de niños', 'gyerekjáték'],
                id: 2
            },
            {
                array: ['libertad', 'szabadság'],
                id: 3
            },
            {
                array: ['rojo', 'rojo'],
                id: 4
            },
            {
                array: ['banco', 'bank'],
                id: 5
            }
        ]
    },
    {
        id: generateID(),
        name: "Angol-Magyar Testrészek",
        table: "Angol-Magyar-Testreszek",
        relaseDate: "2021.02.17",
        langugagePrimary: "en-GB",
        languageSecondary: "hu-HU",
        value: 4,
        lexicon: [
            {
                array: ['head', 'fej'],
                id: 0
            },
            {
                array: ['tongue', 'nyelv'],
                id: 1
            },
            {
                array: ['ear', 'fül'],
                id: 2
            },
            {
                array: ['chest', 'mellkas'],
                id: 3
            },
            {
                array: ['fingers', 'ujjak'],
                id: 4
            },
            {
                array: ['wrist', 'csukló'],
                id: 5
            },
            {
                array: ['chin', 'áll'],
                id: 6
            },
            {
                array: ['stomach', 'has'],
                id: 7
            },
            {
                array: ['navel', 'köldök'],
                id: 8
            },
            {
                array: ['waist', 'derék'],
                id: 9
            },
            {
                array: ['cheek', 'orca'],
                id: 10
            },
            {
                array: ['face', 'arc'],
                id: 11
            },
            {
                array: ['elbow', 'könyök'],
                id: 12
            },
            {
                array: ['knee', 'térd'],
                id: 13
            },
            {
                array: ['heel', 'sarok'],
                id: 14
            },
            {
                array: ['forearm', 'alkar'],
                id: 15
            },
            {
                array: ['rim', 'talp'],
                id: 16
            },
            {
                array: ['hand', 'kéz'],
                id: 17
            },
            {
                array: ['hair', 'haj'],
                id: 18
            },
            {
                array: ['eyelashes', 'szempillák'],
                id: 19
            },
            {
                array: ['pupil', 'pupilla'],
                id: 20
            },
            {
                array: ['neck', 'nyak'],
                id: 21
            },
            {
                array: ['eyelid', 'szemhéj'],
                id: 22
            },
            {
                array: ['lip', 'ajak'],
                id: 23
            },
            {
                array: ['mouth', 'száj'],
                id: 24
            },
            {
                array: ['nose', 'orr'],
                id: 25
            },
            {
                array: ['iris', 'írisz'],
                id: 26
            },
            {
                array: ['eyebrow', 'szemöldök'],
                id: 27
            },
            {
                array: ['forehead', 'homlok'],
                id: 28
            },
            {
                array: ['The wite of the eye', 'szemfehérje'],
                id: 29
            },
            {
                array: ['shoulder', 'váll'],
                id: 30
            },
            {
                array: ['armpit', 'hónalj'],
                id: 31
            },
            {
                array: ['back', 'hát'],
                id: 32
            },
            {
                array: ['buttocks', 'fenék'],
                id: 33
            },
            {
                array: ['calf', 'vádli'],
                id: 34
            },
            {
                array: ['shin', 'lábszár,sípcsont'],
                id: 35
            }
        ]
    },
    {
        id: generateID(),
        name: "Német-Magyar",
        table: "nemet_magyar",
        relaseDate: "2021.02.22",
        langugagePrimary: "de-DE",
        languageSecondary: "hu-HU",
        value: 5,
        lexicon: [
            {
                array: ['Buch', 'könyv'],
                id: 0
            },
            {
                array: ['Autobahn', 'autópálya'],
                id: 1
            },
            {
                array: ['Guten Tag!', 'Jó napot kívánok!'],
                id: 2
            },
            {
                array: ['Freiheit', 'szabadság'],
                id: 3
            },
            {
                array: ['Birne', 'körte'],
                id: 4
            },
            {
                array: ['Wald', 'erdő'],
                id: 5
            },
            {
                array: ['Kirche', 'templom'],
                id: 6
            },
            {
                array: ['Hauptstadt', 'főváros'],
                id: 7
            },
            {
                array: ['Sprachwissenschaft', 'nyelvészet'],
                id: 8
            }
        ]
    },
    {
        id: generateID(),
        name: "Német-Angol",
        table: "angol_nemet",
        relaseDate: "2021.02.22",
        langugagePrimary: "de-DE",
        languageSecondary: "en-GB",
        value: 6,
        lexicon: [
            {
                array: ['Buch', 'book'],
                id: 0
            },
            {
                array: ['Autobahn', 'highway'],
                id: 1
            },
            {
                array: ['Guten Tag!', 'Good afternoon!'],
                id: 2
            },
            {
                array: ['Freiheit', 'liberty'],
                id: 3
            },
            {
                array: ['Birne', 'pear'],
                id: 4
            },
            {
                array: ['Wald', 'wood'],
                id: 5
            },
            {
                array: ['Kirche', 'Church'],
                id: 6
            },
            {
                array: ['Hauptstadt', 'capital'],
                id: 7
            },
            {
                array: ['Sprachwissenschaft', 'linguistics'],
                id: 8
            }
        ]
    }
]

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
    }
];



//'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
function generateID() {
    return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}




/**
 * https://csvjson.com/csv2json
 * CSV file convertálása JSON objetummá
 */