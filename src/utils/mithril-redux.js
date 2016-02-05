import m from 'mithril';
import {
  createStore,
  applyMiddleware,
  combineReducers,
  bindActionCreators
} from 'redux';

export const defaultMapStateToProps = state => state;

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
      this.state = m.prop({});
      this.shouldComponentUpdate = m.prop(true);
      this.unsubscribe = null;
      this.actions = bindActionCreators(mapActionCreators, this.store.dispatch);
      this.config = (el, init, ctx) => {
        ctx.onunload = () => {
          this.actions = null;
          this.store = null;
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

      this.handleUpdate = () => {
        if (!this.isSubscribed()) return true;

        const prevStoreState = this.state();
        const storeState = mapStateToProps(this.store.getState());

        if (!shallowEqual(prevStoreState, storeState)) {
          this.state(storeState);
          this.shouldComponentUpdate(true);
        }
      };

      this.trySubscribe();
    },

    view (ctrl, props, children) {
      const {config, actions, state, shouldComponentUpdate} = ctrl;
      const shouldUpdate = shouldComponentUpdate();
      shouldComponentUpdate(false);

      if (shouldUpdate) {
        const storeProps = state();
        return m(component, {actions, ...storeProps}, children);
      }

      return {subtree: 'retain'};
    }
  }
}

/**
* Configure store to use reducers/middleware
*/
export const configureStore = (reducers, middleware=[]) => {

  /**
   * Configure app middleware based on environment
   */
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

  /**
   * Build app state defined by data reducers
   */
  const appState = combineReducers(reducers);

  /**
   * Create data store from the defined data shape
   */
  return createStoreWithMiddleware(appState);
}

// Taken and modified from https://github.com/rackt/react-redux/blob/master/src/utils/shallowEqual.js
// Check for props equality
export function shallowEqual(objA, objB) {
  if (objA === objB) return true;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  // Test for A's keys different from B.
  const hasOwn = Object.prototype.hasOwnProperty;

  let i = keysA.length;
  while(i--) {
    if (
      !hasOwn.call(objB, keysA[i]) ||
      objA[keysA[i]] !== objB[keysA[i]]
    ) return false;
  }

  return true;
}
