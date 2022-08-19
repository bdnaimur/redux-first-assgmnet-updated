const containerEl = document.getElementById('container');
const counterComponentEl = document.getElementById('counterComponent');
const createCounter = document.getElementById('createCounter');
const valueEl = document.getElementById('value');
const increamentEl = document.getElementById('increament');
const decreamentEl = document.getElementById('decreament');
const resetBtnEl = document.getElementById('resetBtn');

let initialState = {
    value: 0,
    value1: 0,
    value2: 0,
    value3: 0
}


let uniqueIdCreate = 0;

createCounter.addEventListener('click', () => {
    uniqueIdCreate += 1;
    const nextCounter = 'value' + uniqueIdCreate;
    // initialState = { ...initialState, [nextCounter]: 0 }
    // console.log(initialState);

    let counterComponent_prime = counterComponentEl.cloneNode(true);
    counterComponent_prime.id = counterComponent_prime.id + uniqueIdCreate;
    containerEl.appendChild(counterComponent_prime);

    window[counterComponent_prime.id] = document.getElementById(counterComponent_prime.id);

    let valueIdUp = counterComponent_prime.querySelector(`#value`);
    valueIdUp.innerText = 0
    valueIdUp.id = valueIdUp.id + uniqueIdCreate;
    window[valueIdUp] = document.getElementById(valueIdUp);

    let incrementIdUp = counterComponent_prime.querySelector(`#increament`);
    incrementIdUp.id = incrementIdUp.id + uniqueIdCreate;
    window[incrementIdUp] = document.getElementById(incrementIdUp);

    incrementIdUp.addEventListener('click', () => {
        store.dispatch({ type: 'increament', valueIndentifier: nextCounter, increamentBy: uniqueIdCreate + 1 })
        store.subscribe(() => valueIdUp.innerText = store.getState()[nextCounter]);
    })

    let decreamentIdUp = counterComponent_prime.querySelector(`#decreament`);
    decreamentIdUp.id = decreamentIdUp.id + uniqueIdCreate;
    window[decreamentIdUp] = document.getElementById(decreamentIdUp);

    decreamentIdUp.addEventListener('click', () => {
        store.dispatch({ type: 'decreament', valueIndentifier: nextCounter, increamentBy: uniqueIdCreate + 1 })
        store.subscribe(() => valueIdUp.innerText = store.getState()[nextCounter]);

    })

})

resetBtnEl.addEventListener('click', () => {
    store.dispatch({ type: 'reset' })

})


const reducer = (state = initialState, action) => {
    if (action.type === 'increament') {
        console.log(state);
        return {
            ...state,
            [action.valueIndentifier]: parseInt(state[action.valueIndentifier]) + action.increamentBy
        }
    } else if (action.type === 'decreament') {
        return {
            ...state,
            [action.valueIndentifier]: parseInt(state[action.valueIndentifier]) - action.increamentBy
        }
    }
    else if (action.type === 'reset') {
        return {
            value: 0,
            value1: 0,
            value2: 0,
            value3: 0
        }
    } else {
        return { ...state }
    }
}


const store = Redux.createStore(reducer)

// var targetValueElement = valueEl;
// var valueElement

// window.onclick = e => {
//     var targetElement = document.getElementById(e.target.id).parentElement.previousElementSibling;
//     valueElement = targetElement
// }
const render = (elment) => {
    elment.innerText = store.getState().value;
}

store.subscribe(() => render(valueEl));



increamentEl.addEventListener('click', () => {
    store.dispatch({ type: 'increament', valueIndentifier: 'value', increamentBy: 1 })
})

decreamentEl.addEventListener('click', () => {
    store.dispatch({ type: 'decreament', valueIndentifier: 'value', increamentBy: 1 })
})

// console.log(initialState);