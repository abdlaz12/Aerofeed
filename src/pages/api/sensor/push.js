import connectDB from '../../../lib/mongodb';
import Tank from '../../../models/Tank';
import SensorLog from '../../../models/SensorLog';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Hanya menerima metode POST' });
  }

  try {
    await connectDB();

    const { device_id, ph, temp, power_status, battery_pct } = req.body;

    // 1. Cari Tank berdasarkan device_id
    const tank = await Tank.findOne({ device_id });

    if (!tank) {
      return res.status(404).json({ 
        success: false, 
        message: 'Device ID tidak terdaftar di sistem.' 
      });
    }

    // 2. Simpan Log Baru
    const newLog = await SensorLog.create({
      tank_id: tank._id,
      ph: parseFloat(ph),
      temp: parseFloat(temp),
      power_status: power_status || 'ON',
      battery_pct: parseInt(battery_pct) || 100
    });

    return res.status(201).json({ 
      success: true, 
      message: 'Data berhasil diterima',
      data: newLog 
    });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}