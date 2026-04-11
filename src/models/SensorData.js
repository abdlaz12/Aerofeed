import mongoose from 'mongoose';

const SensorSchema = new mongoose.Schema({
  phValue: {
    type: Number,
    required: true,
  },
  temperatureValue: { // Mengganti turbiditas menjadi suhu
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const SensorData = mongoose.models.SensorData || mongoose.model('SensorData', SensorSchema);
export default SensorData;