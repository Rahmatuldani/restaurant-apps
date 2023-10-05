import Card from '../components/card';

const Home = {
  async render() {
    const element = document.createElement('div');
    element.className = 'content';
    element.innerHTML = `
      <h3 class="content__heading">Explore Restaurant</h3>
      <input type="text" id="query" placeholder="Search restaurant"/>
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
      restaurantsList.innerHTML = '';
      restaurantsList.appendChild(Card());
    }, 500);
  },
};

export default Home;
