import m from 'mithril';
import {defaultMapStateToProps} from 'midux';

import {connect} from '../../store';
import {updateTitle} from '../../actions/page';
import mReduxImage from '../../img/m-redux.png';

const Home = {
  view (ctrl, props) {
    const {config} = ctrl;
    const {title, actions} = props;

    return m('.Home', {config}, [
      m('img', {src: mReduxImage, alt: 'Mithril Redux'}),
      m('h1', title),
      m('input', {oninput: (e) => actions.updateTitle(e.target.value), value: title}),
      m('p',
        m('a', {href: '/counter', config: m.route}, [
          'Counter ', m('i.fa.fa-arrow-right')
        ])
      )
    ]);
  }
}

export default connect((state, props) => state.page, {updateTitle})(Home);
