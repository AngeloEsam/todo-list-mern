import Todo from "../models/Todo.js";

export const addTodo = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    const todo = await Todo.create({
      user: req.user._id,
      title,
      description,
      dueDate,
    });

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Error adding task", error: err.message });
  }
};

export const getTodos = async (req, res) => {
  try {
    const { status, title } = req.query;

    const query = { user: req.user._id };
    if (status) query.status = status;
    if (title) query.title = { $regex: title, $options: "i" };

    const todos = await Todo.find(query).sort({ dueDate: 1 });
    res.json(todos);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: err.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (!todo) return res.status(404).json({ message: "Task not found" });

    if (todo.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this task" });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    res.json(updatedTodo);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating task", error: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (!todo) return res.status(404).json({ message: "Task not found" });

    if (todo.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this task" });
    }

    await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: err.message });
  }
};

export const toggleStatus = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (!todo) return res.status(404).json({ message: "Task not found" });

    todo.status = todo.status === "pending" ? "completed" : "pending";
    await todo.save();

    res.json(todo);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating status", error: err.message });
  }
};
