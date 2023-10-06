class RestaurantShow {
  constructor({ view, restaurants }) {
    this._view = view;
    this._restaurants = restaurants;

    this._showRestaurants();
  }

  async _showRestaurants() {
    const restaurants = await this._restaurants.getAll();
    this._displayRestaurants(restaurants.data);
  }

  _displayRestaurants(restaurants) {
    this._view.showRestaurants(restaurants);
  }
}

export default RestaurantShow;
