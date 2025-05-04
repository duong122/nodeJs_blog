module.exports = {
    multipleMongooseToObject: function(mongooses) {
        return mongooses.map(mongoose => mongoose.toObject())
    },
    mongoseToObject: function(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose
    }
}
