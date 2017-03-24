import m from 'mithril'

import { connect } from '../../store'
import { updateTitle } from '../../actions/page'
import mReduxImage from '../../img/m-redux.png'

import './home.css'

const Home = {
  view(vnode) {
    const { actions, title } = vnode.attrs

    return m('.Home', [
      m('img', { src: mReduxImage, alt: 'Mithril Redux' }),
      m('h1', title),
      m('input', {
        oninput: e => actions.updateTitle(e.target.value),
        value: title,
      }),
      m('p',
        m('a', { href: '/counter', oncreate: m.route.link }, [
          'Counter ', m('i.fa.fa-arrow-right'),
        ]),
      ),
    ])
  },
}

export default connect(state => state.page, { updateTitle })(Home)
