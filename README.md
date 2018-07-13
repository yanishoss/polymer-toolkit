# :wrench: polymer-toolkit
A toolkit for making Polymer simpler.  

Provides already:  
* Redux support  
* A decorator to register your components  
* Others tools not yet released...

## Install it
```shell
# With npm
npm intall --save polymer-toolkit

# With yarn
yarn add -ED polymer-toolkit
```

## How to use ?
```typescript
import { register, ReduxLitElement } from "polymer-toolkit";
import { createStore } from "redux";

const exampleStore = createStore(/*Put a reducer*/);

// It registers your component in the shadow DOM.
// Same as: customElements.define("my-component", MyComponent);
// But it is way prettier !
@register("my-component")
class MyComponent extends ReduxLitElement {
    // Put your store here.
    store = exampleStore;
    
    // Then put a mapStateToProps,
    // It assigns your store state to your component's props.
    // Same as in "react-redux".
    mapStateToProps = state = {
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
            addANumber: (n: number) => dispatch({
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