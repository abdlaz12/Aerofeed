import mongoose from 'mongoose';

const TankSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  device_id: { 
    type: String, 
    required: true, 
    unique: true,
    uppercase: true, // Memastikan "wokwi-001" tersimpan sebagai "WOKWI-001"
    trim: true       // Menghapus spasi yang tidak sengaja terketik
  }, 
  name: { type: String, required: true },
  fish_species: { type: String },
  capacity_liter: { type: Number },
  ph_min: { type: Number, default: 6.5 },
  ph_max: { type: Number, default: 8.5 },
  temp_min: { type: Number, default: 25 },
  temp_max: { type: Number, default: 30 },
  last_ai_analysis: { type: String },
  last_ai_updated: { type: Date }
}, { 
  timestamps: true // Sudah benar, ini akan otomatis membuat createdAt & updatedAt
});

export default mongoose.models.Tank || mongoose.model('Tank', TankSchema);