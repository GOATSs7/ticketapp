import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Ticket.css";

const Ticket = () => {
  const location = useLocation();
  const { username } = location.state;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState("");
  const [error, setError] = useState("");
  const [createdBy, setCreatedBy] = useState(username);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    setAttachment(e.target.value);
  };

  const handelcreater = (e) => {
    setCreatedBy(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          attachment,
          createdBy: username,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to raise ticket");
      }

      setTitle("");
      setDescription("");
      setAttachment("");
      setError("");
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="ticket-container">
      <h2>Raise a Ticket</h2>
      <form className="ticket-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="attachment">Attachment:</label>
          <input
            type="text"
            id="attachment"
            value={attachment}
            onChange={handleAttachmentChange}
          />
        </div>

        <div>
          <label htmlFor="createdby">Created by:</label>
          <input
            type="text"
            value={createdBy}
            onChange={handelcreater}
            readOnly
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Ticket;
