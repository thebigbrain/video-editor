class Store {

	static instance = null
	static getStore() {
		if (!Store.instance) {
			let store = new Store();
			Store.instance = store.createStore();
		}
		return Store.instance;
	}

	createStore = () => {
		let state = {};
		let listeners = {};

		const getState = () => state;

		const dispatch = (action) => {
			listeners[action.type].forEach(listener => listener(action.payload));
		};

		const subscribe = (type,listener) => {
			if(!!listeners[type]){
				listeners[type].push(listener);
			}else{
				listeners[type] = [listener];
			}
		};

		return { getState, dispatch, subscribe };
	}
}

export default Store.getStore();