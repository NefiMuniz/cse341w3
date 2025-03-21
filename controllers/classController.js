const Class = require('../models/Class');
const Missionary = require('../models/Missionary');

const checkMissionariesExist = async () => {
  const count = await Missionary.countDocuments();
  return count > 0;
};

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('assignedTo');
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id).populate('assignedTo');
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json(classItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createClass = async (req, res) => {
  try {
    const missionariesExist = await checkMissionariesExist();
    if (!missionariesExist) {
      return res.status(400).json({ message: 'Cannot create a class: No missionaries available'});
    }

    const newClass = new Class(req.body);
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateClass = async (req, res) => {
  try {
    const missionariesExist = await checkMissionariesExist();
    if (!missionariesExist) {
      return res.status(400).json({ message: 'Cannot update a class: No missionaries available' });
    }

    const classItem = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json({ message: 'Class successfully Updated' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteClass = async (req, res) => {
  try {
    const classItem = await Class.findByIdAndDelete(req.params.id);
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
};