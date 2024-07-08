import Todo from "../models/todo-model.js";

//Add Todo
export const addTodo = async (req, res) => {
  const { title, description, type, dueDate } = req.body;
  const { user } = req.user;

  if (!title || !description || !dueDate) {
    return res.status(400).json({
      message: "Please provide all the fields ",
    });
  }

  if (!["Official", "Personal", "Hobby"].includes(type)) {
    return res.status(400).json({
      error: true,
      message: "Invalid type. Must be one of: Official, Personal, Hobby",
    });
  }

  try {
    const newTodo = new Todo({
      title,
      description,
      type: type,
      dueDate,
      userId: user._id,
      completed: false,
      isPinned: false,
    });

    await newTodo.save();

    return res.status(201).json({
      error: false,
      newTodo,
      message: "Todo added Successfully",
    });
  } catch (error) {
    console.error("Error adding todo:", error);
    return res.status(400).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

//Update Todo
export const updateTodo = async (req, res) => {
  const todoId = req.params.id;

  const { title, description, type, dueDate } = req.body;
  const { user } = req.user;

  if (!title && !description && !type && !dueDate) {
    return res.status(400).json({
      error: true,
      message: "No Changes Provided",
    });
  }

  try {
    const todo = await Todo.findOne({ _id: todoId, userId: user._id });

    if (!todo) {
      return res.status(404).json({
        error: true,
        message: "Todo Not Found",
      });
    }

    if (title) todo.title = title;
    if (description) todo.description = description;
    if (type) todo.type = type;
    if (dueDate) todo.dueDate = dueDate;

    await todo.save();

    return res.status(201).json({
      error: false,
      todo,
      message: "Todo updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

//Get All Todo
export const getTodos = async (req, res) => {
  const { user } = req.user;

  try {
    const todos = await Todo.find({
      userId: user._id,
    }).sort({
      isPinned: -1,
    });

    return res.status(200).json({
      error: false,
      todos,
      message: "All Todos received successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};
