const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controller");
const motocycleController = require("../controllers/motorcycles.controller");

router.get("/api/v1", (request, response) => {
  response.send("Hola Mundo");
});

router
  .get("/api/v1/users", userController.getUsers)
  .post("/api/v1/users", userController.saveUser)
  .put("/api/v1/users/:id", userController.updateUser)
  .delete("/api/v1/users/:id", userController.deleteUser)

  .get("/api/v1/motorcycle", motocycleController.getMotorcycles)
  .post("/api/v1/motorcycle", motocycleController.saveMotorcycle)
  .put("/api/v1/motorcycle/:id", motocycleController.updateMotorcycle)
  .delete("/api/v1/motorcycle/:id", motocycleController.deleteMotorcycle);

module.exports = router;
