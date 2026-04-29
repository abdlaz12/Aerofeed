import { useState } from 'react';
import { X, Cpu, Tag, Fish, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AddDeviceModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    device_id: '',
    name: '',
    fish_type: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Add New Device</h3>
                  <p className="text-slate-400 text-xs font-medium">Connect a new AeroFeed unit</p>
                </div>
                <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Device ID */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Device Serial ID</label>
                  <div className="relative group">
                    <Cpu className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-cyan-600 transition-colors" size={20} />
                    <input 
                      required
                      placeholder="e.g. AF-AQU-003"
                      value={formData.device_id}
                      onChange={(e) => setFormData({...formData, device_id: e.target.value})}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-cyan-100 transition-all text-sm font-bold"
                    />
                  </div>
                </div>

                {/* Tank Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tank Name</label>
                  <div className="relative group">
                    <Tag className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-cyan-600 transition-colors" size={20} />
                    <input 
                      required
                      placeholder="e.g. Aquarium Arwana Kaca"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-cyan-100 transition-all text-sm font-bold"
                    />
                  </div>
                </div>

                {/* Fish Type */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Fish Species</label>
                  <div className="relative group">
                    <Fish className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-cyan-600 transition-colors" size={20} />
                    <input 
                      required
                      placeholder="e.g. Ikan Arwana Silver"
                      value={formData.fish_type}
                      onChange={(e) => setFormData({...formData, fish_type: e.target.value})}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-cyan-100 transition-all text-sm font-bold"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full bg-cyan-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-100 mt-4 flex items-center justify-center gap-2">
                  Register Device <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}