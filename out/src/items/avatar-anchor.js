var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from 'lit/directives/if-defined.js';
import { name } from "../config.js";
let AvatarAnchor = class AvatarAnchor extends LitElement {
    constructor() {
        super();
        this.src = '';
        this.href = '';
        this.name = '';
        this.more = 0;
        this.call = 'center';
        this.gap = false;
        this.call = "center";
    }
    render() {
        return html `<div class=${this.call}>
      <header>
        <a href=${ifDefined(this.href)}>
          ${this.ava()}
          <slot name="state"></slot>
        </a>
        <section>
          <slot name="bar"></slot>
          ${this.gap ? html `<article><slot></slot></article>` : ''}
        </section>
      </header>
          ${!this.gap ? html `<article><slot></slot></article>` : ''}
    </div>`;
    }
    ava() {
        if (this.src) {
            return html `<img src=${this.src} />`;
        }
        else if (this.name) {
            var name = this.name.slice(0, 2);
            name = name[0].toUpperCase() + name.slice(1);
            return html `<span>${name}</span>`;
        }
        else if (this.more) {
            var more = this.more > 99 ? '...' : this.more;
            return html `<span>+${more}</span>`;
        }
        return html `<slot name="avatar"></slot>`;
    }
};
AvatarAnchor.styles = css `
  :host{
    display: inline-block;
    height: fit-content;
  }
  *{
    border-radius: inherit;
  }
  header{
    display: flex; 
    flex-wrap: nowrap;
  }
  .center header{
    flex-direction: column;
  }
  .right header{
    flex-direction: row-reverse;
    justify-content: flex-start;
  }
  .left header{
    justify-content: flex-start;
  }
  img{
    width: 100%;
    height: 100%;
  }
  div{
    --ava:2.5em;
  }
  a{
    height: var(--ava);
    width:var(--ava);
    min-height: var(--ava);
    min-width:var(--ava);
    display: flex;
    position: relative;
  }
  span{
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left{
    margin-right: 3em;
  }
  .right{
    margin-left: 3em;
  }
  .left .gap{
    margin-left:var(--ava);
  }
  .right .gap{
    margin-right:var(--ava);
  }
  slot[name="state"]{
    position: absolute;
    display: block;
    position: absolute;
    display: block;
    bottom: -.25em;
    right: -.25em;
  }
  .left section,.right section{
    height: var(--ava);
    display: flex;
    align-items: center;
    flex:1;
  }
  .right section{
    justify-content: flex-end;
  }
  `;
__decorate([
    property()
], AvatarAnchor.prototype, "src", void 0);
__decorate([
    property()
], AvatarAnchor.prototype, "href", void 0);
__decorate([
    property()
], AvatarAnchor.prototype, "name", void 0);
__decorate([
    property({ type: Number })
], AvatarAnchor.prototype, "more", void 0);
__decorate([
    property()
], AvatarAnchor.prototype, "call", void 0);
__decorate([
    property({ type: Boolean })
], AvatarAnchor.prototype, "gap", void 0);
AvatarAnchor = __decorate([
    customElement(name.tag("avatar-anchor"))
], AvatarAnchor);
export { AvatarAnchor };
