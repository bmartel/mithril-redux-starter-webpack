import m from 'mithril';
import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
  combineReducers,
  bindActionCreators
} from 'redux';

export const defaultMapStateToProps = (state, props) => state;

/**
 * Connect container component to redux store
 *
 * @param selector
 * @returns {*}
 */
export const connectStore = (store) =>
  (mapStateToProps, mapActionCreators={}) => (component) => {
  return {
    controller(props) {
      this.store = store;
      this.ownProps = m.prop(props || {});
      this.state = m.prop({});
      this.shouldComponentUpdate = m.prop(true);
      this.unsubscribe = null;
      this.actions = bindActionCreators(mapActionCreators, this.store.dispatch);
      this.config = (el, init, ctx) => {
        ctx.onunload = () => {
          this.actions = null;
          this.store = null;
          this.ownProps({});
          this.state({});
          this.shouldComponentUpdate(false);
          this.tryUnsubscribe();
        }
      };

      const originalController = component.controller;

      component.controller = (props) => {
        let controllerData = {};

        if (originalController) {
          controllerData = originalController.call(component, props);
        }

        return {
          ...controllerData,
          config: this.config
        }
      };

      this.isSubscribed = () => typeof this.unsubscribe === 'function';

      this.trySubscribe = () => {
        if (!this.isSubscribed()) {
          this.unsubscribe = this.store.subscribe(this.handleUpdate);
          this.handleUpdate();
        }
      };

      this.tryUnsubscribe = () => {
        if (this.isSubscribed()) {
          this.unsubscribe();
          this.unsubscribe = null;
        }
      };

      this.updateOwnProps = (currentProps) => {
        const prevOwnProps = this.ownProps();
        if(currentProps !== prevOwnProps) {
          this.ownProps(currentProps);
          this.shouldComponentUpdate(true);
        }
      };

      this.handleUpdate = () => {
        if (!this.isSubscribed()) return true;

        const shouldUpdate = this.shouldComponentUpdate();
        const prevStoreState = this.state();
        const storeState = mapStateToProps(this.store.getState(), this.ownProps());

        if (shouldUpdate || prevStoreState !== storeState) {
          this.state(storeState);
          this.shouldComponentUpdate(true);
        }
      };

      this.trySubscribe();
    },

    view (ctrl, props, children) {
      const {config, actions, state, updateOwnProps, shouldComponentUpdate} = ctrl;

      updateOwnProps(props);
      const shouldUpdate = shouldComponentUpdate();
      const storeProps = state();
      shouldComponentUpdate(false);

      if (shouldUpdate) {
        return m(component, {actions, ...storeProps, ...props}, children);
      }

      return {subtree: 'retain'};
    }
  }
}

/**
* Configure store to use reducers/middleware
*/
export const configureStore = (reducers) => {

  /**
   * Configure app middleware based on environment
   */
  const createStoreWithMiddleware = process.env.NODE_ENV == 'production' ?
    applyMiddleware(thunk)(createStore) :
    applyMiddleware(thunk, require('redux-logger')())(createStore);

  /**
   * Build app state defined by data reducers
   */
  const appState = combineReducers(reducers);

  /**
   * Create data store from the defined data shape
   */
  return createStoreWithMiddleware(appState);
}
