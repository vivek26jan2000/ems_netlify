// const API_URL = "https://emsv2.onrender.com/api/v1";
// const API_URL = "https://emsv2.onrender.com/api/v1";
const API_URL = "http://localhost:8080/api/v1";

export const GetEmployeeLeavesUrl = (id) => {
  return API_URL + `/Employee/EmployeeLeaves/${id}`;
};
export const UpdatePayrollStatusUrl = () => {
  return API_URL + "/Employee/UpdatePayrollStatus";
};

export const GetPayrollDetailsUrl = () => {
  return API_URL + "/Employee/payrollDetails";
};

export const GetEmployeeAttendenceUrl = (employeeId) => {
  return API_URL + `/Clock/${employeeId}`;
};
export const CheckInUrl = () => {
  return API_URL + "/Clock/Clock/in";
};
export const CheckOutUrl = () => {
  return API_URL + "/Clock/Clock/out";
};
export const GetCurrentClockStatusUrl = (employeeId) => {
  return API_URL + `/Clock/ClockStatus/${employeeId}`;
};
