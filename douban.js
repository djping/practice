const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

var es = function (selector) {
  return document.querySelectorAll(selector)
}
var log = function () {
  console.log.apply(console, arguments)
}

//根据URL获取网页
//获取 .item
//拆分所有的电影，实例化到对象
//把所有的对象写入文件

const Movie = function () {
  this.name = ''
  this.score = 0
  this.ranking = 0
  this.coverUrl = ''
  this.quote = ''
}

const movieFromDiv = function (div) {
  var movie = new Movie()
  const e = cheerio.load(div)
  movie.name = e('.title').text()
  movie.ranking = e('em').text()
  movie.score = e('.rating_num').text()
  movie.quote = e('.inq').text()
  movie.coverUrl = e('img').attr('src')

  log('movie-coverUrl', movie.coverUrl)
  return movie
}

const saveMovies = function (movies) {
  let file = JSON.stringify(movies, null, 2)
  fs.writeFile('douban.txt', file, function(err) {
    if (err) {
      log('***写入错误', err)
    } else {
      log('成功写入')
    }
  })
}

const downloadCoverImages = function (movies) {
  for (var i = 0; i < movies.length; i++) {
    let movie = movies[i] 
    let url = movie.coverUrl
    request(url).pipe(fs.createWriteStream(`${i}.jpg`))
  }
  
}

const movieFromUrl = function (url) {
  request(url, function(error, response, body) {
    if (error === null && response.statusCode === 200) {
      const movies = []
      // log(body)
      var e = cheerio.load(body)
      var movieDivs = e('.item')
      for (var i = 0; i < movieDivs.length; i++) {
        let element = movieDivs[i]
        let div = e(element).html()
        // log(div)
        let m = movieFromDiv(div)
        movies.push(m)
      }
      saveMovies(movies)
      downloadCoverImages(movies)
    }
  })
}

const main = function () {
  const url = 'https://movie.douban.com/top250'
  movieFromUrl(url)
}
main()
