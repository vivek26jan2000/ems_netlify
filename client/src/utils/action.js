import axios from "axios";

import {
  GetEmployeeLeavesUrl,
  GetEmployeeAttendenceUrl,
  CheckInUrl,
  CheckOutUrl,
  GetCurrentClockStatusUrl,
  UpdatePayrollStatusUrl,
  GetPayrollDetailsUrl,
} from "./api";

export const GetEmployeeLeavesAction = async (id) => {
  try {
    let data = await axios.get(GetEmployeeLeavesUrl(id));
    return data;
  } catch (error) {
    console.log("error is ", error);
  }
};
export const GetEmployeeAttendenceAction = async (employeeId) => {
  const res = await axios.get(GetEmployeeAttendenceUrl(employeeId));
  return res;
};
export const UpdatePayrollStatusAction = async (employeeId, PayrollStatus) => {
  const res = await axios.post(UpdatePayrollStatusUrl(), {
    id: employeeId,
    PayrollStatus,
  });
  return res;
};
export const GetPayrollDetailsAction = async () => {
  const res = await axios.get(GetPayrollDetailsUrl());
  return res;
};

export const CheckInAction = async (employeeId) => {
  const res = await axios.post(CheckInUrl(), {
    employeeId,
  });
  return res;
};
export const CheckOutAction = async (employeeId) => {
  const res = await axios.post(CheckOutUrl(), {
    employeeId,
  });
  return res;
};
export const GetCurrentClockStatusAction = async (employeeId) => {
  const res = await axios.get(GetCurrentClockStatusUrl(employeeId));
  return res;
};
