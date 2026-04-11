import connectDB from '../../lib/mongodb';
import SensorData from '../../models/SensorData';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      // Wokwi akan mengirim json: { "ph": 7.0, "temp": 28.5 }
      const { ph, temp } = req.body; 
      
      const newData = await SensorData.create({ 
        phValue: ph, 
        temperatureValue: temp 
      });
      
      return res.status(201).json({ success: true, data: newData });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'GET') {
    const data = await SensorData.find().sort({ timestamp: -1 });
    return res.status(200).json(data);
  }
}