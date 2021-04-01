import { state as state, resetState } from './state.js';


state.dictionaryName = 'tesztnév';
console.log(state);

resetState(state);

console.log(state);

state.dictionaryName = 'tesztnév';
