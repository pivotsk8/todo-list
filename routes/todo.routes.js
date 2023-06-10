const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

router.post("/", todoController.create);
router.get("/", todoController.getAll);
router.get("/:id", todoController.getById);
router.patch("/:id", todoController.updateById);
router.delete("/:id", todoController.deleteById);

module.exports = router;
