class NewsController {
  // GET /news
  index(req, res) {
    res.render('news');
  }

  show(req, res) {
    res.send('NEWS DETAILS')
  }
  getIndex;
}

module.exports = new NewsController();
