const Todo = require("../../model/Todo");
const {
  createTodoValidationSchema,
  updateTodoValidationSchema,
  idParamSchema,
} = require("../../validators/todoValidation");
const {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
} = require("../../controllers/todo.controller");

jest.mock("../../model/Todo");
jest.mock("../../validators/todoValidation", () => {
  const createTodoValidationSchema = {
    validate: jest.fn().mockReturnValue({ error: undefined }),
  };

  const updateTodoValidationSchema = {
    validate: jest.fn().mockReturnValue({ error: undefined }),
  };

  const idParamSchema = {
    validate: jest.fn().mockReturnValue({ error: undefined }),
  };

  return {
    createTodoValidationSchema,
    updateTodoValidationSchema,
    idParamSchema,
  };
});

describe("Todo Controller", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a new todo", async () => {
      const todo = {
        title: "Test Todo",
        description: "Test Description",
        done: false,
      };
      const savedTodo = {
        _id: "5fd8bce0b801e441c8f9f6fb",
        ...todo,
      };
      req.body = todo;
      createTodoValidationSchema.validate.mockReturnValue({ error: undefined });
      Todo.create.mockResolvedValue(savedTodo);

      await create(req, res, next);

      expect(createTodoValidationSchema.validate).toHaveBeenCalledWith(todo);
      expect(Todo.create).toHaveBeenCalledWith(todo);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(savedTodo);
    });

    it("should return an error for invalid input", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const todo = {
        description: "Test Description",
        done: false,
      };
      const validationError = new Error("Validation Error");
      req.body = todo;
      createTodoValidationSchema.validate.mockReturnValue({
        error: validationError,
      });

      // Configurar el comportamiento de createTodoValidationSchema.validate antes de llamar a create
      expect(createTodoValidationSchema.validate).toHaveBeenCalledWith(todo);

      await create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: `The field:(${validationError.message}) `,
      });
    });
  });

  describe("getAll", () => {
    it("should get all todos", async () => {
      const todos = [
        {
          _id: "1",
          title: "Todo 1",
          description: "Description 1",
          done: false,
        },
        { _id: "2", title: "Todo 2", description: "Description 2", done: true },
      ];
      Todo.find.mockResolvedValue(todos);

      await getAll(req, res, next);

      expect(Todo.find).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(todos);
    });
  });

  describe("getById", () => {
    it("should get a todo by ID", async () => {
      const id = "5fd8bce0b801e441c8f9f6fb";
      const todo = {
        _id: id,
        title: "Test Todo",
        description: "Test Description",
        done: false,
      };
      req.params = { id };
      idParamSchema.validate.mockReturnValue({ error: undefined });
      Todo.findById.mockResolvedValue(todo);

      await getById(req, res, next);

      expect(idParamSchema.validate).toHaveBeenCalledWith({ id });
      expect(Todo.findById).toHaveBeenCalledWith({ _id: id });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(todo);
    });

    it("should return an error for invalid ID", async () => {
      const id = "invalidId";
      req.params = { id };
      idParamSchema.validate.mockReturnValue({
        error: new Error("Invalid ID"),
      });

      await getById(req, res, next);

      expect(idParamSchema.validate).toHaveBeenCalledWith({ id });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Id is not valid" });
    });
  });

  describe("updateById", () => {
    it("should update a todo by ID", async () => {
      const id = "5fd8bce0b801e441c8f9f6fb";
      const updatedTodo = {
        _id: id,
        title: "Updated Todo",
        description: "Updated Description",
        done: true,
      };
      req.params = { id };
      req.body = updatedTodo;
      idParamSchema.validate.mockReturnValue({ error: undefined });
      updateTodoValidationSchema.validate.mockReturnValue({ error: undefined });
      Todo.findByIdAndUpdate.mockResolvedValue(updatedTodo);

      await updateById(req, res, next);

      expect(idParamSchema.validate).toHaveBeenCalledWith({ id });
      expect(updateTodoValidationSchema.validate).toHaveBeenCalledWith(
        updatedTodo
      );
      expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith(id, updatedTodo, {
        new: true,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(updatedTodo);
    });

    it("should return an error for invalid ID or body", async () => {
      const id = "invalidId";
      const body = {
        title: "Updated Todo",
      };
      req.params = { id };
      req.body = body;
      idParamSchema.validate.mockReturnValue({
        error: new Error("Invalid ID"),
      });
      updateTodoValidationSchema.validate.mockReturnValue({
        error: new Error("Invalid Body"),
      });

      await updateById(req, res, next);

      expect(idParamSchema.validate).toHaveBeenCalledWith({ id });
      expect(updateTodoValidationSchema.validate).toHaveBeenCalledWith(body);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "ID: Error: Invalid ID",
      });
    });
  });

  describe("deleteById", () => {
    it("should delete a todo by ID", async () => {
      const id = "5fd8bce0b801e441c8f9f6fb";
      const deletedTodo = {
        _id: id,
        title: "Test Todo",
        description: "Test Description",
        done: false,
      };
      req.params = { id };
      idParamSchema.validate.mockReturnValue({ error: undefined });
      Todo.findByIdAndDelete.mockResolvedValue(deletedTodo);

      await deleteById(req, res, next);

      expect(idParamSchema.validate).toHaveBeenCalledWith({ id });
      expect(Todo.findByIdAndDelete).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(deletedTodo);
    });

    it("should return an error for invalid ID", async () => {
      const id = "invalidId";
      req.params = { id };
      idParamSchema.validate.mockReturnValue({
        error: new Error("Invalid ID"),
      });

      await deleteById(req, res, next);

      expect(idParamSchema.validate).toHaveBeenCalledWith({ id });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Id is not valid" });
    });
  });
});
