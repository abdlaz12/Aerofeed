import mongoose from 'mongoose';

const SensorLogSchema = new mongoose.Schema({
  // Relasi ke tabel Tank
  tank_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tank', 
    required: true 
  },
  ph: { 
    type: Number, 
    required: true 
  },
  temp: { 
    type: Number, 
    required: true 
  },
  power_status: { 
    type: String, 
    enum: ['ON', 'OFF'], 
    default: 'ON' 
  },
  battery_pct: { 
    type: Number 
  },
  // Gunakan timestamp otomatis untuk pencatatan histori
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

// Export model, pastikan tidak membuat ulang jika sudah ada
export default mongoose.models.SensorLog || mongoose.model('SensorLog', SensorLogSchema);