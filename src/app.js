import m from 'mithril';
import Counter from './containers/Counter';
import Home from './containers/Home';
import 'font-awesome/css/font-awesome.css';

m.route.mode = 'hash';

m.route(document.getElementById('app'), '/',
  {
    '/': m(Home),
    '/counter': m(Counter)
  }
);
