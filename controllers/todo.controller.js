const Todo = require("../model/Todo");
const {
  createTodoValidationSchema,
  updateTodoValidationSchema,
  idParamSchema,
} = require("../validators/todoValidation");

const create = async (req, res) => {
  const todo = req.body;
  let newTodo;

  try {
    const { error } = createTodoValidationSchema.validate(todo);
    error
      ? res.status(400).json({
          error: `The field:(${error.details[0].message}) `,
        })
      : (newTodo = await Todo.create(todo));
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
  const { error } = idParamSchema.validate({ id });
  let todoById;

  try {
    error
      ? res.status(400).json({ message: "Id is not valid" })
      : (todoById = await Todo.findById({ _id: id }));
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
  const { body } = req;
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
