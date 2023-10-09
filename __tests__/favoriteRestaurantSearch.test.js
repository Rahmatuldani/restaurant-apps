/* eslint-disable no-unused-vars */
import RestaurantSearch from '../src/scripts/views/pages/restaurant/restaurant-search';
import RestaurantView from '../src/scripts/views/pages/restaurant/restaurant-view';

describe('Searching restaurants', () => {
    let presenter;
    let favoriteRestaurants;
    let view;

    const searchRestaurants = (query) => {
        const queryElement = document.getElementById('query');
        queryElement.value = query;

        queryElement.dispatchEvent(new Event('keyup'));
    };

    const setRestaurantSearchContainer = () => {
        view = new RestaurantView();
        document.body.innerHTML = view.getTemplate();
    };

    const constructPresenter = () => {
        favoriteRestaurants = {
            getAll: jest.fn(),
            searchRestaurants: jest.fn(),
        };

        presenter = new RestaurantSearch({
            view,
            restaurants: favoriteRestaurants,
        });
    };

    beforeEach(() => {
        setRestaurantSearchContainer();
        constructPresenter();
    });

    describe('When query is not empty', () => {
        it('should be able to capture the query typed by the user', () => {
            favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

            searchRestaurants('restoran a');

            expect(presenter.latestQuery).toEqual('restoran a');
        });

        it('should ask the model to search for liked restaurants', () => {
            favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

            searchRestaurants('restoran a');

            expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restoran a');
        });

        it('should show the restaurants found by Favorite restaurants', (done) => {
            document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.card').length).toEqual(3);

                done();
            });

            favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
                if (query === 'restoran a') {
                    return [
                        { id: 111, name: 'restoran abc' },
                        { id: 222, name: 'ada juga restoran abcde' },
                        { id: 333, name: 'ini juga boleh restoran a' },
                    ];
                }

                return [];
            });

            searchRestaurants('restoran a');
        });

        it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
            document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
                const restaurantTitles = document.querySelectorAll('.card-title a');

                expect(restaurantTitles.item(0).textContent).toEqual('restoran abc');
                expect(restaurantTitles.item(1).textContent).toEqual('ada juga restoran abcde');
                expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh restoran a');

                done();
            });

            favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
                if (query === 'restoran a') {
                    return [
                        { id: 111, name: 'restoran abc' },
                        { id: 222, name: 'ada juga restoran abcde' },
                        { id: 333, name: 'ini juga boleh restoran a' },
                    ];
                }

                return [];
            });

            searchRestaurants('restoran a');
        });

        it('should show default Card Title when the restaurant returned does not contain a title', (done) => {
            document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
                const restaurantTitles = document.querySelectorAll('.card-title a');
                expect(restaurantTitles.item(0).textContent).toEqual('Card Title');

                done();
            });

            favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
                if (query === 'restoran a') {
                    return [{ id: 444 }];
                }

                return [];
            });

            searchRestaurants('restoran a');
        });
    });

    describe('When query is empty', () => {
        it('should capture the query as empty', () => {
            favoriteRestaurants.getAll.mockImplementation(() => []);
            favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

            searchRestaurants(' ');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurants('    ');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurants('');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurants('\t');
            expect(presenter.latestQuery.length).toEqual(0);
        });
    });

    describe('When no favorite restaurants could be found', () => {
        it('should show the empty message', (done) => {
            document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);

                done();
            });

            favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);

            searchRestaurants('restoran a');
        });

        it('should not show any restaurant', (done) => {
            document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.card').length).toEqual(0);

                done();
            });

            favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);

            searchRestaurants('restoran a');
        });
    });
});
