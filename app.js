//Define vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// 
function loadEventListeners(){
  // Add task event
  form.addEventListener('submit', addTask);
  // remove task event
  taskList.addEventListener('click', removeTask);
  // clear task event
  clearBtn.addEventListener('click', clearTasks);
  // filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Add Task 
function addTask(e) {
  if(taskInput.value === ''){
    alert('Add a task');
  }

  // create li element
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));

  // create new link
  const link = document.createElement('a');
  link.className ='delete-item secondary-content';
  link.innerHTML ='<i class="fa fa-remove"></i>'
  li.appendChild(link);

  //store in localstorage
  storeTaskInLocalStorage(taskInput.value);

  taskList.appendChild(li);
 // clear input
  taskInput.value = '';
  e.preventDefault();
}
//Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('task') === null){
    tasks =[]
  } else {
    tasks = JSON.parse(localStorage.getItem("task"));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}



// Remove Task
function removeTask(e){

  if (e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure')){
      e.target.parentElement.parentElement.remove(); 
    }
  }
}

// Clear Btn
function clearTasks(e){
  // //one way
  // taskList.innerHTML='';
  //faster way 
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}


