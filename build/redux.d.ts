import { LitElement } from '@polymer/lit-element';
import { AnyAction, Dispatch, Store } from 'redux';
export interface IMapStateToProps {
    [props: string]: any;
}
export declare type IMapStateToPropsFunc<S> = (state: S) => IMapStateToProps;
export interface IMapDispatchToProps {
    [props: string]: (...args: any[]) => void;
}
export declare type IMapDispatchToPropsFunc = (dispatch: Dispatch) => IMapDispatchToProps;
export declare abstract class ReduxLitElement<S, A extends AnyAction> extends LitElement {
    protected abstract store: Store<S, A>;
    protected abstract mapStateToProps: IMapStateToPropsFunc<S>;
    protected abstract mapDispatchToProps: IMapDispatchToPropsFunc;
    ready(): void;
    private subscribe;
    private initProps;
    private updateProps;
}
