const containerEl = document.getElementById('container');
const counterComponentEl = document.getElementById('counterComponent');
const createCounterEl = document.getElementById('createCounter');
const valueEl = document.getElementById('value');
const increamentEl = document.getElementById('increament');
const decreamentEl = document.getElementById('decreament');
const resetBtnEl = document.getElementById('resetBtn');
const byIncreamentEl = document.getElementById('byIncreament');
const byDecrementEl = document.getElementById('byDecrement');

const initialState = [
    {
        id: 1,
        count: 0
    }
]

let uniqueIdCreator = 1;
createCounterEl.addEventListener('click', () => {
    console.log(initialState);
    const newId = uniqueIdCreator + 1;
    uniqueIdCreator = uniqueIdCreator + 1;
    const newCounter = { id: uniqueIdCreator, count: 0 }
    initialState.push(newCounter)

    let counterComponent_prime = counterComponentEl.cloneNode(true);
    counterComponent_prime.id = counterComponent_prime.id + uniqueIdCreator;
    containerEl.appendChild(counterComponent_prime);

    let byEncrementUp = counterComponent_prime.querySelector(`#byIncreament`);
    byEncrementUp.id = byEncrementUp.id + uniqueIdCreator + 1;
    byEncrementUp.innerText = '(' + uniqueIdCreator + ')'

    let byDecrementUp = counterComponent_prime.querySelector(`#byDecrement`);
    byDecrementUp.id = byDecrementUp.id + uniqueIdCreator + 1;
    byDecrementUp.innerText = '(' + uniqueIdCreator + ')'

    window[counterComponent_prime.id] = document.getElementById(counterComponent_prime.id);



    let valueIdUp = counterComponent_prime.querySelector(`#value`);
    valueIdUp.id = valueIdUp.id + uniqueIdCreator;
    window[valueIdUp] = document.getElementById(valueIdUp);

    valueIdUp.innerText = 0

    let incrementIdUp = counterComponent_prime.querySelector(`#increament`);
    incrementIdUp.id = incrementIdUp.id + uniqueIdCreator;
    window[incrementIdUp] = document.getElementById(incrementIdUp);

    incrementIdUp.addEventListener('click', (e) => {
        console.log(newCounter);
        store.dispatch({ type: 'increament', id: newCounter.id, increament: newCounter.id })
        store.subscribe(() => valueIdUp.innerText = store.getState()[newCounter.id - 1].count);
        console.log(newId, store.getState());
    })


    let decreamentIdUp = counterComponent_prime.querySelector(`#decreament`);
    decreamentIdUp.id = decreamentIdUp.id + uniqueIdCreator;
    window[decreamentIdUp] = document.getElementById(decreamentIdUp);

    // decreamentIdUp.addEventListener('click', (e) => {
    //     console.log(newCounter);
    //     store.dispatch({ type: 'decrement', id: newCounter.id, increament: newCounter.id })
    //     store.subscribe(() => valueIdUp.innerText = store.getState()[newCounter.id - 1].count);
    //     console.log(newId, store.getState());
    // })
})


resetBtnEl.addEventListener('click', () => {
    store.dispatch({ type: 'reset' })
})


const reducer = (state = initialState, action) => {
    console.log(state, action);
    switch (action.type) {

        case 'increament':
            const updatedState = state.map(item => {
                if (item.id == action.id) {
                    console.log('from if');
                    const updateData = { ...item, count: item.count + action.increament }
                    return updateData
                }
                return item
            })
            return [
                ...updatedState
            ]
        case 'decrement':
            const decrementState = state.map(item => {
                if (item.id == action.id) {
                    console.log('from if');
                    const updateData = { ...item, count: item.count - action.increament }
                    return updateData
                }
                return item
            })
            return [
                ...decrementState
            ]

        case 'reset':
            const resetState = state.map(item => {
                const updateData = { ...item, count: 0 }
                return updateData
            }
            )
            return [
                ...resetState
            ]

        default:
            [...state]
    }

}


const store = Redux.createStore(reducer)
console.log(store.getState());

const render = () => {

    store.getState().forEach(counter => {
        console.log(counter);
        counterValue(counter.id).innerText = counter.count;
        increamentBtnEl(counter.id).addEventListener('click', () => { console.log('isClick from forEach'); store.dispatch({ type: 'increament', id: 1, increament: 1 }) })
        decrementBtnEl(counter.id).addEventListener('click', () => store.dispatch({ type: 'increament', id: 1, increament: 1 }))
    });
    // element.innerText = store.getState()[0].count;
}

store.subscribe(render());

const counterValue = (id) => {
    return document.getElementById('value' + id)
}

const increamentBtnEl = (id) => {
    return document.getElementById('increament' + id)
}

const decrementBtnEl = (id) => {
    return document.getElementById('decrement' + id)
}

// increamentEl.addEventListener('click', () => {
//     store.dispatch({ type: 'increament', id: 1, increament: 1 })
// })

// decreamentEl.addEventListener('click', () => {
//     store.dispatch({ type: 'decrement', id: 1, increament: 1 })
// })