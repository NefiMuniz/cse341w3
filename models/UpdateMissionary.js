const mongoose = require('mongoose');

const updateMissionarySchema = new mongoose.Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  whatsapp: { type: String, required: true},
  gender: { type: String, enum: ['M', 'F'], required: true},
  pretitle: { type: String, default: function() {
    return this.gender === 'M' ? 'Elder' : 'Sister';
  }},
  englishFluent: { type: String, enum: ['Yes', 'No'], required: true},
  missionStart: { type: Date, required: true},
  missionEnd: { type: Date, required: true},
});

module.exports = mongoose.model('UpdateMissionary', updateMissionarySchema);