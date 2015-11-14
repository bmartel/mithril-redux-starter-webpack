import m from 'mithril';
import Counter from './containers/Counter';
import Home from './containers/Home';
import {configureStore} from './store';
import {initModule, defn} from './utils/redux-ud';

import './index.html';
import './app.css';

initModule(module);

const init = {};
const store = configureStore(init);

m.route.mode = 'hash';

defn(() => {
  return m.route(document.body, '/',
    {
      '/': <Home store={store} />,
      '/counter': <Counter store={store} />
    }
  );
})();
