import mongoose from "mongoose";

const cardDetailsSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cardNumber: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CardDetails = mongoose.model("CardDetails", cardDetailsSchema);

export default CardDetails;