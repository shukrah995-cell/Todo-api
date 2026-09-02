
const express = require("express");

const app = express();

app.use(express.json());

let todos = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Build Todo API", completed: true }
];

// Get all todos
app.get("/todos", (req, res) => {
  if (req.query.completed !== undefined) {
    const completed = req.query.completed === "true";
    return res.json(todos.filter(todo => todo.completed === completed));
  }

  res.json(todos);
});

// Get active todos
app.get("/todos/active", (req, res) => {
  res.json(todos.filter(todo => !todo.completed));
});

// Get a single todo
app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json(todo);
});

// Create a new todo
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

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
