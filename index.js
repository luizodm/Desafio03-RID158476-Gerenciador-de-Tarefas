const isTaskDone = (t) => t?.done === true;

const renderTasksProgressData = (tasks) => {
    if (!Array.isArray(tasks)) tasks = [];

    let tasksProgress;
    const tasksProgressDOM = document.getElementById("tasks-progress");

    if (tasksProgressDOM) tasksProgress = tasksProgressDOM;
    else {
        const newTasksProgressDOM = document.createElement("div");
        newTasksProgressDOM.id = "tasks-progress";
        document.getElementById("taskboard-footer").appendChild(newTasksProgressDOM);
        tasksProgress = newTasksProgressDOM;
    }

    const doneTasks = tasks.filter(isTaskDone).length;
    const totalTasks = tasks.length;

    tasksProgress.textContent = `${doneTasks}/${totalTasks} tarefas concluídas`;
};

const updateConcludeButton = (btn, isDone) => {
    if (isDone) {
        btn.classList.add("task__action--done");
        btn.setAttribute("aria-label", "Tarefa concluída");
        btn.innerHTML = '<img src="./assets/iconChecked.png" alt="Tarefa concluída" class="task__action-icon">';
    } else {
        btn.classList.remove("task__action--done");
        btn.setAttribute("aria-label", "Concluir tarefa");
        btn.textContent = "Concluir";
    }
};

const toggleTaskDone = (taskId) => {
    const tasks = getTasksFromLocalStorage();
    let newState = false;

    const updatedTasks = tasks.map((t) => {
        if (parseInt(t.id) === parseInt(taskId)) {
            newState = !t.done;
            return { ...t, done: newState };
        }
        return t;
    });

    setTasksInLocalStorage(updatedTasks);
    renderTasksProgressData(updatedTasks);

    const li = document.getElementById(String(taskId));
    if (li) {
        li.classList.toggle("task--done", newState);
        const btn = li.querySelector(".task__action");
        if (btn) updateConcludeButton(btn, newState);
    }
};

const getTasksFromLocalStorage = () => {
    const localTasks = JSON.parse(window.localStorage.getItem("tasks"))
    return localTasks ? localTasks : [];
}

const setTasksInLocalStorage = (tasks) => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

const removeDoneTasks = () => {
    const tasks = getTasksFromLocalStorage();

    const tasksToRemove = tasks
        .filter(isTaskDone)
        .map(({ id }) => id);

    const updatedTasks = tasks.filter((t) => !isTaskDone(t));
    setTasksInLocalStorage(updatedTasks);
    renderTasksProgressData(updatedTasks);

    tasksToRemove.forEach((taskToRemove) => {
        const li = document.getElementById(String(taskToRemove));
        if (li && li.parentElement) li.parentElement.removeChild(li);
    });
};

const createTaskListItem = (task) => {
    const list = document.getElementById("taskboard");
    const toDo = document.createElement("li");
    toDo.id = String(task.id);
    toDo.className = "task";

    const initiallyDone = isTaskDone(task);
    if (initiallyDone) toDo.classList.add("task--done");

    const taskContainer = document.createElement("div");
    taskContainer.className = "task__container";

    const descriptionSpan = document.createElement("span");
    descriptionSpan.className = "task__desc";
    descriptionSpan.textContent = task.description || "";

    const labelSpan = document.createElement("span");
    labelSpan.className = "task__label";
    labelSpan.textContent = task.label ? task.label : "";

    const dateSpan = document.createElement("span");
    dateSpan.className = "task__date";
    dateSpan.textContent = task.date ? `Criado em: ${task.date}` : "";

    taskContainer.appendChild(descriptionSpan);
    if (task.label) taskContainer.appendChild(labelSpan);
    taskContainer.appendChild(dateSpan);

    const concludeButton = document.createElement("button");
    concludeButton.type = "button";
    concludeButton.className = "task__action";
    updateConcludeButton(concludeButton, initiallyDone);
    concludeButton.onclick = () => toggleTaskDone(task.id);

    toDo.appendChild(taskContainer);
    toDo.appendChild(concludeButton);
    list.appendChild(toDo);

    return toDo;
};

const getNewTaskId = () => {
    // usar maxId evita ter ID's duplicados caso a ordem das tasks fique diferente da ordem de criação
    const tasks = getTasksFromLocalStorage();
    const maxId = tasks.reduce((max, t) => Math.max(max, Number(t.id || 0)), 0);
    return maxId + 1;
}

const getNewTaskData = (event) => {
    const description = event.target.elements.description.value;
    const label = event.target.elements.label.value;
    const id = getNewTaskId();

    const date = new Date();
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

    return { description, label, id, date: formattedDate };
}

const getCreatedTaskInfo = (event) => Promise.resolve(getNewTaskData(event));

const createTask = async (event) => {
    // para não criar tarefa vazia
    const descriptionInput = document.getElementById("description");
    const desc = descriptionInput.value.trim();
    if (!desc) {
        descriptionInput.focus();
        return;
    }

    event.preventDefault();
    document.getElementById("save-task").setAttribute("disabled", true)
    const newTaskData = await getCreatedTaskInfo(event);

    createTaskListItem(newTaskData);

    const tasks = getTasksFromLocalStorage();
    const updatedTasks = [
        ...tasks,
        {
            id: newTaskData.id,
            description: newTaskData.description,
            label: newTaskData.label,
            date: newTaskData.date,
            done: false
        }
    ];

    setTasksInLocalStorage(updatedTasks);
    renderTasksProgressData(updatedTasks);

    document.getElementById("description").value = "";
    document.getElementById("label").value = "";
    document.getElementById("save-task").removeAttribute("disabled");
}

window.onload = function () {
    const form = document.getElementById("create-taskboard-form");
    form.addEventListener("submit", createTask);

    let tasks = getTasksFromLocalStorage();

    if (!Array.isArray(tasks) || tasks.length === 0) {
        const today = new Date();
        const fmt = (d) => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
        tasks = [
            { id: 1, description: "Implementar tela de listagem de tarefas", label: "frontend", date: fmt(today), done: false },
            { id: 2, description: "Criar endpoint para cadastro de tarefas", label: "backend", date: fmt(today), done: false },
            { id: 3, description: "Implementar protótipo da listagem de tarefas", label: "backend", date: fmt(today), done: true },
        ];
        setTasksInLocalStorage(tasks);
    }

    tasks.forEach(createTaskListItem);
    renderTasksProgressData(tasks);
}