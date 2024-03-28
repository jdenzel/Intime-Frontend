import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function TimeSheet({ user }) {
  const [timeClocks, setTimeClocks] = useState([]);
//   const csrfToken = Cookies.get('csrftoken')

  useEffect(() => {
    axios
      .get("https://intime.applikuapp.com/timesheet", {
        // headers: {
        //   "X-CSRFToken": csrfToken,
        // },
        withCredentials: true,
      })
      .then((response) => {
        setTimeClocks(response.data);
      })
      .catch((error) => {
        console.error("Cannot get timeclocks", error);
      });
  }, []);

  return (
    <div>
      <h1>{user.username}'s Timeclocks</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Clock in time</th>
            <th scope="col">Clock out time</th>
            <th scope="col">Location</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {timeClocks.map((timeclock, index) => (
            <tr key={timeclock.id}>
              <th scope="row">{index + 1}</th>
              <td>{timeclock.date}</td>
              <td>{timeclock.clock_in_time}</td>
              <td>{timeclock.clock_out_time}</td>
              <td>{timeclock.location}</td>
              <td>{timeclock.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TimeSheet;
