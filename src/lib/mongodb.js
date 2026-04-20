// #testing untuk apakah bisa push langsung

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Silakan definisikan MONGODB_URI di dalam .env.local');
}

/** * Global digunakan untuk menjaga koneksi tetap bertahan 
 * saat fitur hot-reload Next.js aktif di mode development.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Terhubung ke MongoDB Atlas");
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
console.log("CEK ENV:", process.env.MONGODB_URI ? "ADA ISI" : "KOSONG/UNDEFINED");

export default connectDB;