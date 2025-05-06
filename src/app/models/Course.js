const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
var slug = require('mongoose-slug-updater');


mongoose.plugin(slug);

const Course = new Schema({
    name: {type: String, minLength: 1, require: true},
    description: {type: String, maxLength: 600},
    image: {type: String, maxLength: 255},
    videoId: {type: String, require: true},
    level: {type: String, maxLength: 255},
    slug: { type: String, slug: 'name', unique: true },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Course', Course);