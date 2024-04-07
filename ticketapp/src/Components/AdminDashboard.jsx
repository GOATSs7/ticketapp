import { useState, useEffect } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [techSupportTeam, setTechSupportTeam] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTechSupportMember, setSelectedTechSupportMember] =
    useState("");
  const [userTickets, setUserTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(false);

  //get users
  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      const techSupportTeamMembers = userData.filter((user) =>
        user.username.startsWith("tech")
      );
      setTechSupportTeam(techSupportTeamMembers);
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  //get tech support team members
  // const fetchTechSupportTeamData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/users");
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch tech support team data");
  //     }
  //     const techSupportTeamData = await response.json();
  //     setTechSupportTeam(techSupportTeamData.startsWith("tech"));
  //   } catch (error) {
  //     console.error("Error fetching tech support team data:", error);
  //   }
  // };

  //get users tickets
  const fetchUserTickets = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/tickets?username=${selectedUser}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user tickets");
      }
      const userTicketsData = await response.json();
      setUserTickets(userTicketsData);
    } catch (error) {
      console.error("Error fetching user tickets:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    // fetchTechSupportTeamData();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchUserTickets();
    }
  }, [selectedUser]);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleTechSupportMemberChange = (techMember) => {
    setSelectedTechSupportMember(techMember);
  };

  //ticket closing
  const handleTicketClose = async (ticketId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/tickets/${ticketId}/close`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to close ticket");
      }
      // Update the user tickets after closing the ticket
      fetchUserTickets();
    } catch (error) {
      console.error("Error closing ticket:", error);
    }
  };

  //ticket resolving
  const handleTicketResolve = async (ticketId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/tickets/${ticketId}/resolve`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to resolve ticket");
      }
      // Update the user tickets after resolving the ticket
      fetchUserTickets();
    } catch (error) {
      console.error("Error resolving ticket:", error);
    }
  };

  //ticket assigning
  //handle ticket selection
  const handleTicketSelected = (ticketId) => {
    setSelectedTicket(ticketId === selectedTicket ? null : ticketId);
  };

  const handleTicketAssign = async () => {
    if (!selectedTicket) {
      console.error("Please select a ticket before assigning.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/tickets/${selectedTicket}/assign`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assignedTo: selectedTechSupportMember,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to assign ticket");
      }
      // Update the user tickets after assigning the ticket
      fetchUserTickets();
    } catch (error) {
      console.error("Error assigning ticket:", error);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="select-container">
        <h2 className="select-label">Users</h2>
        <select
          className="select"
          value={selectedUser}
          onChange={handleUserChange}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      <div className="select-container">
        <h2 className="select-label">Tech Support Team</h2>
        <select
          className="select"
          value={selectedTechSupportMember}
          onChange={(event) =>
            handleTechSupportMemberChange(event.target.value)
          }
        >
          <option value="">Select Tech Support Team Member</option>
          {techSupportTeam.map((member) => (
            <option key={member._id} value={member._id}>
              {member.username}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleTicketAssign}>Assign Ticket</button>
      <div>
        <h2>User Tickets</h2>
        <ul className="ticket-list">
          {userTickets.map((ticket) => (
            <li className="ticket-item" key={ticket._id}>
              <div className="ticket-details">
                <strong>Created By:</strong> {ticket.createdBy}
              </div>
              <div className="ticket-details">
                <strong>Title:</strong> {ticket.title}
              </div>
              <div className="ticket-details">
                <strong>Description:</strong> {ticket.description}
              </div>
              <div className="ticket-details">
                <strong>Attachment:</strong> {ticket.attachment}
              </div>
              <div className="ticket-details">
                <strong>Status:</strong> {ticket.status}
              </div>
              <div className="ticket-actions">
                <button
                  className="close"
                  onClick={() => handleTicketClose(ticket._id)}
                >
                  Close
                </button>
                <button
                  className="resolve"
                  onClick={() => handleTicketResolve(ticket._id)}
                >
                  Resolve
                </button>
                <input
                  type="checkbox"
                  name="ticketcheckbox"
                  id="checkbox"
                  defaultValue={false}
                  onClick={() => handleTicketSelected(ticket._id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
