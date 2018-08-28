import { LitElement } from '@polymer/lit-element';

export interface IToolkitElement {
  displayName: string;
  new(): LitElement;
}
