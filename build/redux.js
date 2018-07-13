"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lit_element_1 = require("@polymer/lit-element");
const lodash_1 = __importDefault(require("lodash"));
function callOnDifferences(obj1, obj2, callback, _ = lodash_1.default) {
    Object.keys(obj1).forEach((key) => {
        if (!_.isNil(obj1[key]) &&
            !_.isNil(obj2[key]) &&
            !_.isEqual(obj1[key], obj2[key])) {
            callback(key, obj1[key], obj2[key]);
        }
    });
}
class ReduxLitElement extends lit_element_1.LitElement {
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
        const mapDispatchToProps = this.mapDispatchToProps(this.store.dispatch);
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
exports.ReduxLitElement = ReduxLitElement;
