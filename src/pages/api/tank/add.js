import connectDB from '../../../lib/mongodb';
import Tank from '../../../models/Tank';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  try {
    await connectDB();
    const { user_id, device_id, name, fish_species } = req.body;

    // Validasi apakah Device ID sudah terdaftar (harus unik global)
    const deviceExists = await Tank.findOne({ device_id: device_id.toUpperCase() });
    if (deviceExists) {
      return res.status(400).json({ success: false, message: 'Device ID ini sudah terdaftar di sistem.' });
    }

    const newTank = await Tank.create({
      user_id,
      device_id: device_id.toUpperCase(),
      name,
      fish_species,
      // Default parameter awal (bisa diubah nanti)
      ph_min: 6.5,
      ph_max: 8.5,
      temp_min: 25,
      temp_max: 30
    });

    return res.status(201).json({ success: true, data: newTank });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}