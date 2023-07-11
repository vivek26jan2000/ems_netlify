//Internal Lib Import
const mongoose = require("mongoose");

//Internal Lib Import
const EmployeeModel = require("../../model/Employee/EmployeeModel");
const LeaveModel = require("../../model/Leave/LeaveModel");
const OtpModel = require("../../model/Otps/OtpModel");
const EmployeeCreateService = require("../../services/Employee/EmployeeCreateService");
const EmployeeDetailsService = require("../../services/Employee/EmployeeDetailsService");
const EmployeeUpdateService = require("../../services/Employee/EmployeeUpdateService");
const EmployeePasswordChangeService = require("../../services/Employee/EmployeePasswordChangeService");
const EmployeeDeleteService = require("../../services/Employee/EmployeeDeleteService");
const VerifyRecoveryOtpService = require("../../services/Employee/VerifyRecoveryOtpService");
const SendRecoveryOtpService = require("../../services/Employee/SendRecoveryOtpService");
const RecoveryResetPassService = require("../../services/Employee/RecoveryResetPassService");
const DetailsService = require("../../services/Common/DetailsService");
const UpdateService = require("../../services/Common/UpdateService");
const DeleteService = require("../../services/Common/DeleteService");
const EmployeeListService = require("../../services/Employee/EmployeeListService");
const ListQueryService = require("../../services/Common/ListQueryService");
const ListQueryJoinService = require("../../services/Common/ListQueryJoinService");

/**
 * @desc Employee Create
 * @access private
 * @route /api/v1/Employee/EmployeeCreate
 * @methud GET
 */
const EmployeeCreate = async (req, res, next) => {
  try {
    const result = await EmployeeCreateService(req, EmployeeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Employee List
 * @access private
 * @route /api/v1/Employee/EmployeeList/:pageNumber/:perPage/:searchKeyword
 * @methud GET
 */

const EmployeeList = async (req, res, next) => {
  const searchKeyword = req.params.searchKeyword;
  let SearchRgx = { $regex: searchKeyword, $options: "i" };
  let SearchArray = [
    {
      FirstName: SearchRgx,
      LastName: SearchRgx,
      Gender: SearchRgx,
      Address: SearchRgx,
      Phone: SearchRgx,
      Email: SearchRgx,
    },
  ];

  try {
    const result = await EmployeeListService(req, EmployeeModel, SearchArray);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Employee Details
 * @access private
 * @route /api/v1/Employee/EmployeeDetails
 * @methud GET
 */
const EmployeeDetails = async (req, res, next) => {
  try {
    const result = await DetailsService(req, EmployeeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Update Employee
 * @access private
 * @route /api/v1/Employee/EmployeeUpdate
 * @methud PATCH
 */
const EmployeeUpdate = async (req, res, next) => {
  try {
    const result = await UpdateService(req, EmployeeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Profile Details
 * @access private
 * @route /api/v1/Profile/ProfileDetails
 * @methud GET
 */
const ProfileDetails = async (req, res, next) => {
  try {
    const result = await EmployeeDetailsService(req, EmployeeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Update Profile
 * @access private
 * @route /api/v1/Employee/ProfileUpdate
 * @methud PATCH
 */
const ProfileUpdate = async (req, res, next) => {
  try {
    const result = await EmployeeUpdateService(req, EmployeeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Employee Change Password
 * @access private
 * @route /api/v1/Employee/EmployeeChangePassword
 * @methud PUT
 */
const EmployeeChangePassword = async (req, res, next) => {
  try {
    const result = await EmployeePasswordChangeService(req, EmployeeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Employee Delete
 * @access private
 * @route /api/v1/Employee/EmployeeDelete
 * @methud DELETE
 */

const EmployeeDelete = async (req, res, next) => {
  try {
    const result = await DeleteService(req, EmployeeModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Send Recovery Otp
 * @access public
 * @route /api/v1/Employee/SendRecoveryOtp/:Email
 * @methud GET
 */

const SendRecoveryOtp = async (req, res, next) => {
  try {
    const result = await SendRecoveryOtpService(req, EmployeeModel, OtpModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Verify Recovary Otp
 * @access public
 * @route /api/v1/Employee/VerifyRecoveryOtp/:/Email/:OtpCode
 * @methud GET
 */

const VerifyRecoveryOtp = async (req, res, next) => {
  try {
    const result = await VerifyRecoveryOtpService(req, OtpModel);
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * @desc Recovery Reset Password
 * @access public
 * @route /api/v1/Employee/RecoveryResetPass/:Email/:OtpCode
 * @methud POST
 */

const RecoveryResetPass = async (req, res, next) => {
  try {
    const result = await RecoveryResetPassService(req, EmployeeModel, OtpModel);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc DepartmentHeads
 * @access private
 * @route /api/v1/Employee/DepartmentHeads
 * @methud GET
 */

const DepartmentHeads = async (req, res, next) => {
  try {
    const MatchQuery = {
      $match: {
        Roles: "HOD",
      },
    };

    const JoinStage = {
      $lookup: {
        from: "departments",
        localField: "DepartmentId",
        foreignField: "_id",
        as: "Department",
      },
    };

    const projection = {
      $project: {
        Department: {
          $first: "$Department.DepartmentShortName",
        },
        FirstName: 1,
        LastName: 1,
        Email: 1,
        Image: 1,
      },
    };

    const result = await ListQueryJoinService(
      req,
      EmployeeModel,
      MatchQuery,
      JoinStage,
      projection
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc StaffList
 * @access private
 * @route /api/v1/Employee/StaffList
 * @methud GET
 */

const StaffList = async (req, res, next) => {
  try {
    const MatchQuery = {
      $match: {
        Roles: "STAFF",
      },
    };

    const JoinStage = {
      $lookup: {
        from: "departments",
        localField: "DepartmentId",
        foreignField: "_id",
        as: "Department",
      },
    };

    const projection = {
      $project: {
        Department: {
          $first: "$Department.DepartmentShortName",
        },
        FirstName: 1,
        LastName: 1,
        Email: 1,
        Image: 1,
      },
    };

    const result = await ListQueryJoinService(
      req,
      EmployeeModel,
      MatchQuery,
      JoinStage,
      projection
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getEmployeeLeaves = async (req, res, next) => {
  try {
    const EmployeeLeaves = await LeaveModel.find({
      EmployeeId: req.params.id,
    });
    res.json(EmployeeLeaves);
  } catch (error) {
    next(error);
  }
};
const updatePayrollStatus = async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.body.id);

    if (!employee)
      return res.status(404).json({ message: "Employee not Found" });

    //  update the payroll status
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(req.body.id, {
      PayrollStatus: req.body.PayrollStatus,
    });

    res.status(200).json({
      success: true,
      message: "Employee PayrollStatus Updated Successfully",
      updatedEmployee,
    });
  } catch (error) {
    next(error);
  }
};

const getPayrollDetails = async (req, res, next) => {
  try {
    // find all the employee
    const employees = await EmployeeModel.find({}).select("-Image");

    // total employees
    const totalEmployees = employees.length;

    // total employees with payroll;
    const totalEmployeesWithPayroll = employees.filter(
      (emp) => emp.Payroll > 0
    ).length;

    // total employess without payroll;
    const totalEmployeeWithoutPayroll =
      totalEmployees - totalEmployeesWithPayroll;

    // payroll with Approved Status
    const approvedPayroll = employees.filter(
      (emp) => emp.PayrollStatus === "approved"
    ).length;
    // payroll with Pending Status
    const pendingPayroll = employees.filter(
      (emp) => emp.PayrollStatus === "pending"
    ).length;
    // payroll with Rejected Status
    const rejectedPayroll = employees.filter(
      (emp) => emp.PayrollStatus === "rejected"
    ).length;

    // total payroll of the employees
    const totalPayroll = employees
      .filter((emp) => emp.Payroll > 0)
      .reduce((acc, emp) => acc + emp.Payroll, 0);

    // total tax amount(18% of the totalPayroll)
    const totalTaxAmt = (totalPayroll * 18) / 100;

    // netPayroll (totalPayroll+taxAmt)
    const netPayroll = totalTaxAmt + totalPayroll;

    // Gross Payroll
    const grossPayroll = totalPayroll;

    res.status(200).json({
      success: true,
      totalEmployees,
      totalEmployeesWithPayroll,
      totalEmployeeWithoutPayroll,
      approvedPayroll,
      rejectedPayroll,
      pendingPayroll,
      totalPayroll,
      totalTaxAmt,
      netPayroll,
      grossPayroll,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  EmployeeCreate,
  EmployeeList,
  EmployeeDetails,
  ProfileDetails,
  ProfileUpdate,
  EmployeeChangePassword,
  EmployeeUpdate,
  EmployeeDelete,
  SendRecoveryOtp,
  VerifyRecoveryOtp,
  RecoveryResetPass,
  DepartmentHeads,
  StaffList,
  getEmployeeLeaves,
  updatePayrollStatus,
  getPayrollDetails,
};
