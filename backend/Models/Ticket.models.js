const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    attachment: String,
    createdBy: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["Open", "Closed", "Resolved"],

      default: "Open",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);
