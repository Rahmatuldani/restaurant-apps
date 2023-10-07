class RestaurantShow {
  constructor({ view, restaurants }) {
    this._view = view;
    this._restaurants = restaurants;

    this._showRestaurants();
  }

  async _showRestaurants() {
    const restaurants = await this._restaurants.getAll();
    if (restaurants.length <= 0) {
      return this._displayNoneRestaurants();
    }

    if (restaurants.data === undefined) {
      return this._displayRestaurants(restaurants);
    }

    return this._displayRestaurants(restaurants.data);
  }

  _displayRestaurants(restaurants) {
    return this._view.showRestaurants(restaurants);
  }

  _displayNoneRestaurants() {
    return this._view._getEmptyTemplate();
  }
}

export default RestaurantShow;
