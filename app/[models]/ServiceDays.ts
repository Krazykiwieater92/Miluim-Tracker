import mongoose, { Schema, Document, Model } from "mongoose";

const ServiceDaySchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  open: {
    type: Boolean,
    default: true,
    required: false,
  },
  name: {
    type: String,
    default: "Unnamed Service",
    minlength: 3,
    maxlength: 50,
    required: false,
  },
  totalDays: {
    type: Number,
    required: false,
  },
});
export default mongoose.models.ServiceDay ||
  mongoose.model("ServiceDay", ServiceDaySchema);
