import routes from '../router/routes';
import UrlParser from '../router/url-parser';
import DrawerInitiator from '../utils/drawer-initiator';
import Alert from './components/alert';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    if (!navigator.onLine) {
      Alert({ request: true, message: 'You are offline, Please check your network' });
    }

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });

    // kita bisa menginisiasikan komponen lain bila ada
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
