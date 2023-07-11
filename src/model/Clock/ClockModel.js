const { model, Schema } = require("mongoose");

const clockSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    clockStatus: { type: Boolean, required: true },
    todayDate: { type: Date, default: Date.now, required: true },
    checkIns: [
      {
        clockInTime: { type: Date, default: Date.now, required: true },
        clockOutTime: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ClockModel = model("Clock", clockSchema);
module.exports = ClockModel;
