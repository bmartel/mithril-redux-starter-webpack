import m from 'mithril'
import { defaultMapStateToProps, getConnect as connect } from 'midux'

import { addCount } from '../../actions/counter'

import './counter.css'

const Counter = {
  view(vnode) {
    const { actions, count } = vnode.attrs

    return m('.Counter', [
      m('h1', `${count} clicked`),
      m('button', { onclick: actions.addCount }, 'click me'),
      m('p',
        m('a', { href: '/', oncreate: m.route.link }, [
          'Home ', m('i.fa.fa-arrow-left'),
        ]),
      ),
    ])
  },
}

export default connect()(defaultMapStateToProps, { addCount })(Counter)
