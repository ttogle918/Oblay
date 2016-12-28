var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  title: String,
  textbox: [String],
  images: [String],
  user: {type: Schema.Types.ObjectId, index: true},
  createdAt: {type: Date, default: Date.now},
  finalEditedAt: {type: Date, default: Date.now}
}, {
  toJSON: {
    virtuals: true,
    transform: function(panel) {
      return {
        id: panel._id.toString(),
        title: panel.title,
        textbox: panel.textbox,
        images: panel.images,
        finalEditedAt: (panel.finalEditedAt) ? moment(panel.finalEditedAt).format('YYYY-MM-DD') : "N/A",
      };
    }
  },
  toObject: {virtuals: true}
});

var Panel = mongoose.model('Panel', schema);

module.exports = Panel;
