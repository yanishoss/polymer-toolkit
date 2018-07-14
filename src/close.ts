import { IToolkitElement } from '.';

export function close(target: IToolkitElement): void {
  const els: NodeListOf<HTMLElement> | null = document.querySelectorAll(target.displayName);

  if (els) {
    Array.from(els).forEach((el: HTMLElement) => {
      target.prototype._createRoot = () => el.attachShadow({
        mode: 'closed',
      });
    });
  }
}
