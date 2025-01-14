import { createStore } from 'redux';

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.querySelector('span');

const ADD = 'ADD';
const MINUS = 'MINUS';

const counterModifier = (count = 0, action) => {
	switch (action.type) {
		case ADD:
			return count + 1;
		case MINUS:
			return count - 1;
		default:
			return count;
	}
};
const countStore = createStore(counterModifier);

const onChange = () => {
	number.innerText = countStore.getState();
};
countStore.subscribe(onChange);

add.addEventListener('click', () => countStore.dispatch({ type: ADD }));
minus.addEventListener('click', () => countStore.dispatch({ type: MINUS }));
