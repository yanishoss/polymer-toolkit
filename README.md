# :wrench: polymer-toolkit
A toolkit for making Polymer simpler.  

Provides already:  
* Redux support  
* A decorator to register your components
* A decorator to close the shadow DOM
* One to open the shadow DOM  
* Others tools not yet released...

## Install it
```shell
# With npm
npm install --save polymer-toolkit

# With yarn
yarn add -ED polymer-toolkit
```

## How to use ?
```javascript
import { register, ReduxLitElement } from "polymer-toolkit";
import { createStore } from "redux";

const exampleStore = createStore(/*Put a reducer*/);

// It registers your component in the shadow DOM.
// Same as: customElements.define("my-component", MyComponent);
// But it is way prettier !
@register

// It closes the shadow DOM.
@close

// It opens the shadow DOM.
@open
class MyComponent extends ReduxLitElement {
    // Put the name of your component.
    // Could be a getter.
    static displayName = "my-component";

    // Put your store here.
    store = exampleStore;
    
    // Then put a mapStateToProps,
    // It assigns your store state to your component's props.
    // Same as in "react-redux".
    mapStateToProps = state => {
        return {
            someProps: state.someState
        };
    };
    
    // Finally, put a mapDispatchToProps,
    // It assigns your store actions to your component's props.
    // Same as in "react-redux".
    mapDispatchToProps = dispatch => {
        return {
            // Inside your component, your can call it like this: this.addANumber(7);
            addANumber: (n) => dispatch({
                type: ADD_A_NUMBER,
                payload: n
            })
        };
    };

    static get properties() {
        return {
            someProps: Object // Put the type of your state.
            addANumber: Function
        };
    }
}
```
