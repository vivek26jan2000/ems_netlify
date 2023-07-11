const ClockRoutes = require("express").Router();
const ClockControllers = require("../controller/Clock/ClockControllers");

ClockRoutes.post("/Clock/in", ClockControllers.clockIn);
ClockRoutes.post("/Clock/out", ClockControllers.clockOut);

// get the current clock status
ClockRoutes.get(
  "/ClockStatus/:employeeId",
  ClockControllers.getCurrentClockStatus
);

ClockRoutes.get("/", ClockControllers.getAllClocks);
ClockRoutes.get("/:employeeId", ClockControllers.getClockById);

module.exports = ClockRoutes;
