import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await connectDB();
    const { full_name, email, password, phone_number } = req.body;

    // 1. Validasi input sederhana
    if (!full_name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Data tidak lengkap.' });
    }

    // 2. Cek apakah email sudah terdaftar
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email sudah digunakan.' });
    }

    // 3. Hashing Password menggunakan Bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Simpan User Baru dengan Password yang sudah di-hash
    const newUser = await User.create({
      full_name,
      email,
      phone_number,
      password: hashedPassword
    });

    return res.status(201).json({ 
      success: true, 
      message: 'Registrasi berhasil!' 
    });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}