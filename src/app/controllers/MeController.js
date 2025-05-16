const Course = require('../models/Course')
const  { multipleMongooseToObject } = require('../../util/mongoose')

class MeController {

    // [Get] /me/trash/courses
    trashCourses (req, res, next) { 

        Course.find().onlyDeleted()
            .then(courses => {
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses)
                })
                // console.log(multipleMongooseToObject(courses))
            })
            .catch(next)
    }

    // [Get] /me/stored/courses
    storedCourses (req, res, next) {
        Promise.all([Course.countDocuments().onlyDeleted(), Course.find({})])
            .then(([deletedCount, courses]) => 
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses)
            }))
            .catch(next)
    }

}

module.exports = new MeController()
