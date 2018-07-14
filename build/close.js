export function close(target) {
    const els = document.querySelectorAll(target.displayName);
    if (els) {
        Array.from(els).forEach((el) => {
            target.prototype._createRoot = () => el.attachShadow({
                mode: 'closed',
            });
        });
    }
}
