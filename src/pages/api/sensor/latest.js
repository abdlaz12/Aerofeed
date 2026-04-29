// src/pages/api/sensor/latest.js
import dbConnect from '../../../lib/mongodb';
import SensorLog from '../../../models/SensorLog';
import Tank from '../../../models/Tank'; // Pastikan import model Tank

export default async function handler(req, res) {
  const { device_id } = req.query;
  await dbConnect();

  if (req.method === 'GET') {
    try {
      // 1. Cari tank berdasarkan device_id string (misal: AF-AQU-001)
      const tank = await Tank.findOne({ device_id: device_id.toUpperCase() });
      
      if (!tank) {
        return res.status(404).json({ success: false, message: "Tank tidak terdaftar" });
      }

      // 2. Cari log terbaru menggunakan tank._id (ObjectId)
      const latestData = await SensorLog.findOne({ tank_id: tank._id })
        .sort({ timestamp: -1 });

      if (!latestData) {
        return res.status(404).json({ success: false, message: "Belum ada data sensor" });
      }

      return res.status(200).json({ success: true, data: latestData });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}