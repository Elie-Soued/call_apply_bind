// The point of this file is to show that  _debounceValueChanges() is not written correctly


/** What is a debounce function?
 * https://blog.bitsrc.io/what-is-debounce-in-javascript-a2b8e6157a5a
 */

class AbstractWebComponent extends HTMLElement {
  refreshContext(key, keyPath, newValue, oldValue) {
    this.context.valueUpdated(key, keyPath, newValue, oldValue);
  }
}

class AbstractAttrRenderer extends AbstractWebComponent {
  constructor() {
    super();
    this._debouncedRefresh = this._debounceValueChanges(() =>
      this.refreshContext()
    );
  }

  _debounceValueChanges(func, timeout = 150) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  _updateValue(value) {
    this._debouncedRefresh();
  }
}

class AttrTextarea extends AbstractAttrRenderer {
  renderAttrElement() {
    return html`
      <textarea @input=${(e) => this._updateValue(e.target.value)}></textarea>
    `;
  }
}



/** What is wrong about the _debounceValueChanges implementation in our use case?
 * *****************************************************************************
 * Let's take a look at this line :
 * func.apply(this, args);
 * In our case func is this.refreshContext();
 *
 * First Observation :
 * Although refreshContext has 4 parameters, in our example it is executed
 * with no arguments .Therefore the args are useless.
 *
 * Second Observation :
 * Let's review the MDN definition of apply:
 * The apply() method calls the specified function with a given this value, and arguments provided
 * as an array (or an array-like object).
 *
 * We already established that the array is useless in our case.
 * "The apply() method calls the specified function with a given this value".
 * I console logged "this" inside of the _debounceValueChanges method and realized that it is
 * already linked to the correct object (AttrTextarea).
 * Therefore the use of apply is completely useless.
 */



// Alternative implementation of _debounceValueChanges

_debounceValueChanges(func, timeout = 150) {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func();
      }, timeout);
    };
  }