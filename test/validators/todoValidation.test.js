const {
  createTodoValidationSchema,
  updateTodoValidationSchema,
  idParamSchema,
} = require("../../validators/todoValidation");

describe("Todo Validation", () => {
  describe("createTodoValidationSchema", () => {
    it("should validate a valid create todo request", () => {
      const validRequest = {
        title: "Test Title",
        description: "Test Description",
        done: true,
      };

      const { error } = createTodoValidationSchema.validate(validRequest);

      expect(error).toBeUndefined();
    });

    it("should return an error for missing required fields", () => {
      const invalidRequest = {
        description: "Test Description",
        done: true,
      };

      const { error } = createTodoValidationSchema.validate(invalidRequest);

      expect(error).toBeDefined();
    });
  });

  describe("updateTodoValidationSchema", () => {
    it("should validate a valid update todo request", () => {
      const validRequest = {
        title: "Test Title",
        description: "Test Description",
        done: true,
      };

      const { error } = updateTodoValidationSchema.validate(validRequest);

      expect(error).toBeUndefined();
    });

    it("should allow partial updates without required fields", () => {
      const validRequest = {
        title: "Test Title",
      };

      const { error } = updateTodoValidationSchema.validate(validRequest);

      expect(error).toBeUndefined();
    });
  });

  describe("idParamSchema", () => {
    it("should validate a valid ID parameter", () => {
      const validId = "5fd8bce0b801e441c8f9f6fb";

      const { error } = idParamSchema.validate({ id: validId });

      expect(error).toBeUndefined();
    });

    it("should return an error for an invalid ID parameter", () => {
      const invalidId = "invalidId";

      const { error } = idParamSchema.validate({ id: invalidId });

      expect(error).toBeDefined();
    });
  });
});
