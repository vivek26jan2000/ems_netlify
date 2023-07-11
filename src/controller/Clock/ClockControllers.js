const Clock = require("../../model/Clock/ClockModel");
const moment = require("moment");

const clockIn = async (req, res, next) => {
  try {
    const { employeeId } = req.body;

    // const today = moment("2023-06-20", "YYYY-MM-DD").startOf("day");
    const today = moment();

    // Find the clocks document for the employeeId
    let clocks = await Clock.find({ employeeId });

    let clock = clocks.find((clock) =>
      today.isSame(moment(clock.todayDate), "day")
    );

    if (clock) {
      // Check if there is an active check-in already
      if (clock.clockStatus) {
        return res.status(400).json({ message: "Already checked in" });
      } else {
        // Update the existing clock document for re-check-in
        clock.clockStatus = true;
        clock.checkIns.push({
          clockInTime: new Date(),
        });
      }
    } else {
      // Create a new clock document for the employee
      clock = new Clock({
        employeeId,
        clockStatus: true,
        checkIns: [
          {
            clockInTime: new Date(),
          },
        ],
        todayDate: today.toDate(),
      });
    }

    // Save the clock document
    await clock.save();

    res.status(200).json({ message: "Check-in successful" });
  } catch (error) {
    console.error("Error during check-in:", error);
    res.status(500).json({ message: "Check-in failed" });
  }
};

const clockOut = async (req, res, next) => {
  try {
    const { employeeId } = req.body;

    const today = moment();
    // const today = moment("2023-06-20", "YYYY-MM-DD").startOf("day");

    // Find the clocks document for the employeeId
    let clocks = await Clock.find({ employeeId });

    let clock = clocks.find((clock) =>
      today.isSame(moment(clock.todayDate), "day")
    );

    if (!clock) {
      return res.status(404).json({ message: "Clock entry not found" });
    }

    // Check if the employee is already checked out
    if (!clock.clockStatus) {
      return res.status(400).json({ message: "Already checked out" });
    }

    // Update the latest check-in entry with the check-out time
    const latestCheckIn = clock.checkIns[clock.checkIns.length - 1];
    latestCheckIn.clockOutTime = new Date();

    // Get the check-in and check-out timestamps
    const checkInTime = moment(latestCheckIn.clockInTime);
    const checkOutTime = moment(latestCheckIn.clockOutTime);

    // Calculate the time difference in milliseconds
    const timeDifferenceMs = checkOutTime.diff(checkInTime);

    // Calculate the time difference in hours, minutes, and seconds
    const duration = moment.duration(timeDifferenceMs);
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    // Update the clockStatus
    clock.clockStatus = false;

    // Save the clock document
    await clock.save();

    res.status(200).json({
      message: "Check-out successful",
      time: {
        hours,
        minutes,
        seconds,
      },
    });
  } catch (error) {
    console.error("Error during check-out:", error);
    res.status(500).json({ message: "Check-out failed" });
  }
};

// GET all clocks
const getAllClocks = async (req, res, next) => {
  try {
    const clocks = await Clock.find({});

    if (!clocks)
      return res.status(404).json({ message: "No Clock Found In Database" });

    res.status(200).json({
      success: true,
      data: {
        clocks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the clock of one employee by the given employeeID
const getClockById = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    const clock = await Clock.find({ employeeId: employeeId });

    if (!clock)
      return res
        .status(404)
        .json({ message: "no clock Found for the given EmployeeId" });

    res.status(200).json({
      success: true,
      data: { clock },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCurrentClockStatus = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    const today = moment().startOf("day");

    // Find the clocks document for the employeeId
    let clocks = await Clock.find({ employeeId });

    let clock = clocks.find((clock) =>
      today.isSame(moment(clock.todayDate), "day")
    );

    if (!clock) {
      return res.status(404).json({ message: "Clock entry not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        clockStatus: clock.clockStatus,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  clockIn,
  clockOut,
  getClockById,
  getAllClocks,
  getCurrentClockStatus,
};
