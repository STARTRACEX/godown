var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { name } from "../config.js";
const originstyle = css `
  :host {
    --color: #f0f0f0;
    --border: #444444;
    --background: #2c2c2c;
    --hover: #fafafa;
    --border-hover: #707070;
    --background-hover: #303030;
    --active: #fafafa;
    --border-active: #5a5a5a;
    --background-active: #3a3a3a;
    display:inline-flex;
    text-decoration:none;
    cursor:pointer;
  }
  .ghost,
  .ghost:hover {
    color: var(--background);
    border-color: var(--background);
    background-color: transparent;
  }
  .ghost:active {
    color: var(--active);
    background-color: var(--background-active);
  }
  a {
    box-sizing: border-box;
    height:100%;
    width:100%;
    font-size: inherit;
    border-radius: inherit;
    border-width: .08em;
    border-color: var(--border);
    border-style: solid;
    display: inline-flex;
    justify-content: center;
    color: var(--color);
    background-color: var(--background);
    cursor: inherit;
    text-decoration:inherit;
    transition: all .2s ease-in;
  }
  div {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    margin-right: .1em;
    margin-left: .1em;
  }
  a:hover {
    color: var(--hover);
    border-color: var(--border-hover);
    background-color: var(--background-hover);
  }
  a:active {
    transition:  0s;
    color: var(--active);
    border-color: var(--border-active);
    background-color: var(--background-active);
  }
  a[disabled],
  a[disabled]:hover,
  a[disabled]:active {
    color: var(--color-disabled);
    border-color: var(--border-disabled);
    background-color: var(--background-disabled);
  }`;
const colorful = css `.white {
    --color: #2c2c2c;
    --border: #44444450;
    --background: #f8f8f8;
    --hover: #707070;
    --border-hover: #44444450;
    --background-hover: #f4f4f4;
    --border-active: #aaaaaa;
    --background-active: #aaaaaa;
  }
  .yellow {
    --color: #fafafa;
    --border: #44444450;
    --background: #ebb10d;
    --hover: #ececec;
    --border-hover: #44444450;
    --background-hover: #f9bd10;
    --background-active: #d7a422;
    --border-active: #44444420;
  }
  .gary {
    --color: #fafafa;
    --border: #44444450;
    --background: #51535e;
    --hover: #ececec;
    --border-hover: #44444450;
    --background-hover: #5e616d;
    --background-active: #3f3d47;
    --border-active: #44444420;
  }
  .red {
    --color: #fafafa;
    --border: #44444450;
    --background: #d11a2d;
    --hover: #ececec;
    --border-hover: #44444450;
    --background-hover: #c62828;
    --background-active: #a61b29;
    --border-active: #44444420;
  }
  .blue {
    --color: #fafafa;
    --border: #44444450;
    --background: #1177b0;
    --hover: #ececec;
    --border-hover: #44444450;
    --background-hover: #11659a;
    --background-active: #144a74;
    --border-active: #44444420;
  }
  .green {
    --color: #fafafa;
    --border: #44444450;
    --background: #12aa8c;
    --hover: #ececec;
    --border-hover: #44444450;
    --background-hover: #1db68f;
    --background-active: #248067;
    --border-active: #44444420;
  }`;
let BaseButton = class BaseButton extends LitElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.ghost = false;
        this.href = undefined;
        this.target = undefined;
        this.color = "";
    }
    render() {
        return html `<a href=${ifDefined(this.href)} target=${ifDefined(this.target)} ?disabled=${this.disabled} class=${classMap({ ghost: this.ghost, [this.color]: this.color })}>
        <div><slot name="pre"></slot></div>
        <div><slot></slot></div> 
        <div><slot name="suf"></slot></div>   
  </a>`;
    }
};
BaseButton.styles = [originstyle, colorful];
__decorate([
    property({ type: Boolean })
], BaseButton.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], BaseButton.prototype, "ghost", void 0);
__decorate([
    property()
], BaseButton.prototype, "href", void 0);
__decorate([
    property()
], BaseButton.prototype, "target", void 0);
__decorate([
    property()
], BaseButton.prototype, "color", void 0);
BaseButton = __decorate([
    customElement(name.tag("base-button"))
], BaseButton);
export { BaseButton };
