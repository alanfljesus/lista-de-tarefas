const inputElement = document.querySelector('.new-task-input');
const addTaskButton = document.querySelector('.new-task-button')

const tasksContainer = document.querySelector('.tasks-container')

console.log(tasksContainer)

const validateInput = () => {
  return inputElement.value.trim().length > 0


  /* 
  O código acima é a mesma coisa que ⤵
  if (inputElement.value.trim().length > 0) {
      return: true;
  } else {
      return false;
  }
  */
}

const handleAddTank = () => {
  let inputIsValid = validateInput();

  if (!inputIsValid) {
    return inputElement.classList.add('error')
  }

  let taskItemContainer = document.createElement('div') // criar elemento div
  taskItemContainer.classList.add('task-item') // div de class= 'task-item'

  let taskContent = document.createElement('p') // paragrafo

  taskContent.innerText = inputElement.value;

  taskContent.addEventListener('click', () => handleClick(taskContent));


  let deleteItem = document.createElement('i'); // icone
  deleteItem.classList.add('far');
  deleteItem.classList.add('fa-trash-alt');

  deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  tasksContainer.appendChild(taskItemContainer);

  inputElement.value = ''; // Limpar o input depois de adicionar

  updateLocalStorage();
}

let handleClick = (taskContent) => {
  let tasks = tasksContainer.childNodes;

  for (let task of tasks) {
    let currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

    if (currentTaskIsBeingClicked) {
      task.firstChild.classList.toggle("completed");
    }
  }
  updateLocalStorage();
}

let handleDeleteClick = (taskItemContainer, taskContent) => {
  let tasks = tasksContainer.childNodes;

  for (let task of tasks) {
    let currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

    if (currentTaskIsBeingClicked) {
      taskItemContainer.remove();
    }
  }

  updateLocalStorage();
};


const handleInputChange = () => {
  let inputIsValid = validateInput();

  if (inputIsValid) {
    return inputElement.classList.remove('error')
  }
}

const updateLocalStorage = () => {
  let tasks = tasksContainer.childNodes;


  const localStorageTasks = [...tasks].map((task) => {
    let content = task.firstChild;
    let isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted: isCompleted };

  })

  localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
};

const refreshTasksUsingLocalStorage = () => {
  let tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

  for (let task of tasksFromLocalStorage) {
    let taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item')

    let taskContent = document.createElement('p')

    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }
  }
}

    taskContent.addEventListener('click', () => handleClick(taskContent));


    let deleteItem = document.createElement('i');
    deleteItem.classList.add('far');
    deleteItem.classList.add('fa-trash-alt');

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);
  }

}

refreshTasksUsingLocalStorage();

addTaskButton.addEventListener("click", () => handleAddTank());

inputElement.addEventListener('change', () => handleInputChange());
