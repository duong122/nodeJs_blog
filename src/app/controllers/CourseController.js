const Course = require('../model/Course')
const  { mongoseToObject } = require('../../util/mongoose')

class CourseController {

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
        course.save()
            // .then(() => res.redirect(`/course/${}`)) Video 27 - 19:45

        // res.send('Saved successfully !!! ')
        res.redirect('/course/create')
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