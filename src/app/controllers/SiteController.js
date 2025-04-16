
class SiteController {

    // [Get] /
    index (req, res) {
        // res.JSON({
        //     name: 'test'
        // })

        res.render('home')
    }

    // [Get] /search
    search (req, res) {
        res.render('search')
    }
    
}

module.exports = new SiteController()