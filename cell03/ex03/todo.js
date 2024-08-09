function newList() {
    var ft_list = document.getElementById("ft_list");
    var todo = prompt('Create new TODO');

    if (todo.trim() !== '' && todo !== null) {
        var child = createTodoElement(todo);
        ft_list.appendChild(child);
        saveTodoListToLocalStorage();
    }
}

function createTodoElement(text) {
    var child = document.createElement('div');
    child.className = "todo-list";
    child.textContent = text;
    child.onclick = function () {
        if (confirm('Are you sure you want to remove this TODO?')) {
            ft_list.removeChild(child);
            saveTodoListToLocalStorage();
        }
    };
    return child;
}

function saveTodoListToLocalStorage() {
    var ft_list = document.getElementById("ft_list");
    var todoList = [];

    for (var i = 0; i < ft_list.children.length; i++) {
        todoList.push(ft_list.children[i].textContent);
    }

    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function loadTodoListFromLocalStorage() {
    var ft_list = document.getElementById("ft_list");
    var storedTodoList = localStorage.getItem("todoList");

    if (storedTodoList) {
        var todoList = JSON.parse(storedTodoList);

        for (var i = 0; i < todoList.length; i++) {
            var child = createTodoElement(todoList[i]);
            ft_list.appendChild(child);
        }
    }
}

window.onload = function () {
    loadTodoListFromLocalStorage();
};
// localStorage.removeItem("todoList");