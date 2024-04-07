import { useLocation } from "react-router-dom";
import Ticket from "./Ticket";
import TicketCrud from "./TicketCrud";
import "./UserDashboard.css";
const UserDashboard = () => {
  const location = useLocation();
  const { username } = location.state;

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      <div className="user-info">
        <p>
          <strong>Username:</strong> {username}
        </p>
      </div>

      <div className="ticket-container">
        <TicketCrud username={username} />
        <Ticket username={username} />
      </div>
    </div>
  );
};

export default UserDashboard;
