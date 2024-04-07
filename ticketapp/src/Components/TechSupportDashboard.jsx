import { useState, useEffect } from "react";

const TechSupportDashboard = () => {
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [userTickets, setUserTickets] = useState([]);

  // Function to fetch user tickets
  const fetchUserTickets = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/tickets?assignedTo=${selectedUser}`
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

  // Function to handle user change
  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  // Effect to fetch user tickets when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      fetchUserTickets();
    }
  }, [selectedUser]);

  return (
    <div>
      <h1>Tech Support Dashboard</h1>
      <div>
        <h2>Assigned Users</h2>
        <select value={selectedUser} onChange={handleUserChange}>
          <option value="">Select User</option>
          {assignedUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>User Tickets</h2>
        <ul>
          {userTickets.map((ticket) => (
            <li key={ticket._id}>
              <p>
                <strong>Title:</strong> {ticket.title}
              </p>
              <p>
                <strong>Description:</strong> {ticket.description}
              </p>
              {/* Display other ticket information as needed */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TechSupportDashboard;
