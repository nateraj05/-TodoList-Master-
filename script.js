// Get references to HTML elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Add event listener to the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Add event listener to mark tasks as completed
taskList.addEventListener('click', markTaskAsCompleted);

// Function to add a new task/ Function to add a new task
function addTask() {
  const taskText = taskInput.value;
  
  if (taskText.trim() !== '') {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
  
    taskList.appendChild(taskItem);
    taskInput.value = '';
    
    // Store the task in local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Function to retrieve tasks from local storage on app startup
function retrieveTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  tasks.forEach(taskText => {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
  
    taskList.appendChild(taskItem);
  });
}

// Call the retrieveTasks function on app startup
retrieveTasks();
// Function to update the category of a task
function updateTaskCategory(taskItem, newCategory) {
  taskItem.setAttribute('data-category', newCategory);
  
  // Update the category in local storage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskText = taskItem.textContent;
  const task = tasks.find(t => t.text === taskText);
  
  if (task) {
    task.category = newCategory;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Example usage: Add dropdown to change task category
// Add a dropdown for task categories
const categoryDropdown = document.createElement('select');
const categories = ['uncategorized', 'work', 'personal', 'shopping'];

categories.forEach(category => {
  const option = document.createElement('option');
  option.textContent = category;
  categoryDropdown.appendChild(option);
});

categoryDropdown.addEventListener('change', () => {
  const newCategory = categoryDropdown.value;
  updateTaskCategory(taskItem, newCategory);
});

taskItem.appendChild(categoryDropdown);

// Function to mark a task as completed
function markTaskAsCompleted(event) {
  const clickedElement = event.target;

  if (clickedElement.tagName === 'LI') {
    clickedElement.classList.toggle('completed');
  }
}
// Function to update the priority of a task
function updateTaskPriority(taskItem, newPriority) {
  taskItem.setAttribute('data-priority', newPriority);
  
  // Update the priority in local storage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskText = taskItem.textContent;
  const task = tasks.find(t => t.text === taskText);
  
  if (task) {
    task.priority = newPriority;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Example usage: Add buttons to change task priority
// Add a "High Priority" button
const highPriorityBtn = document.createElement('button');
highPriorityBtn.textContent = 'High Priority';
highPriorityBtn.addEventListener('click', () => {
  updateTaskPriority(taskItem, 'high');
});
taskItem.appendChild(highPriorityBtn);
