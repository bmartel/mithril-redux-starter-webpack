import m from 'mithril';
import {bindActionCreators} from 'redux';
import {connect} from '../utils/mithril-redux';
import {addCount} from '../actions/counter';

class Counter {
  controller (props) {
    const {dispatch} = props;
    this.actions = bindActionCreators({addCount}, dispatch);
  }

  view (controller, props) {
    const {actions} = controller;
    const {count} = props;

    return (
      <div className="counter">
        <h1> {count} clicked </h1>
        <button onclick={actions.addCount}>
          click me
        </button>
      </div>
    );
  }
}

/**
 * Map the state to component props
 *
 * @param state
 * @param ownProps
 * @returns {{count: *}}
 */
function mapStateToProps(state, ownProps) {
  const {count} = state;

  return {
    count
  }
}

export default connect(mapStateToProps, new Counter);
