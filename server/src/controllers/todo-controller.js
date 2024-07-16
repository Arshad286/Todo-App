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
      error: "Invalid type. Must be one of: Official, Personal, Hobby",
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
      newTodo,
      message: "Todo added Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      error: "Internal Server Error",
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
      message: "No Changes Provided",
    });
  }

  try {
    const todo = await Todo.findOne({ _id: todoId, userId: user._id });

    if (!todo) {
      return res.status(404).json({
        message: "Todo Not Found",
      });
    }

    if (title) todo.title = title;
    if (description) todo.description = description;
    if (type) todo.type = type;
    if (dueDate) todo.dueDate = dueDate;

    await todo.save();

    return res.status(200).json({
      todo,
      message: "Todo updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

//Get All Todo
export const getTodos = async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;

  try {
    const searchTodo = {
      userId: user._id,
    };

    if (query) {
      searchTodo.$or = [
        { title: { $regex: new RegExp(query, "i") } },
        { description: { $regex: new RegExp(query, "i") } },
      ];
    }

    const todos = await Todo.find(searchTodo).sort({
      isPinned: -1,
    });

    return res.status(200).json({
      todos,
      message: "All Todos received successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

//Delete Todo
export const deleteTodo = async (req, res) => {
  const todoId = req.params.id;
  const { user } = req.user;

  try {
    const todo = await Todo.findOne({
      _id: todoId,
      userId: user._id,
    });

    if (!todo) {
      return res.status(401).json({
        error: "Todo not found",
      });
    }

    await Todo.deleteOne({
      _id: todoId,
      userId: user._id,
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

//Update isCompleted Value
export const toggleCompleteStatus = async (req, res) => {
  const todoId = req.params.id;

  const { Completed } = req.body;
  const { user } = req.user;

  try {
    const todo = await Todo.findOne({ _id: todoId, userId: user._id });

    if (!todo) {
      return res.status(404).json({
        error: "Todo Not Found",
      });
    }

    todo.Completed = Completed;

    await todo.save();

    return res.status(200).json({
      todo,
      message: "Todo updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

//Update isPinned Value
export const togglePinnedStatus = async (req, res) => {
  const todoId = req.params.id;

  const { isPinned } = req.body;
  const { user } = req.user;

  try {
    const todo = await Todo.findOne({ _id: todoId, userId: user._id });

    if (!todo) {
      return res.status(404).json({
        error: "Todo Not Found",
      });
    }

    todo.isPinned = isPinned;

    await todo.save();

    return res.status(200).json({
      todo,
      message: "Todo updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
