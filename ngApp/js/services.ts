namespace app.Services {
  export class MovieService {
    public MovieResource;

    constructor(
      private $resource: ng.resource.IResourceService
    ) {
      this.MovieResource = $resource('/api/movies/:id');
    }

    public save(movie) {
      return this.MovieResource.save(movie).$promise;
    }
  }
  angular.module('app').service('movieService', MovieService);
}