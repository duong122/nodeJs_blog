const Course = require('../models/Course')
const  { mongoseToObject } = require('../../util/mongoose')
const { options } = require('../../routes/courses')

class CourseController {

    //[Put] /courses/:id
    update(req, res, next) {
       Course.findById(req.params.id).updateOne(req.body)
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next)
    }

    //[Get] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongoseToObject(course)
            }))
            .catch(next)
    }

    // [Get] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [Post] /courses/store
    store(req, res, next) {
        // res.send(req.body)
        var formData = req.body
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/maxresdefault.jpg`
        const course = new Course(formData)
        console.log(formData)
        course.save()
            .then(() => res.redirect('/')) 
            .catch(next)
    }

    // [Get] /courses/:slug
    show (req, res, next) {
        Course.findOne({ slug: req.params.slug})
            .then(course => {
                res.render('courses/show', {
                    course: mongoseToObject(course)
                })
            })
            .catch(next)
    }

}

module.exports = new CourseController()