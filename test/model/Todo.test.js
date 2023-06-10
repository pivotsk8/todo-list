const mongoose = require("mongoose");
const Todo = require("../../model/Todo");
require("dotenv").config();

describe("Todo Model", () => {
  beforeAll(async () => {
    // Establecer la conexión con la base de datos de prueba
    await mongoose.connect(process.env.CONNECTION_IN_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    expect.assertions(2);
    // Cerrar la conexión con la base de datos de prueba
    await mongoose.connection.close();
  });

  it("should create and save a new todo successfully", async () => {
    // Crear un nuevo objeto de todo
    const newTodo = new Todo({
      title: "Test Todo",
      description: "Test description",
      done: true,
    });

    // Guardar el nuevo todo en la base de datos
    const savedTodo = await newTodo.save();

    // Verificar que el todo se haya guardado correctamente
    expect(savedTodo._id).toBeDefined();
    expect(savedTodo.title).toBe("Test Todo");
  });

  it("should fail to save a todo with missing required fields", async () => {
    try {
      expect.assertions(1);
      // Crear un nuevo objeto de todo sin el campo "title" requerido
      const newTodo = new Todo({
        description: "Test description",
        done: true,
      });

      // Intentar guardar el nuevo todo en la base de datos
      await newTodo.save();
    } catch (error) {
      // Verificar que se haya producido un error debido a los campos faltantes
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }
  });
});
