namespace app.Controllers {
  export class HomeController {

    constructor() {

    }
  }

  export class AddMovieController {
    public movie;

    constructor(
      private movieService: app.Services.MovieService,
      private $state: ng.ui.IStateService
    ) {

    }

    public save() {
      let params = {
        title: this.movie.title,
        genre: this.movie.genre
      }

      this.movieService.save(params).then((res) => {
        this.$state.go('Home');
      })
    }
  }

  angular.module('app').controller('HomeController', HomeController);
}
