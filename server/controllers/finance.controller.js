import Finance from "../models/finance.model.js";

export const createFinance = async (req, res) => {
  try {
    const finance = new Finance({
      ...req.body,
      userId: req.user.id
    });
    const saved = await finance.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getFinance = async (req, res) => {
  try {
    const data = await Finance.find({ userId: req.user.id }).sort({ date: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateFinance = async (req, res) => {
  try {
    const finance = await Finance.findOne({ _id: req.params.id, userId: req.user.id });
    if (!finance) {
      return res.status(404).json({ error: "Finance record not found or unauthorized" });
    }
    
    const updated = await Finance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteFinance = async (req, res) => {
  try {
    const finance = await Finance.findOne({ _id: req.params.id, userId: req.user.id });
    if (!finance) {
      return res.status(404).json({ error: "Finance record not found or unauthorized" });
    }
    
    await Finance.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
