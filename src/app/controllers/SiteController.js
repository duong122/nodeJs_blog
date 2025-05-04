const Course = require('../model/Course')
const  { multipleMongooseToObject } = require('../../util/mongoose')

class SiteController {

    // [Get] /
    index (req, res, next) {
        Course.find({})
            .then( courses => {
                res.render('home', { 
                    courses: multipleMongooseToObject(courses)
                })
            })
            .catch(next)
    }

    // [Get] /search
    search (req, res) {
        res.render('search')
    }

}

module.exports = new SiteController()