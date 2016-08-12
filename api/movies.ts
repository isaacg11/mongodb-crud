import express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//model
let Movie = mongoose.model('Movie', {
  title: String,
  genre: String,
  date_created: Date,
  date_deleted: {
    type: Date,
    default: null
  }
});

// create static list of movies
let movies = [
   {id:1, title:"Star Wars", director:"Lucas" },
   {id:2, title:"The Martian", director:"Scott" },
   {id:3, title:"Ex Machina", director:"Garland" },
   {id:4, title:"Superman", director:"Donner" },
   {id:5, title:"Shrek", director:"Adamson" }

];
// unique movie id
let movieId = movies.length;

/* GET movies */
router.get('/movies', function(req, res, next) {
  Movie.find({date_deleted: null}).then((movies) => {
    res.json(movies);
  })
});

/* GET movie by id */
router.get('/movies/:id', function(req, res, next) {
  let id = parseInt(req.params['id']);
  let movie = findMovie(id);
  if (movie) {
    res.json(movie);
  } else {
    res.sendStatus(404);
  }
});

/* Post to create or update movie */
router.post('/movies', function(req, res, next) {
  if(req.body.id === undefined) {
    let new_movie = new Movie({
      title: req.body.title,
      genre: req.body.genre,
      date_created: new Date()
    });

    new_movie.save((err, res) => {
      if(err) {
        console.log(err);
      } else {
        console.log(res);
      }
    })
  }
  else {
    Movie.findByIdAndUpdate(req.body.id, { $set: {title: req.body.title, genre: req.body.genre}}, (err, res) => {
      if(err) {
        console.log(err);
      } else {
        console.log(res);
      }
    })
  }
  res.sendStatus(200);
});

/* delete movie by id */
router.delete('/movies/:id', function(req, res, next) {
  let id = req.params['id'];
  Movie.findByIdAndUpdate(id, { $set: {date_deleted: new Date()}}, (err, res) => {
    if(err) {
      console.log(err);
    } else {
      console.log(res);
    }
  })
  res.sendStatus(200);
});

/* find matching movies */
router.get('/movies/search/:search', function(req, res, next) {
    let search = req.params['search'];
    let matches = movies.filter((movie)=>{
      return movie.title.indexOf(search) == 0;
    });
    res.json(matches);
});

function findMovie(id:number) {
  let matches = movies.filter((movie) => {
    return movie.id == id;
  });
  return matches.length ? matches[0] : null;
}

export = router;
