var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { name } from "../config.js";
let ButtonGroup = class ButtonGroup extends LitElement {
    constructor() {
        super(...arguments);
        this.v = false;
    }
    render() {
        return html `
    <slot name="pre"></slot>
    <div class=${this.v ? "v" : "h"}>
    <style>::slotted(*:nth-of-type(1)),::slotted(*:last-of-type){border-radius:${getComputedStyle(this).borderRadius}}</style>
    <slot></slot>
    </div>
    <slot name="suf"></slot>
    `;
    }
};
ButtonGroup.styles = css `
  :host{
    display: inline-flex;
    align-items: center;
  }
  .v{
    flex-direction: column;
  }
  .h ::slotted(*:nth-of-type(1)){
    border-top-right-radius:0 !important;
    border-bottom-right-radius:0 !important;
  }
  .h ::slotted(*:last-of-type){
    border-top-left-radius:0 !important;
    border-bottom-left-radius:0 !important;
  }
  .v ::slotted(*:nth-of-type(1)){
    border-bottom-left-radius:0 !important;
    border-bottom-right-radius:0 !important;
  }
  .v ::slotted(*:last-of-type){
    border-top-left-radius:0 !important;
    border-top-right-radius:0 !important;
  }
  .h ::slotted(*){
   margin:0 -.04em; /* 50% border-width */
  }
  .v ::slotted(*){
   margin: -.04em 0; /* 50% border-width */
  }
  ::slotted(*:hover){
    z-index:2
  }
  .h{
    margin:0 .04em;
    display: inherit;
  }
  .v{
    margin:.04em 0;
    display: inherit;
  }
  `;
__decorate([
    property({ type: Boolean })
], ButtonGroup.prototype, "v", void 0);
ButtonGroup = __decorate([
    customElement(name.tag("button-group"))
], ButtonGroup);
export { ButtonGroup };
