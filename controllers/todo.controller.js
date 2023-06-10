const Todo = require("../model/Todo");

const create = async (req, res) => {
  try {
    const todo = req.body;
    const newTodo = await Todo.create(todo);
    res.status(200).send(newTodo);
  } catch (error) {
    res.status(404).json({
      message: "The task could not be created ",
      error,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const allTodos = await Todo.find();
    res.send(allTodos);
  } catch (error) {
    res.status(404).json({ message: "Records could not be found", error });
  }
};

module.exports = {
  create,
  getAll,
};
