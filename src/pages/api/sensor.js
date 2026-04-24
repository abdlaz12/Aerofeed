import connectDB from '../../lib/mongodb';
import Tank from '../../models/Tank';
import SensorLog from '../../models/SensorLog';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
    try {
      // Wokwi mengirim: { "device_id": "AF-AQU-001", "ph": 7.0, "temp": 28.5 }
      const { device_id, ph, temp } = req.body; 
      
      // Cari tank_id berdasarkan device_id yang dikirim Wokwi
      const tank = await Tank.findOne({ device_id });
      if (!tank) return res.status(404).json({ success: false, message: 'Device not registered' });

      const newData = await SensorLog.create({ 
        tank_id: tank._id, // Hubungkan log ke tank yang benar
        ph: ph, 
        temp: temp,
        timestamp: new Date()
      });
      
      return res.status(201).json({ success: true, data: newData });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === 'GET') {
    // Digunakan Dashboard untuk ambil data terbaru
    // Tambahkan filter query jika ingin mengambil data tank tertentu, misal: ?tank_id=...
    const { device_id } = req.query;

    let filter = {};

    if (device_id) {
      const tank = await Tank.findOne({ device_id });
      if (tank) {
        filter = { tank_id: tank._id };
      }
    }
    
    const data = await SensorLog.find(filter).sort({ timestamp: -1 }).limit(10);
    return res.status(200).json(data);
  }
}