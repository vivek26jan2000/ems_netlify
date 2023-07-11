// @flow
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// components
import Statistics from "./Statistics";
import { useSelector } from "react-redux";
import SummaryRequest from "../../APIRequest/SummaryRequest";
import LeaveChart from "./LeaveChart";

import { GetEmployeeLeavesAction } from "../../utils/action";

const localizer = momentLocalizer(moment);

const EmployeeDashboard = () => {
  const { t } = useTranslation();

  const [leaveEvents, setLeaveEvents] = useState([]);

  // get the login user
  const { UserDetails } = useSelector((state) => state.User);

  useEffect(() => {
    // get  all leave details of the user
    const getEmployeeLeave = async () => {
      if (UserDetails) {
        const { data } = await GetEmployeeLeavesAction(UserDetails?._id);

        if (data) {
          // filter only approved leaves by both admin & hod
          const approvedLeaves = data.filter(
            (leave) =>
              leave.HodStatus === "Approved" && leave.AdminStatus === "Approved"
          );

          const events = approvedLeaves.map((leave) => {
            return {
              title: "Vacation",
              start: new Date(leave.StartLeaveDate),
              end: new Date(leave.EndLeaveDate),
            };
          });
          setLeaveEvents(events);
        }
      }
    };
    getEmployeeLeave();
  }, [UserDetails]);

  useEffect(() => {
    SummaryRequest.DashboardSummaryEmployee();
  }, []);

  const { SummaryLists, TotalSummary } = useSelector((state) => state.Summary);

  return (
    <>
      <Row>
        <Col xs={12}>
          <div className="page-title-box">
            <div className="page-title-right"></div>
            <h4 className="page-title"> {t("Dashboard")}</h4>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <LeaveChart summaryLists={SummaryLists} />
        </Col>
      </Row>

      <div>
        <Calendar
          localizer={localizer}
          events={leaveEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
        />
      </div>
    </>
  );
};

export default EmployeeDashboard;
