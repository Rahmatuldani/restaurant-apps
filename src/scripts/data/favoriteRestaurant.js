import { openDB } from 'idb';
import CONFIG from '../global/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(database) {
        database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
    },
});

const FavoriteRestaurant = {
    async getRestaurant(id) {
        if (!id) {
            return;
        }

        // eslint-disable-next-line consistent-return
        return (await dbPromise).get(OBJECT_STORE_NAME, id);
    },

    async getAll() {
        return (await dbPromise).getAll(OBJECT_STORE_NAME);
    },

    async putRestaurant(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
        if (!restaurant.hasOwnProperty('id')) {
            return;
        }

        // eslint-disable-next-line consistent-return
        return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
    },

    async deleteRestaurant(id) {
        return (await dbPromise).delete(OBJECT_STORE_NAME, id);
    },

    async searchRestaurants(query) {
        const data = await this.getAll();

        // eslint-disable-next-line max-len
        return data.filter((restaurant) => restaurant.name.toLowerCase().includes(query.toLowerCase()));
    },
};

export default FavoriteRestaurant;
