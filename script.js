let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');

// Массив для хранения задач:
let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

// Создание обработчика событий: 
//Что выполняется при нажатии на кнопку "Добавить":

addButton.addEventListener('click', function(){
    if(!addMessage.value) return;
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false,
    };

    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});

// Функция, которая переборftn массива 
// и каждый объект выводит на страницу в виде тега <li>:
function displayMessages() {
    let displayMessages = '';
    if(todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function(item, i) {
        // Создание тега li:
        displayMessages += `
        <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessages;                            
    });
}

todo.addEventListener('change', function(event){
    let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;

    todoList.forEach(function(item){
        if(item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));

        }
    });
});

todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    todoList.forEach(function(item, i){
        if(item.todo === event.target.innerHTML) {
            if(event.ctrlKey || event.metaKey){
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});