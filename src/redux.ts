// tslint:disable-next-line
/// <reference path="../node_modules/@polymer/lit-element/custom_typings/polymer.d.ts" />;

import { LitElement } from '@polymer/lit-element';
import * as lodash from 'lodash';
import { Action, AnyAction, Dispatch, Store } from 'redux';

export interface IMapStateToProps {
  [props: string]: any;
}

export type IMapStateToPropsFunc<S> = (state: S) => IMapStateToProps;
export interface IMapDispatchToProps {
  [props: string]: (...args: any[]) => void;
}
export type IMapDispatchToPropsFunc = (
  dispatch: Dispatch,
) => IMapDispatchToProps;

// Call the callback each time a property is different from obj1 to obj2.
function callOnDifferences<
  T extends { [name: string]: any },
  U extends { [name: string]: any }
>(
  obj1: T,
  obj2: U,
  callback: (key: string, obj1Val: any, obj2Val: any) => void,
  _ = lodash,
): void {
  Object.keys(obj1).forEach((key: string) => {
    if (
      !_.isNil(obj1[key]) &&
      !_.isNil(obj2[key]) &&
      !_.isEqual(obj1[key], obj2[key])
    ) {
      callback(key, obj1[key], obj2[key]);
    }
  });
}

export abstract class ReduxLitElement<
  S,
  A extends AnyAction
> extends LitElement {
  protected abstract store: Store<S, A>;
  protected abstract mapStateToProps: IMapStateToPropsFunc<S>;
  protected abstract mapDispatchToProps: IMapDispatchToPropsFunc;

  public ready() {
    this.initProps();
    this.subscribe();
    super.ready();
  }

  private subscribe(): void {
    this.store.subscribe(() => this.updateProps(this.store.getState()));
  }

  private initProps(): void {
    const mapStateToProps: IMapStateToProps = this.mapStateToProps(
      this.store.getState(),
    );
    const mapDispatchToProps: IMapDispatchToProps = this.mapDispatchToProps(this
      .store.dispatch as Dispatch<Action<A>>);

    Object.keys(mapStateToProps).forEach((key: string) => {
      (this as { [props: string]: any })[key] = mapStateToProps[key];
    });

    Object.keys(mapDispatchToProps).forEach((key: string) => {
      (this as { [props: string]: any })[key] = mapDispatchToProps[key];
    });
  }

  private updateProps(newProps: S): void {
    callOnDifferences(newProps, this, (key: string, newVal: any) => {
      (this as { [props: string]: any })[key] = newVal;
    });
  }
}
