import m from 'mithril';

class _Provider {
  view (controller, props, children) {
    const Child = typeof children[0] === 'function' ?
      children[0]() : children[0];

    return (<Child {...props} />);
  }
}

export const Provider = new _Provider;

/**
 * Connect container component to redux
 *
 * @param selector
 * @returns {*}
 */
export function connect(selector, Component) {
  return container({
    view (ctrl, props, children) {
      const {store: {dispatch, getState}, ...ownProps} = props;
      const state = selector(getState(), ownProps);

      return (<Component dispatch={dispatch} {...state} />);
    }
  });
}

/**
 * Provider wrapper for container components
 *
 * @param Component
 * @returns {*}
 */
export function container(Component) {
  return {
    view (ctrl, props) {
      return (
        <Provider {...props}>
          {Component}
        </Provider>
      );
    }
  }
}
