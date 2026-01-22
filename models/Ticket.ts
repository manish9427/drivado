import { Schema, model, models } from "mongoose";

const TicketSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved"],
      default: "open",
    },
    priority: { type: Number, min: 1, max: 5, required: true },
    assignee: { type: String },
  },
  { timestamps: true }
);

export const Ticket = models.Ticket || model("Ticket", TicketSchema);
