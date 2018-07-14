export function close(target) {
    const el = document.querySelector(target.displayName);
    if (el) {
        el.attachShadow({
            mode: 'closed',
        });
    }
}
