const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");

let todos = [];
runEvents()

function runEvents(){
    form.addEventListener("submit", addTodo);
    secondCardBody.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click", removeAllTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
}

function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoList(todo);
    });
}

function addTodo(e){
    const inputText = addInput.value.trim();
    if(inputText === ""){
       showAlert("danger", "Lütfen boş bırakmayınız.")
    }else{
        addTodoList(inputText);
        addTodoToStorage(inputText);
        showAlert("success", "Todo eklendi.");
    }
    e.preventDefault();
}

function removeTodoToUI(e){
    if(e.target.className==="fa fa-remove"){
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        removeTodoFromStorage(todo.textContent);
        showAlert("success", "Todo başarıyla silindi.")
    }
}

function removeAllTodo(){
    const todoListesi = document.querySelectorAll(".list-group-item");
    if(todoListesi.length>0){
        todoListesi.forEach(function(todo) {
            todo.remove();
        });
        localStorage.removeItem("todos");
    }else{
        showAlert("warning", "Silmek için en az bir todo ekleyiniz.");
    }
}

function addTodoList(newTodo){
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between"; 
    li.textContent = newTodo;
    
    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
}

function showAlert(type, message){
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;

    firstCardBody.appendChild(div);

    setTimeout(function(){
        div.remove();
    },2500);
}

function addTodoToStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage(){
    if(localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function removeTodoFromStorage(deletedTodo){
    checkTodosFromStorage();
    todos = todos.filter(function(todo){
        return todo !== deletedTodo;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
