import m from 'mithril';
import {bindActionCreators} from 'redux';
import {connect} from '../utils/mithril-redux';
import {addCount} from '../actions/counter';

class Counter {
  controller (props) {
    const {dispatch} = props;
    this.actions = bindActionCreators({addCount}, dispatch);
  }

  view (ctrl, props) {
    const {actions} = ctrl;
    const {count} = props;

    return (
      <div className="counter">
        <h1> {count} clicked </h1>
        <button onclick={actions.addCount}>
          click me
        </button>
        <p>
          <a href="/" config={m.route}>Home <i class="fa fa-arrow-left"></i> </a>
        </p>
      </div>
    );
  }
}

export default connect((state, props) => state, new Counter);
