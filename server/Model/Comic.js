const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Comic = new Schema({
   name: {
      type: String
   },
   ordinal: {
      type: String
   },
   edition: {
      type: String
   },
   cover: {
      type: String
   },
   own: {
      type: Boolean
   }
}, {
   collection: 'comics'
})
module.exports = mongoose.model('Comic', Comic)