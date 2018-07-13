"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function register(name) {
    return (target) => {
        customElements.define(name, target);
    };
}
exports.register = register;
