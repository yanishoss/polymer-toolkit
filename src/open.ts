import { IToolkitElement } from '.';

export function open(target: IToolkitElement): void {
  const el: HTMLElement | null = document.querySelector(target.displayName);

  if (el) {
    el.attachShadow({
      mode: 'open',
    });
  }
}
