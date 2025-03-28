const express = require('express');
const app = express();
app.use(express.json());

let todos = [];
app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const todo = {
        id: Date.now(),
        text: req.body.text,
        completed: false
    };
    todos.push(todo);
    res.status(201).json(todo);
});

app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(function (t) {
    return t.id === id
    });


    if (todoIndex !== -1) {
        todos[todoIndex] = {
            ...todos[todoIndex], // rest operator
            ...req.body
        };
        res.json(todos[todoIndex]);
    }

    else {
        res.status(404).send('Todo was not found.');
    }
});

app.delete('/todos/:id', (req, res) => { // to delete
    const id = parseInt(req.params.id);
    const initialLength = todos.length;

    todos = todos.filter(t => t.id !== id);

    if (todos.length < initialLength) {
        res.status(200).send('Todo deleteed.');
    } else {
        res.status(404).send('Todo was not found.');
    }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server runs on ${PORT}.`);
});