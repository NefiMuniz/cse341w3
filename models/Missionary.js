const mongoose = require('mongoose');

const missionarySchema = new mongoose.Schema({
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

missionarySchema.pre('save', function (next) {
  this.pretitle = this.gender === 'M' ? 'Elder' : 'Sister';
  next();
});

missionarySchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.gender) {
    update.pretitle = update.gender === 'M' ? 'Elder' : 'Sister';
  }
  next();
});

module.exports = mongoose.model('Missionary', missionarySchema);