import dbConnect from '../../../lib/mongodb';
import SensorData from '../../../models/SensorLog';

export default async function handler(req, res) {
  const { method } = req;
  const { device_id } = req.query;

  await dbConnect();

  if (method === 'GET') {
    try {
      // Mengambil 1 data terbaru berdasarkan device_id
      const latestData = await SensorData.findOne({ device_id: device_id })
        .sort({ timestamp: -1 }); // Urutkan dari yang paling baru

      if (!latestData) {
        return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
      }

      return res.status(200).json({ 
        success: true, 
        data: latestData 
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}