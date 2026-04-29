import { useState } from 'react';
import { X, Cpu, Tag, Fish, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AddDeviceModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({ device_id: '', name: '', fish_species: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem('user'));
    
    const res = await fetch('/api/tank/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, user_id: savedUser.id }),
    });
    
    const result = await res.json();
    if (result.success) {
      onAdd(result.data);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-8 rounded-[2rem] w-full max-w-md">
            <h2 className="text-xl font-black mb-4">Add New Device</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input placeholder="Device ID" className="w-full p-3 bg-slate-50 rounded-xl" onChange={e => setFormData({...formData, device_id: e.target.value})} />
              <input placeholder="Tank Name" className="w-full p-3 bg-slate-50 rounded-xl" onChange={e => setFormData({...formData, name: e.target.value})} />
              <button type="submit" className="w-full bg-cyan-600 text-white py-3 rounded-xl font-bold">Register</button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}