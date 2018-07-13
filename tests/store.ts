import { createStore } from 'redux';

const initialState = {
  x: 1200,
  y: 1300,
};

export interface IState {
  x: number;
  y: number;
}

export interface IAction {
  type: Type;
  payload: number;
}

export enum Type {
  ADD,
  SUB,
}

export const store = createStore(
  (state: IState = initialState, action: IAction) => {
    switch (action.type) {
      case Type.ADD:
        return {
          x: state.x + action.payload,
          y: state.y + action.payload,
        };
        break;
      case Type.SUB:
        return {
          x: state.x - action.payload,
          y: state.y - action.payload,
        };
        break;
      default:
        return state;
    }
  },
);
