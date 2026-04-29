import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  try {
    await connectDB();
    const { email, password } = req.body;

    // 1. Cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Email atau password salah.' });
    }

    // 2. Bandingkan password input dengan password terenkripsi di DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Email atau password salah.' });
    }

    // 3. Login Berhasil (Nantinya kamu bisa tambahkan JWT atau Session di sini)
    return res.status(200).json({ 
      success: true, 
      user: { id: user._id, name: user.full_name, email: user.email } 
    });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}