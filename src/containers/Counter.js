import m from 'mithril';
import {connect} from '../store';
import {defaultMapStateToProps} from 'midux';
import {addCount} from '../actions/counter';

const Counter = {
  view (ctrl, props) {
    const {config} = ctrl;
    const {actions, count} = props;

    return m('.counter', {config}, [
      m('h1', `${count} clicked`),
      m('button', {onclick: actions.addCount}, 'click me'),
      m('p',
        m('a', {href: '/', config: m.route}, [
          'Home ', m('i.fa.fa-arrow-left')
        ])
      )
    ]);
  }
}

export default connect(defaultMapStateToProps, {addCount})(Counter);
