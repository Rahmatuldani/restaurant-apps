const Home = {
  async render() {
    const element = document.createElement('div');
    element.className = 'content';
    element.innerHTML = `
      <h3 class="content__heading">Explore Restaurant</h3>
      <div id="restaurants" class="restaurants">
        <div class="loading">
          Memuat ...
        </div>
      </div>
    `;
    return element;
  },

  async afterRender() {
    const restaurantsList = document.querySelector('#restaurants');
    setTimeout(() => {
      restaurantsList.innerHTML = 'Restaurant list';
    }, 3000);
  },
};

export default Home;
