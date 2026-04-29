import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Nantinya harus di-hash
  phone_number: { type: String },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);