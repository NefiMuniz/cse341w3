const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  class: { type: String, enum: ['EC3', 'PC101', 'PC102', 'PC103'], required: true },
  day: { type: String, enum: ['tuesday', 'wednesday', 'thursday', 'saturday'], required: true },
  zoomLink: { type: String, required: true },
  zoomPass: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Missionary', required: true },
});

module.exports = mongoose.model('Class', classSchema);