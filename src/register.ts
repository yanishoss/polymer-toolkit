export function register(name: string): ClassDecorator {
  return (target: any) => {
    customElements.define(name, target);
  };
}
