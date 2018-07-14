import { LitElement } from '@polymer/lit-element';
import * as lodash from 'lodash';
function callOnDifferences(obj1, obj2, callback, _ = lodash) {
    Object.keys(obj1).forEach((key) => {
        if (!_.isNil(obj1[key]) &&
            !_.isNil(obj2[key]) &&
            !_.isEqual(obj1[key], obj2[key])) {
            callback(key, obj1[key], obj2[key]);
        }
    });
}
export class ReduxLitElement extends LitElement {
    ready() {
        this.initProps();
        this.subscribe();
        super.ready();
    }
    subscribe() {
        this.store.subscribe(() => this.updateProps(this.store.getState()));
    }
    initProps() {
        const mapStateToProps = this.mapStateToProps(this.store.getState());
        const mapDispatchToProps = this.mapDispatchToProps(this
            .store.dispatch);
        Object.keys(mapStateToProps).forEach((key) => {
            this[key] = mapStateToProps[key];
        });
        Object.keys(mapDispatchToProps).forEach((key) => {
            this[key] = mapDispatchToProps[key];
        });
    }
    updateProps(newProps) {
        callOnDifferences(newProps, this, (key, newVal) => {
            this[key] = newVal;
        });
    }
}
