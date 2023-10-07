class RestaurantSearch {
  constructor({ view, restaurants }) {
    this._view = view;
    this._restaurants = restaurants;

    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchRestaurant(latestQuery);
    });
  }

  async _searchRestaurant(latestQuery) {
    this._latestQuery = latestQuery.trim();

    const foundRestaurants = await this._restaurants.searchRestaurants(this._latestQuery);

    if (foundRestaurants.data !== undefined) {
      if (foundRestaurants.data.length <= 0) {
        return this._showNotFoundRestaurants();
      }

      return this._showFoundRestaurants(foundRestaurants.data);
    }

    if (foundRestaurants.length <= 0) {
      return this._showNotFoundRestaurants();
    }

    return this._showFoundRestaurants(foundRestaurants);
  }

  _showFoundRestaurants(restaurants) {
    this._view.showRestaurants(restaurants);
  }

  _showNotFoundRestaurants() {
    this._view._getEmptyTemplate();
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default RestaurantSearch;
