const apiKey = "0135f813-5298-49ff-9e15-8eece4951333";
const apihost = 'https://todo-api.coderslab.pl';

const apiListTasks = () => {
    return fetch(apihost + '/api/tasks',{ headers: { Authorization: apiKey }}
    ).then(resp => {
            if(!resp.ok) {
                console.log(resp);
            }
            return resp.json();
        }
    )
}

const apiListOperationsForTask = taskId => {
    return fetch(
        apihost + '/api/tasks/' + taskId + '/operations',
        { headers: { 'Authorization': apiKey } }
    ).then(
        function (resp) {
            if(!resp.ok) {
                console.log(resp);
            }
            return resp.json();
        }
    );
}

const apiCreateTask = (title, description) => {
    return fetch(
        apihost + '/api/tasks',
        {
            headers: { Authorization: apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, description: description, status: 'open' }),
            method: 'POST'
        }
    ).then(
        function (resp) {
            if(!resp.ok) {
                console.log(resp);
            }
            return resp.json();
        }
    );
}

const apiDeleteTask = taskId => {
    return fetch(
        apihost + '/api/tasks/' + taskId,
        {
            headers: { Authorization: apiKey },
            method: 'DELETE'
        }
    ).then(
        function (resp) {
            if(!resp.ok) {
                console.log(resp);
            }
            return resp.json();
        }
    )
}

const apiCreateOperationForTask = (taskId, description) => {
    return fetch(
        apihost + '/api/tasks/' + taskId + '/operations',
        {
            headers: { Authorization: apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: description, timeSpent: 0 }),
            method: 'POST'
        }
    ).then(
        function (resp) {
            if(!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return resp.json();
        }
    );
}

const apiDeleteOperation = operationId => {
    return fetch(
        apihost + '/api/operations/' + operationId,
        {
            headers: { Authorization: apiKey },
            method: 'DELETE'
        }
    ).then(
        function (resp) {
            if(!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return resp.json();
        }
    )
}

const apiUpdateTask = (taskId, title, description, status) => {
    return fetch(
        apihost + '/api/tasks/' + taskId,
        {
            headers: { Authorization: apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, description: description, status: status }),
            method: 'PUT'
        }
    ).then(
        function (resp) {
            if(!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return resp.json();
        }
    );
}

const apiUpdateOperation = (operationId, description, timeSpent) => {
    return fetch(
        apihost + '/api/operations/' + operationId,
        {
            headers: { Authorization: apiKey, 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: description, timeSpent: timeSpent }),
            method: 'PUT'
        }
    ).then(
        function (resp) {
            if(!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return resp.json();
        }
    );
}
