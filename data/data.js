var deshboardMenuItems = [
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




var dictionarires = [
    {
        name: "Angol-Magyar",
        table: "angol_magyar",
        relaseDate: "2021.02.04",
        count: "235",
        value: 0,
        lexicon: [
            "apple;alma",
            "car;auto",
            "value;érték",
            "dream;álom",
            "red;piros",
            "watch;óra"
        ]
    },
    {
        name: "Olasz-Magyar",
        table: "olasz_magyar",
        relaseDate: "2020.11.15",
        count: "156",
        value: 1,
        lexicon: [
            "pomo;alma",
            "auto;autó",
            "automobilista;autós",
            "pane;kenyér",
            "vigneto;szőlő",
            "vino;bor",
            "prosciutto;sonka",
            "formaggio;sajt",
            "orologio;óra",
            "italiano;olasz",
            "persona;személy",
            "cascata;vízesés",
            "cane;kutya"
        ]
    },
    {
        name: "Francia-Magyar",
        table: "francia_magyar",
        relaseDate: "2020.09.24",
        count: "135",
        value: 2,
        lexicon: [
            "pomme;alma",
            "amour;szerelem",
            "bonne journée;jó napot kívánok"
        ]
    },
    {
        name: "Spanyol-Magyar",
        table: "spanyol_magyar",
        relaseDate: "2021.01.11",
        count: "877",
        value: 3,
        lexicon: [
            "pistola;pisztoly",
            "autopista;országút",
            "juego de niños;gyerekjáték",
            "libertad;szabadság",
            "rojo;piros",
            "banco;bank"
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
