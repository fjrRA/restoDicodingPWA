import RestaurantSource from '../../data/restaurant-source';
import { createRestoItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <h1 class="section__title">List Restaurant</h1>
    <div id="content" class="card__list"></div>
    `;
  },

  async afterRender() {
    const resto = await RestaurantSource.restaurantLists();
    console.log(resto);
    const restaurantsContainer = document.querySelector('#content');
    resto.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestoItemTemplate(restaurant);
    });
  },
};

export default Home;