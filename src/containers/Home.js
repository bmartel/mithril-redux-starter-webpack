import m from 'mithril';
import {bindActionCreators} from 'redux';
import {connect} from '../utils/mithril-redux';
import {updateTitle} from '../actions/page';
import mReduxImage from '../img/m-redux.png';

class Home {
  controller(props) {
    const {dispatch} = props;
    this.actions = bindActionCreators({updateTitle}, dispatch);
  }

  view (controller, props) {
    const {actions} = controller;
    const {page: {title}} = props;

    return (
      <div className="home">
        <img src={mReduxImage} alt="Mithril Redux"/>
        <h1> {title} </h1>
        <input oninput={(e) => actions.updateTitle(e.target.value)} value={title} />
        <p>
          <a href="/counter" config={m.route}>Counter <i class="fa fa-arrow-right"></i> </a>
        </p>
      </div>
    );
  }
}

/**
 * Map the state to component props
 *
 * @param state
 * @param ownProps
 * @returns {{page: *}}
 */
function mapStateToProps(state, ownProps) {
  const {page} = state;

  return {
    page
  }
}

export default connect(mapStateToProps, new Home);
