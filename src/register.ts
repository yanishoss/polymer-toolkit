import { IToolkitElement } from '.';

export function register(target: IToolkitElement): void {
  customElements.define(target.displayName, target);
}
