const Home = {
  async render() {
    return `
        <div class="content">
          <h2 class="content__heading">Explore Restaurant</h2>
          <div id="restaurants" class="restaurants">
          </div>
        </div>
      `;
  },

  async afterRender() {
    console.log('test');
  },
};

export default Home;
