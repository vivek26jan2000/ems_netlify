//External Lib Import
const { model, Schema } = require("mongoose");

const DepartmentSchema = new Schema(
  {
    DepartmentName: {
      type: String,
    },
    DepartmentShortName: {
      type: String,
    },
    DepartmentDetails: {
      type: String,
    },
    DepartmentStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const DepartmentModel = new model("Department", DepartmentSchema);
module.exports = DepartmentModel;
