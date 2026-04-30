// src/pages/api/auth/logout.js

export default function handler(req, res) {
  // Hanya menerima metode POST
  if (req.method === 'POST') {
    
    // Di sini Anda bisa menambahkan logika tambahan nanti, 
    // seperti mencatat waktu logout di database atau menghapus token.
    
    console.log("=== LOGOUT EVENT ===");
    console.log("Status: User successfully logged out");
    console.log("Timestamp:", new Date().toLocaleString());
    console.log("====================");

    return res.status(200).json({ 
      success: true, 
      message: "Logout logged successfully" 
    });
  }

  // Jika diakses selain POST
  return res.status(405).json({ message: "Method Not Allowed" });
}