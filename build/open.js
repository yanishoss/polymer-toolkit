export function open(target) {
    const el = document.querySelector(target.displayName);
    if (el) {
        el.attachShadow({
            mode: 'open',
        });
    }
}
