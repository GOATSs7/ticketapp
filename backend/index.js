const express = require("express");
const { connectToMongoDB } = require("./connect");
const app = express();
const port = 3000;
const User = require("./Models/User.models.js");
const Ticket = require("./Models/Ticket.models.js");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes.js");

//cors
//db connection
connectToMongoDB("mongodb://localhost:27017/ticketapp").then(() =>
  console.log("Mongodb connected")
);

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

//admin will get all  users
app.get("/users", async (req, res) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (error) {
    console.log("error :", error);
  }
});

/// code for tickets req

app.post("/api/tickets", async (req, res) => {
  try {
    // Extract ticket data from the request body
    const { title, description, attachment, createdBy } = req.body;

    // Create a new ticket using the Ticket model
    const newTicket = new Ticket({
      title,
      description,
      attachment,
      createdBy,
    });

    // Save the ticket to the database
    await newTicket.save();

    // Return a success response
    res
      .status(201)
      .json({ message: "Ticket raised successfully", ticket: newTicket });
  } catch (error) {
    console.error("Error raising ticket:", error);
    // Return an error response
    res.status(500).json({ error: "Internal server error" });
  }
});

///

///

// tickets  close and view by user

// Fetch user's tickets
app.get("/tickets", async (req, res) => {
  try {
    const { username } = req.query;
    const tickets = await Ticket.find({ createdBy: username });
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Close ticket
app.put("/tickets/:id/close", async (req, res) => {
  try {
    const ticketId = req.params.id;

    // Find the ticket by ID
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    // Update the ticket status to "Closed"
    ticket.status = "Closed";
    await ticket.save();

    // Respond with success message
    res.json({ message: "Ticket closed successfully" });
  } catch (error) {
    console.error("Error closing ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Resolve ticket
app.put("/tickets/:id/resolve", async (req, res) => {
  try {
    const ticketId = req.params.id;
    await Ticket.findByIdAndUpdate(ticketId, { status: "Resolved" });
    res.json({ message: "Ticket resolved successfully" });
  } catch (error) {
    console.error("Error resolving ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

///ticket delete
app.delete("/tickets/:id/delete", async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findByIdAndDelete(ticketId);
    res.json({ message: "Ticket Deleted successfully" });
  } catch (error) {
    console.error("Error resolving ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//

//ticket assignment to tech support

app.put("/tickets/:id/assign", async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { assignedTo } = req.body;

    // Update the ticket with the assigned tech support team member
    await Ticket.findByIdAndUpdate(ticketId, { assignedTo });

    res.json({ message: "Ticket assigned successfully" });
  } catch (error) {
    console.error("Error assigning ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//

//for asssigned ticket
// Endpoint to fetch tickets assigned to a user
app.get("/assigned-tickets/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const tickets = await Ticket.find({ assignedTo: userId });
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching assigned tickets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//port listen
app.listen(port, () => {
  console.log(`App Running on port ${port}`);
});
