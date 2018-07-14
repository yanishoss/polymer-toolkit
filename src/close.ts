import { IToolkitElement } from '.';

export function close(target: IToolkitElement): void {
  const el: HTMLElement | null = document.querySelector(target.displayName);

  if (el) {
    el.attachShadow({
      mode: 'closed',
    });
  }
}
