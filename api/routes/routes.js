const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controller");
const motocycleController = require("../controllers/motorcycles.controller");
const trackingController = require("../controllers/tracking.controller");
const authController = require("../controllers/auth.controller");
const rolesController = require("../controllers/roles.controller");

router.get("/api/v1", (request, response) => {
  response.send("Api el-taller");
});

/**
 * ENDPOINTS
 */

router
  .post("/api/v1/login", authController.loginUser)
  .use("/", authController.middleware)
  .get("/api/v1/valid", authController.validToken)
  .get("/api/v1/users", userController.getUsers)
  .post("/api/v1/users", userController.saveUser)
  .put("/api/v1/users/:id", userController.updateUser)
  .delete("/api/v1/users/:id", userController.deleteUser)

  .get("/api/v1/motorcycles", motocycleController.getMotorcycles)
  .post("/api/v1/motorcycles", motocycleController.saveMotorcycle)
  .put("/api/v1/motorcycles/:id", motocycleController.updateMotorcycle)
  .delete("/api/v1/motorcycles/:id", motocycleController.deleteMotorcycle)

  .post("/api/v1/tracking", trackingController.saveTracking)
  .post("/api/v1/tracking/images", trackingController.saveImageTracking)

  .get("/api/v1/roles", rolesController.getAll)

  .use("/", authController.notFound);
module.exports = router;
