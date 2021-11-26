function postTodo() {
    fetch('localhost:3007/', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}