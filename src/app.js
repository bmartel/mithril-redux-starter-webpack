import m from 'mithril';
import {count} from './reducers/counter';
import {page} from './reducers/page';
import Counter from './containers/Counter';
import Home from './containers/Home';
import {configureStore} from './store';
import 'font-awesome/css/font-awesome.css';

const store = configureStore({
  page,
  count
});

m.route.mode = 'hash';

m.route(document.getElementById('app'), '/',
  {
    '/': <Home store={store} />,
    '/counter': <Counter store={store} />
  }
);
