const mongoose = require('mongoose')


async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/f8_education_dev');
        console.log('Connect to MongoDB successfully !!!')
    } catch (error) {
        console.error('Connect to MongoDB Failed !!!')
    }
}

module.exports = { connect }
