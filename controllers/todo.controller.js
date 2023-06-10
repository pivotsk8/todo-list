const Todo = require("../model/Todo");
const { todoValidation } = require("../validators/todoValidation");

const create = async (req, res) => {
  const todo = req.body;
  const { error } = todoValidation.validate(todo);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
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

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const todoById = await Todo.findById({ _id: id });
    res.status(200).send(todoById);
  } catch (error) {
    res.status(404).json({
      message: `the task with the id:${id} could not be found`,
      error,
    });
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const todoUpdated = await Todo.findByIdAndUpdate(id, body, { new: true });
    res.status(200).send(todoUpdated);
  } catch (error) {
    res.status(404).json({
      message: "the task could not be modified",
      error,
    });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const todoDelete = await Todo.findByIdAndDelete(id);
    res.status(200).send(todoDelete);
  } catch (error) {
    res.status(404).json({
      message: `the task with the id:${id} could not be found or not delete it`,
      error,
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
