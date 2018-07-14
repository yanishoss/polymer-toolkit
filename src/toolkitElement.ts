// tslint:disable-next-line
/// <reference path="../node_modules/@polymer/lit-element/custom_typings/polymer.d.ts" />

import { LitElement } from '@polymer/lit-element';

export interface IToolkitElement {
  displayName: string;
  new(): LitElement;
}
