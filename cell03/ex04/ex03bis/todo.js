$(document).ready(function () {

    loadTodoListFromLocalStorage();

    $('#btn').click(function () {
        var todo = prompt('Create new TODO');

        if (todo.trim() !== '' && todo !== null) {
            var child = createTodoElement(todo);
            $('#ft_list').append(child);
            saveTodoListToLocalStorage();
        }
    });
});

function createTodoElement(text) {
    var child = $('<div>').addClass('todo-list').text(text);

    return child.click(function () {
        if (confirm('Are you sure you want to remove this TODO?')) {
            $(this).remove();
            saveTodoListToLocalStorage();
        }
    });
}

function saveTodoListToLocalStorage() {
    var ft_list = $('#ft_list');
    var todoList = [];

    ft_list.children('.todo-list').each(function () {
        todoList.push($(this).text());
    });

    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function loadTodoListFromLocalStorage() {
    var ft_list = $('#ft_list');
    var storedTodoList = localStorage.getItem("todoList");

    if (storedTodoList) {
        var todoList = JSON.parse(storedTodoList);

        $.each(todoList, function (index, value) {
            var child = createTodoElement(value);
            ft_list.append(child);
        });
    }
}