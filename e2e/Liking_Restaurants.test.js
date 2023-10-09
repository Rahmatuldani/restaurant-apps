const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurant', ({ I }) => {
    I.seeElement('#query');

    I.see('There is no restaurant found', '.restaurant-item__not__found');
});

Scenario('like one restaurant', async ({ I }) => {
    I.see('There is no restaurant found', '.restaurant-item__not__found');

    I.amOnPage('/');

    I.seeElement('.card-title a');
    const firstRestaurant = locate('.card-title a').first();
    const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.seeElement('.card');
    const likeRestaurantName = await I.grabTextFrom('.card-title a');

    assert.strictEqual(firstRestaurantName, likeRestaurantName);
});

Scenario('unlike one restaurant', async ({ I }) => {
    I.amOnPage('/');

    I.seeElement('.card-title a');
    const firstRestaurant = locate('.card-title a').first();
    I.click(firstRestaurant);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');
    I.seeElement('.card');
    const likedRestaurant = locate('.card-title a').first();
    I.click(likedRestaurant);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorite');

    I.see('There is no restaurant found', '.restaurant-item__not__found');
});
