import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetEmployeeAttendenceAction } from "../../utils/action";
import { Alert } from "react-bootstrap";
import { Row, Col, Table } from "react-bootstrap";
import moment from "moment";

function calculateWorkingTime(checkIns) {
  let totalWorkingTime = 0;

  for (const checkIn of checkIns) {
    const clockInTime = moment(checkIn.clockInTime);
    const clockOutTime = moment(checkIn.clockOutTime);
    const duration = moment.duration(clockOutTime.diff(clockInTime));
    totalWorkingTime += duration.asMilliseconds();
  }

  const formattedWorkingTime = moment.utc(totalWorkingTime).format("HH:mm:ss");

  return formattedWorkingTime;
}

function calculateBreakTime(checkIns) {
  let totalBreakTime = 0;

  for (let i = 1; i < checkIns.length; i++) {
    const previousCheckOutTime = moment(checkIns[i - 1].clockOutTime);
    const currentCheckInTime = moment(checkIns[i].clockInTime);
    const breakDuration = moment.duration(
      currentCheckInTime.diff(previousCheckOutTime)
    );
    totalBreakTime += breakDuration.asMilliseconds();
  }

  const formattedBreakTime = moment.utc(totalBreakTime).format("HH:mm:ss");

  return formattedBreakTime;
}

const EmployeeAttendencePage = () => {
  const [attendences, setAttendences] = useState();
  const [error, setError] = useState(null);

  // get the login user
  const { UserDetails } = useSelector((state) => state.User);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await GetEmployeeAttendenceAction(UserDetails._id);

        if (data.success) {
          setAttendences(data.data.clock);
          setError(null);
        }
      } catch (error) {
        console.log(error, "frontend");
        setError(error.response.data.message);
      }
    };
    fetchData();
  }, [UserDetails._id]);

  return (
    <>
      {attendences?.length > 0 ? (
        <>
          <Row className="m-5">
            <Col>
              <Table striped hover bordered responsive className="table-sm">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Clock-In</th>
                    <th>Clock-Out</th>
                    <th>Duration</th>
                    <th>WorkingTime(Hour:Min:Sec)</th>
                    <th>BreakTime(Hour:Min:Sec)</th>
                  </tr>
                </thead>
                <tbody>
                  {attendences.map((attendence) => {
                    // format the date
                    const date = moment(attendence.todayDate);
                    const day = date.date();
                    const month = date.month() + 1; // Months are zero-based, so add 1
                    const year = date.year();

                    // claculate the clock-in time (in hour:min)
                    const checkInTime = moment(
                      attendence.checkIns[0].clockInTime
                    ).format("h:mm A");

                    // claculate the clock-out time (in hour:min)
                    const checkOutTime = moment(
                      attendence.checkIns[attendence.checkIns.length - 1]
                        .clockOutTime
                    ).format("h:mm A");

                    // calculating the total working time
                    let totalWorkingTime = calculateWorkingTime(
                      attendence.checkIns
                    );

                    // calculate the total break time
                    let totalBreakTime = calculateBreakTime(
                      attendence.checkIns
                    );
                    // Get the check-in and check-out timestamps
                    const checkInDurationTime = moment(
                      attendence.checkIns[0].clockInTime
                    );
                    const checkOutDurationTime = moment(
                      attendence.checkIns[attendence.checkIns.length - 1]
                        .clockOutTime
                    );

                    // Calculate the time difference in milliseconds
                    const timeDifferenceMs =
                      checkOutDurationTime.diff(checkInDurationTime);

                    // Calculate the time difference in hours, minutes, and seconds
                    const duration = moment.duration(timeDifferenceMs);
                    const hours = duration.hours();
                    const minutes = duration.minutes();
                    const seconds = duration.seconds();

                    return (
                      <tr key={attendence._id}>
                        <td>{`${day}/${month}/${year}`}</td>
                        <td>{checkInTime}</td>
                        <td>{checkOutTime}</td>
                        <td>{`${hours}h:${minutes}min:${seconds}sec`}</td>
                        <td>{totalWorkingTime}</td>
                        <td>{totalBreakTime}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      ) : error ? (
        <Alert variant="danger" className="my-4">
          {error}
        </Alert>
      ) : (
        <Alert variant="danger" className="my-4">
          No data Found
        </Alert>
      )}
    </>
  );
};

export default EmployeeAttendencePage;
