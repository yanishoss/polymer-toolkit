import { html } from '@polymer/lit-element';
import { Dispatch } from 'redux';
import { ReduxLitElement } from '../src';
import { IAction, IState, store, Type } from './store';

class TestComponent extends ReduxLitElement<IState, IAction> {
  protected store = store;

  protected mapStateToProps = (state: IState) => ({
    // Start at 1200.
    x: state.x,
    // Start at 1300.
    y: state.y,
  })

  protected mapDispatchToProps = (
    dispatch: Dispatch<IAction>,
  ) => ({
    add: (n: number) => dispatch({ type: Type.ADD, payload: n }),
    sub: (n: number) => dispatch({ type: Type.SUB, payload: n }),
  })

  // tslint:disable-next-line
  protected _render() {
    return html`
      x: ${(this as any).x} y: ${(this as any).y}
    `;
  }

  static get properties() {
    return {
      add: Function,
      sub: Function,
      x: Number,
      y: Number,
    };
  }

  // tslint:disable-next-line
  public getInnerState() {
    return {
      _render: this._render,
      add: (this as any).add,
      sub: (this as any).sub,
      x: (this as any).x,
      y: (this as any).y,
    };
  }
}

describe('ReduxLitElement', () => {
  let comp: TestComponent;

  beforeEach(() => {
    comp = new TestComponent();
  });

  test('should pass state as props', () => {
    expect(comp.getInnerState().x).toEqual(1200);
    expect(comp.getInnerState().y).toEqual(1300);
  });

  test('should pass dispatchers as props', () => {
    expect(comp.getInnerState().add).toBeDefined();
    expect(comp.getInnerState().sub).toBeDefined();
  });

  test('should change the state according to the store\'s one', () => {
    comp.getInnerState().add(3);
    expect(comp.getInnerState().x).toEqual(1203);
    expect(comp.getInnerState().y).toEqual(1303);

    comp.getInnerState().sub(3);
    expect(comp.getInnerState().x).toEqual(1200);
    expect(comp.getInnerState().y).toEqual(1300);
  });

  test('should render the changes', () => {
    expect(
      comp
        .getInnerState()
        ._render()
        .getHTML(),
    ).toEqual('x: 1200 y: 1300');

    comp.getInnerState().add(3);
    expect(
      comp
        .getInnerState()
        ._render()
        .getHTML(),
    ).toEqual('x: 1203 y 1303');
  });
});
