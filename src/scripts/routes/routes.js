import Home from '../view/pages/home';
import Detail from "../view/pages/detail";
import Favorite from '../view/pages/like-resto';

const routes = {
  '/': Home, // default page
  '/home': Home,
  '/detail/:id': Detail,
  '/like-resto': Favorite,
};

export default routes;
