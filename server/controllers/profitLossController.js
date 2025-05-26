import ProfitLoss from '../models/ProfitLoss.js';

// Get all records
export const getProfitLossRecords = async (req, res) => {
  try {
    const records = await ProfitLoss.find({ userId: req.user.id }).sort({ period: 1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new record
export const addProfitLossRecord = async (req, res) => {
  try {
    const { period, profitOrLoss } = req.body;
    const newRecord = new ProfitLoss({ 
      period, 
      profitOrLoss,
      userId: req.user.id 
    });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a record
export const updateProfitLossRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { period, profitOrLoss } = req.body;
    
    // Check if record exists and belongs to user
    const record = await ProfitLoss.findOne({ _id: id, userId: req.user.id });
    if (!record) {
      return res.status(404).json({ message: 'Record not found or unauthorized' });
    }
    
    const updated = await ProfitLoss.findByIdAndUpdate(
      id, 
      { period, profitOrLoss }, 
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a record
export const deleteProfitLossRecord = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if record exists and belongs to user
    const record = await ProfitLoss.findOne({ _id: id, userId: req.user.id });
    if (!record) {
      return res.status(404).json({ message: 'Record not found or unauthorized' });
    }
    
    await ProfitLoss.findByIdAndDelete(id);
    res.json({ message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
