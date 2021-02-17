var dashboardMenuItems = [
    {
        icon: "fas fa-home",
        text: "Home",
        link: "0",
        method: "menu_load_home"
    },
    {
        icon: "fas fa-user-circle",
        text: "Profile",
        link: "1",
        method: "menu_load_profile"
    },
    {
        icon: "fas fa-book",
        text: "Dictionaries",
        link: "2",
        method: "menu_load_dictionaries"
    },
    {
        icon: "fas fa-plus-circle",
        text: "Add Words!",
        link: "3",
        method: "menu_load_addwords"
    },
    {
        icon: "fas fa-brain",
        text: "Brain Teaser",
        link: "4",
        method: "menu_load_brainteaser"
    },
    {
        icon: "fas fa-headphones",
        text: "Listening",
        link: "5",
        method: "menu_load_listening"
    },
    {
        icon: "fas fa-chart-line",
        text: "Records",
        link: "6",
        method: "menu_load_records"
    },
    {
        icon: "fas fa-cog",
        text: "Settings",
        link: "7",
        method: "menu_load_settings"
    },
    {
        icon: "fas fa-sign-out-alt",
        text: "Sign Out!",
        link: "8",
        method: "menu_load_signout"
    },
];


var dictionaries = [
    {
        id: generateID(),
        name: "Angol-Magyar",
        table: "angol_magyar",
        relaseDate: "2021.02.04",
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
                array: ['vigneto', 'ószőlőra'],
                id: 4
            }

        ]
    },
    {
        id: generateID(),
        name: "Francia-Magyar",
        table: "francia_magyar",
        relaseDate: "2020.09.24",
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
        value: 3,
        lexicon: [
            {
                array: ['pistola', 'pistola'],
                id: 0
            },
            {
                array: ['autopista', 'országút'],
                id: 1
            },
            {
                array: ['juego de niños', 'juego de niños'],
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

//'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
function generateID() {
    return 'D_xxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
