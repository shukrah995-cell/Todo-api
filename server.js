const express = require("express");

const app = express();

app.use(express.json());

app.get("/todos/active", (req, res) => {
  res.json(todos.filter(todo => !todo.completed));
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});0

let todos = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Build Todo API", completed: true }
];

app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json(todo);
});0

app.post("/todos", (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ message: "Task is required" });
  }

  const newTodo = {
    id: todos.length + 1,
    task: task,
    completed: false
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});
0

app.get("/todos", (req, res) => {
  if (req.query.completed !== undefined) {
    const completed = req.query.completed === "true";
    return res.json(todos.filter(todo => todo.completed === completed));
  }

  res.json(todos);
});
0

app.get("/todos/active", (req, res) => {
  res.json(todos.filter(todo => !todo.completed));
});0
0

