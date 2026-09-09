const taskEl = document.getElementById('task');
const addBtn = document.getElementById('add-btn');
const listEl = document.getElementById('list'); 
let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieve tasks from local storage or initialize an empty array (if there no data has been saved before => null, but in order not to make an error when using tasks value (null) later => using || to get [] instead)
tasks.forEach(function(task) {
    renderTask(task)
});

addBtn.addEventListener('click', function() {
    let inputValue = taskEl.value;
    taskEl.value = "";
    if (inputValue === "") {
        return alert("Please don't let the input field empty");
    }
    let newTask = {
        text: inputValue,
        completed: false // false because when just created, the task hasn't completed yet
    };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // parameter 1 should be the same for setItem and getItem 
    renderTask(newTask);
})

function renderTask(taskObject) {
    let newLi = document.createElement('li');
    newLi.textContent = taskObject.text;
    listEl.appendChild(newLi);
    newLi.addEventListener('click', function() {
        newLi.classList.toggle('completed');
        taskObject.completed =! taskObject.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    })
    let newButton = document.createElement('button');
    newButton.textContent = "🗑️";
    newLi.appendChild(newButton);
    newButton.addEventListener('click', function() {
        newLi.remove();
        tasks = tasks.filter(function(mission) {
            return mission !== taskObject;
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    })
}
