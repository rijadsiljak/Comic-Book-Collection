const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Comic = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   designation: {
      type: String
   },
   phoneNumber: {
      type: Number
   }
}, {
   collection: 'comics'
})
module.exports = mongoose.model('Comic', Comic)