import dbConnect from '../../../lib/mongodb';
import Tank from '../../../models/Tank';

export default async function handler(req, res) {
  const { method } = req;
  const { user_id } = req.query;

  await dbConnect();

  if (method === 'GET') {
    try {
      // Mencari semua tank yang dimiliki oleh user_id tertentu
      const tanks = await Tank.find({ user_id: user_id });
      
      return res.status(200).json({ 
        success: true, 
        data: tanks 
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}