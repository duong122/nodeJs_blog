const Course = require('../models/Course')
const  { mongoseToObject } = require('../../util/mongoose')
const { options } = require('../../routes/courses')

class CourseController {

    // [Patch] /courses/:id/restore
    restore(req, res, next) { 
        Course.restoreOne({ _id: req.params.id })
            .then(() => res.redirect(req.get("Referrer") || "/"))
            .catch(next)
    }

    // [Delete] /course/:id/force
    forceDestroy(req, res, next) {
        Course.deleteMany({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch((err) => { console.log('error: ', err)})
    }

    // [Delete] /courses/:id 
    destroy(req, res, next) {
        Course.deleteOne( { _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

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
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/maxresdefault.jpg`
        const course = new Course(req.body)
        // console.log(formData)
        course.save()
            .then(() => res.redirect('/me/stored/courses')) 
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
