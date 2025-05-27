import mongoose from "mongoose";

const geoDistributionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  region: {
    type: String, // country code or name
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: false
  }
}, {
  timestamps: true
});

const GeoDistribution = mongoose.model("GeoDistribution", geoDistributionSchema);

export default GeoDistribution; 