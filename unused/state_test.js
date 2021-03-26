var App = (function () {

    const sm = stateMethods();
    var state = sm.newState();
    const mb_1 = methodBlock_1();

    mb_1.startBlock(state);


    return {
        getState: function () {
            return { ...state };
        },
        setState: function (key, value) {
            state[key] = value;
        }

    };

})();


function methodBlock_1() {

    function startBlock(state) {
        method_1(state);
    }

    function method_1(state) {
        ButtonEvent_1(state);
    }

    function ButtonEvent_1(state) {
        document.getElementById('btn_1').addEventListener('click', () => {
            renderList(state)
        })
    }

    function renderList(state) {

        const stateContent = 'Első szótáram';

        let content = document.getElementById('content-list');
        content.innerHTML = '';
        Object.values(state.dictionaries).map((item, i) => {
            content.innerHTML += `<li>${i + 1}. ${item}</li>`
        })

        App.setState('activeMenu', stateContent);
    }


    return {
        startBlock: startBlock
    }

};


function stateMethods() {

    class State {
        constructor() {
            this.screenMode = 0;
            this.activeMenu = '';
            this.selectedDictionary = '';
            this.selectedDictionaryLength = '';
            this.dictionaryID = '';
            this.dictionaryName = '';
            this.dictionaries = this.setStateParameters();
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

        setStateParameters() {

            let puffer = [];
            for (let i = 0; i < 10; i++) {
                puffer.push(`szótár ${i}_${i + 10}`);
            }
            return puffer;
        }

    };

    function newState() {
        return new State;
    }


    return {
        newState: newState,
    }

}