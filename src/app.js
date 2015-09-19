import m from 'mithril';
import Root from './containers/root/root';
import {configureStore} from './store';
import {initModule, defn} from './utils/redux-ud';

import './index.html';

initModule(module);

const init = {};
const store = configureStore(init);

defn(() => {
  return m.mount(document.body, (<Root store={store} />));
})();
