const Missionary = require('../models/Missionary');
const Class = require('../models/Class');

const getAllMissionaries = async (req, res) => {
  try {
    const missionaries = await Missionary.find();
    res.status(200).json(missionaries);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

const getMissionaryById = async (req, res) => {
  try {
    const missionary = await Missionary.findById(req.params.id);
    if (!missionary) {
      return res.status(404).json({ message: 'Missionary not found' });
    }
    res.status(200).json(missionary);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

const createMissionary = async (req, res) => {
  try {
  const { _id, ...data } = req.body;
  const missionary = new Missionary(data);
  
  // const missionary = new Missionary(req.body);
    await missionary.save();
    res.status(201).json(missionary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMissionary = async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    const { id } = req.params;

    if (updateData.gender) {
      updateData.pretitle = updateData.gender === 'M' ? 'Elder' : 'Sister';
    }

    const missionary = await Missionary.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    
    if (!missionary) {
      return res.status(404).json({ message: 'Missionary not found' });
    }
    
    res.status(200).json({ message: 'Missionary updated' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteMissionary = async (req, res) => {
  try {
    const assignedClasses = await Class.find({ assignedTo: req.params.id });
    if (assignedClasses.length > 0) {
      return res.status(400).json({ message: 'Cannot delete, missionary assigned to a class' });
    }

    const missionary = await Missionary.findByIdAndDelete(req.params.id);
    if (!missionary) {
      return res.status(404).json({ message: 'Missionary not found' });
    }
    res.status(200).json({ message: 'Missionary deleted succesfully' })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMissionaries,
  getMissionaryById,
  createMissionary,
  updateMissionary,
  deleteMissionary,
};