import React, { useEffect, useState } from "react";
import { GetPayrollDetailsAction } from "../../utils/action";

const Payroll = () => {
  const [payrollData, setPayrollData] = useState();

  useEffect(() => {
    const fetchPayrollDetails = async () => {
      try {
        const { data } = await GetPayrollDetailsAction();

        console.log(data);
        if (data.success) {
          setPayrollData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPayrollDetails();
  }, []);

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4 col-lg-12">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="font-weight-bold text-info">
                    ₹{payrollData?.totalPayroll}
                  </h2>
                  <p>Total Payroll</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-6">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="font-weight-bold text-secondary">
                    ₹{payrollData?.grossPayroll}
                  </h2>
                  <p>Gross Pay</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-6">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="font-weight-bold">
                    ₹{payrollData?.netPayroll}
                  </h2>
                  <p>Net Pay</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="font-weight-bold text-success">
                    {payrollData?.approvedPayroll}
                  </h2>
                  <p>Payroll Completed</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="font-weight-bold text-warning">
                    {payrollData?.pendingPayroll}
                  </h2>
                  <p>Payroll Pending</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="font-weight-bold text-danger">
                    ₹{payrollData?.totalTaxAmt}
                  </h2>
                  <p>Income Tax</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="font-weight-bold text-success">
                    {payrollData?.totalEmployees}
                  </h2>
                  <p>Active Employee</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card">
                <div className="card-body text-center">
                  <h2 className="font-weight-bold text-warning">₹50,000</h2>
                  <p>OverDues</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
