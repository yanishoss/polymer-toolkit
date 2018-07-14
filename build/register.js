export function register(name) {
    return (target) => {
        customElements.define(name, target);
    };
}
