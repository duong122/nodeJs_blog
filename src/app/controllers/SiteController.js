const Course = require('../models/Course')
const  { multipleMongooseToObject } = require('../../util/mongoose')

class SiteController {

    // [Get] /
    index (req, res, next) {
        Course.find()
            .then( courses => {
                res.render('home', { 
                    courses: multipleMongooseToObject(courses)
                })
                console.log('courses: ', courses)
            })
            .catch(next)
    }

    // [Get] /search
    search (req, res) {
        res.render('search')
    }

}

module.exports = new SiteController()