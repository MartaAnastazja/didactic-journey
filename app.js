const renderTask = (taskId, title, description, status) => {
    const section = document.createElement('section');
    section.className = 'card mt-5 shadow-sm';
    document.querySelector('main').appendChild(section);

    const headerDiv = document.createElement('div');
    headerDiv.className = 'card-header d-flex justify-content-between align-items-center';
    section.appendChild(headerDiv);

    const headerLeftDiv = document.createElement('div');
    headerDiv.appendChild(headerLeftDiv);

    const h5 = document.createElement('h5');
    h5.innerText = title;
    headerLeftDiv.appendChild(h5);

    const h6 = document.createElement('h6');
    h6.className = 'card-subtitle text-muted';
    h6.innerText = description;
    headerLeftDiv.appendChild(h6);

    const headerRightDiv = document.createElement('div');
    headerDiv.appendChild(headerRightDiv);

    // Operations
    const ul = document.createElement('ul');
    ul.className = 'list-group list-group-flush';
    section.appendChild(ul);
    apiListOperationsForTask(taskId).then(
        response => response.data.forEach(
            operation => renderOperation(ul, status, operation.id, operation.description, operation.timeSpent)
        )
    );

    // Deletion
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-outline-danger btn-sm ml-2';
    deleteButton.innerText = 'Delete';
    headerRightDiv.appendChild(deleteButton);
    deleteButton.addEventListener('click', () => apiDeleteTask(taskId).then(() => section.parentElement.removeChild(section)));


    // Actions When status open
    if (status == 'open') {
        // Finish task
        const finishButton = document.createElement('button');
        finishButton.className = 'btn btn-dark btn-sm js-task-open-only';
        finishButton.innerText = 'Finish';
        headerRightDiv.appendChild(finishButton);
        finishButton.addEventListener('click', () => {
            apiUpdateTask(taskId, title, description, 'closed');
            section.querySelectorAll('.js-task-open-only').forEach(
                element => element.parentElement.removeChild(element)
            );
        });

        // Add operation
        const addOperationDiv = document.createElement('div');
        addOperationDiv.className = 'card-body js-task-open-only';
        section.appendChild(addOperationDiv);

        const form = document.createElement('form');
        addOperationDiv.appendChild(form);

        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';
        form.appendChild(inputGroup);

        const descriptionInput = document.createElement('input');
        descriptionInput.setAttribute('type', 'text');
        descriptionInput.setAttribute('placeholder', 'Operation description');
        descriptionInput.setAttribute('minlength', '5');
        descriptionInput.className = 'form-control';
        inputGroup.appendChild(descriptionInput);

        const inputGroupAppend = document.createElement('div');
        inputGroupAppend.className = 'input-group-append';
        inputGroup.appendChild(inputGroupAppend);

        const addButton = document.createElement('button');
        addButton.className = 'btn btn-info';
        addButton.innerText = 'Add';
        inputGroupAppend.appendChild(addButton);
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            apiCreateOperationForTask(taskId, descriptionInput.value).then(
                response => {
                    renderOperation(
                        ul,
                        status,
                        response.data.id,
                        response.data.description,
                        response.data.timeSpent
                    );
                }
            );
        });
    }
}

const renderOperation = (ul, status, operationId, operationDescription, timeSpent) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    ul.appendChild(li);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.innerText = operationDescription;
    li.appendChild(descriptionDiv);

    const time = document.createElement('span');
    time.className = 'badge badge-success badge-pill ml-2';
    time.innerText = formatTime(timeSpent);
    descriptionDiv.appendChild(time);

    if(status == "open") {
        const controlDiv = document.createElement('div');
        controlDiv.className = 'js-task-open-only';
        li.appendChild(controlDiv);

        const add15minButton = document.createElement('button');
        add15minButton.className = 'btn btn-outline-success btn-sm mr-2';
        add15minButton.innerText = '+15m';
        controlDiv.appendChild(add15minButton);

        add15minButton.addEventListener('click', () =>
            apiUpdateOperation(operationId, operationDescription, timeSpent + 15).then(
                response => {
                    time.innerText = formatTime(response.data.timeSpent);
                    timeSpent = response.data.timeSpent;
                }
            )
        );

        const add1hButton = document.createElement('button');
        add1hButton.className = 'btn btn-outline-success btn-sm mr-2';
        add1hButton.innerText = '+1h';
        controlDiv.appendChild(add1hButton);
        add1hButton.addEventListener('click', () =>
            apiUpdateOperation(operationId, operationDescription, timeSpent + 60).then(
                response => {
                    time.innerText = formatTime(response.data.timeSpent);
                    timeSpent = response.data.timeSpent;
                }
            )
        );

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-outline-danger btn-sm';
        deleteButton.innerText = 'Delete';
        controlDiv.appendChild(deleteButton);
        deleteButton.addEventListener('click', () =>
            apiDeleteOperation(operationId).then(
                () => li.parentElement.removeChild(li)
            )
        );
    }
}

const initListComponent = () => {
    apiListTasks()
        .then(resp => resp.data.forEach(task => renderTask(task.id, task.title, task.description, task.status)))
        .catch(err => err);
}

const initForm = () => {
    document.querySelector('.js-task-adding-form').addEventListener('submit', (event) => {
        event.preventDefault();
        apiCreateTask(event.target.elements.title.value, event.target.elements.description.value).then(
            response => renderTask(response.data.id, response.data.title, response.data.description, response.data.status)
        )
    });
}

document.addEventListener('DOMContentLoaded', () => {
        initListComponent();
        initForm();
})
