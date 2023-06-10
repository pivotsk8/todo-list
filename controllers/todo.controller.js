const Todo = require("../model/Todo");
const catchAsync = require("../helpers/catchAnsync");
const {
  createTodoValidationSchema,
  updateTodoValidationSchema,
  idParamSchema,
} = require("../validators/todoValidation");

// 👉 CRUD
const create = catchAsync(async (req, res) => {
  //👉 Variable
  const todo = req.body;
  const { error } = createTodoValidationSchema.validate(todo);
  let newTodo;

  //👉 Validacion inPut
  error
    ? res.status(400).json({
        error: `The field:(${error.details[0].message}) `,
      })
    : (newTodo = await Todo.create(todo));
  //-----------------------------------------------------------
  res.status(200).send(newTodo);
});

const getAll = catchAsync(async (req, res) => {
  const allTodos = await Todo.find();
  res.send(allTodos);
});

// const validationId = (id) => {
//   const { error } = idParamSchema.validate({ id });
//   if (error) {
//     return res.status(400).json({ message: "Id is not valid" });
//   }
// };

const getById = catchAsync(async (req, res) => {
  //👉 Variable
  const { id } = req.params;
  const { error } = idParamSchema.validate({ id });
  let todoById;

  //👉 Validacion inPut
  error
    ? res.status(400).json({ message: "Id is not valid" })
    : (todoById = await Todo.findById({ _id: id }));
  //-----------------------------------------------------------
  res.status(200).send(todoById);
});

const updateById = catchAsync(async (req, res) => {
  //👉 Variable
  const { id } = req.params;
  const { body } = req;
  const { error: idError } = idParamSchema.validate({ id });
  const { error: bodyError } = updateTodoValidationSchema.validate(body);
  const errorMessage = idError ? `ID: ${idError}` : `Body: ${bodyError}`;
  let todoUpdated;

  //👉 Validacion inPut
  idError || bodyError
    ? res.status(400).json({ message: errorMessage })
    : (todoUpdated = await Todo.findByIdAndUpdate(id, body, { new: true }));
  //-----------------------------------------------------------

  res.status(200).send(todoUpdated);
});

const deleteById = catchAsync(async (req, res) => {
  //👉 Variable
  const { id } = req.params;
  const { error } = idParamSchema.validate({ id });
  let todoDelete;

  //👉 Validacion inPut
  error
    ? res.status(400).json({ message: "Id is not valid" })
    : (todoDelete = await Todo.findByIdAndDelete(id));
  //-----------------------------------------------------------
  res.status(200).send(todoDelete);
});

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
