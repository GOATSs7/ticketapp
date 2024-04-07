import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./TicketCrud.css";
const TicketCrud = () => {
  const [tickets, setTickets] = useState([]);
  const location = useLocation();
  const { username } = location.state;

  useEffect(() => {
    // Fetch user's tickets from backend API
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/tickets?username=${username}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

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
      // Update the tickets list after closing the ticket
      fetchTickets();
    } catch (error) {
      console.error("Error closing ticket:", error);
    }
  };

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
      // Update the tickets list after resolving the ticket
      fetchTickets();
    } catch (error) {
      console.error("Error resolving ticket:", error);
    }
  };

  // handle delete
  const handleTicketDelete = async (ticketId) => {
    //handling delete ticket

    try {
      const response = await fetch(
        `http://localhost:3000/tickets/${ticketId}/delete`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to resolve ticket");
      }
      fetchTickets();
    } catch (error) {
      console.log("error :", error);
    }
  };

  return (
    <div className="ticket-container">
      <h2>Your Tickets</h2>
      {tickets.length > 0 ? (
        <ul className="ticket-list">
          {tickets.map((ticket) => (
            <li className="ticket-item" key={ticket._id}>
              <div className="ticket-details">
                <strong>Title:</strong> {ticket.title}
              </div>
              <div className="ticket-details">
                <strong>Description:</strong> {ticket.description}
              </div>
              <div className="ticket-details">
                <strong>Attached file Link:</strong> {ticket.attachment}
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
                  className="delete"
                  onClick={() => handleTicketDelete(ticket._id)}
                >
                  Delete
                </button>

                <button
                  className="resolve"
                  onClick={() => handleTicketResolve(ticket._id)}
                >
                  Resolve
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tickets found</p>
      )}
    </div>
  );
};

export default TicketCrud;
