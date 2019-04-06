export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {}) {
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  get value() {
    return this.state;
  }

  dispatch(action) {
    this.state = this.reduce(this.state, action);
    console.log(this.state);
  }

  private reduce(state, action) {
    const newState = {};

    for (const property in this.reducers) {
      // example: newState[todos] = this.reducers.todos(state.todos, action)
      newState[property] = this.reducers[property](state[property], action);
    }

    return newState;
  }
}
