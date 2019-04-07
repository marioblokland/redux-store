import { Store, reducer, ADD_TODO, AddTodo, RemoveTodo } from './store';

import { renderTodos } from './utils';

const input = document.querySelector('input') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;
const destroy = document.querySelector('.unsubscribe') as HTMLButtonElement;
const todoList = document.querySelector('.todos') as HTMLLIElement;

const reducers = {
  todos: reducer
};

const store = new Store(reducers);

button.addEventListener(
  'click',
  () => {
    if (!input.value.trim()) return;
    const payload = { label: input.value, complete: false };

    store.dispatch(new AddTodo(payload));

    input.value = '';
  },
  false
);

const unsubscribe = store.subscribe(state => renderTodos(state.todos.data));

destroy.addEventListener('click', unsubscribe, false);

todoList.addEventListener('click', function(event) {
  const target = event.target as HTMLButtonElement;
  if (target.nodeName.toLowerCase() === 'button') {
    const todo = JSON.parse(target.getAttribute('data-todo') as any);
    store.dispatch(new RemoveTodo(todo));
  }
});

store.subscribe(state => console.log('STATE::', state));
