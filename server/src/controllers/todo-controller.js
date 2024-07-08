import Todo from "../models/todo-model.js";

export const addTodo = async (req, res) => {
  const { title, description, type, dueDate } = req.body;
  const { user } = req.user;

  if (!title) {
    res.status(400).json({
      message: "Please provide title",
    });
  }
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
