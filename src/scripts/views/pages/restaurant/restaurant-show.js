class RestaurantShow {
    constructor({ view, restaurants }) {
        this._view = view;
        this._restaurants = restaurants;

        this._showRestaurants();
    }

    async _showRestaurants() {
        const restaurants = await this._restaurants.getAll();
        this._displayRestaurants(restaurants);
    }

    _displayRestaurants(restaurants) {
        if (restaurants.length <= 0) {
            return this._displayNoneRestaurants();
        }

        if (restaurants.data === undefined) {
            return this._view.showRestaurants(restaurants);
        }

        return this._view.showRestaurants(restaurants.data);
    }

    _displayNoneRestaurants() {
        return this._view._getEmptyTemplate();
    }
}

export default RestaurantShow;
