Feature('Review Restaurant');

Before(({ I }) => {
    I.amOnPage('/');
});

Scenario('give a review into restaurant', async ({ I }) => {
    I.seeElement('.card-title a');
    const firstRestaurant = locate('.card-title a').first();
    I.click(firstRestaurant);

    const name = 'Codecept automation input name';
    const review = 'Codecept automation input review';

    I.seeElement('#inputName');
    I.fillField('input[id="inputName"]', name);
    I.seeElement('#inputReview');
    I.fillField('textarea[id="inputReview"]', review);
    I.seeElement('.btn-submit');
    I.click('.btn-submit');

    I.see(name, '.reviews .customerName');
    I.see(review, '.reviews .customerReview');
});
