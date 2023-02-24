var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { name } from "../config.js";
let MenuList = class MenuList extends LitElement {
    constructor() {
        super(...arguments);
        this.summary = "";
        this.open = false;
    }
    render() {
        return html `<div ?open=${this.open}>
      <span>${this.summary}
      <slot name="summary"></slot></span>
      <i>
        <i @click=${this.toggle}>
          <svg viewBox="0 0 48 48" fill="none"><path d="M19 12L31 24L19 36" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </i>
      </i>
    </div>
    <ul>
      <slot></slot>
    </ul>`;
    }
    firstUpdated() {
        this.shadowRoot.querySelector('ul').style.setProperty('--height', this.shadowRoot.querySelector('ul').scrollHeight + 'px');
        if (!this.summary && !this.querySelector('[slot="summary"]')) {
            this.open = true;
            this.shadowRoot.querySelector('div').classList.add('no-title');
        }
        else {
            this.open = this.open;
        }
    }
    toggle() {
        this.open = !this.open;
    }
};
MenuList.styles = css `
  .no-title{
    display: none;
  }
  .no-title+ul{
    margin: 0;
  }
  div{
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    transition: all .3s ease-in-out;
    background-color:inherit;
  }
  ul{
    height: 0;
    margin: 0.1em 0px 0px 0.3em;
    padding:0;
    overflow: hidden;
    transition:inherit;
    transition: all .3s ease-in-out;
    background-color:inherit;
  }
  span{
    display: inline-flex;
    align-items: center;
    flex:1;
  }
  i,::slotted([slot="icon"]){
    display: inline-flex;
    align-items: center;
    border-radius: 20%;
    transition:inherit;
  }
  i>*,::slotted([slot="icon"]){
    width: 1.25em;
    height: 1.25em;
    border-radius: inherit;
    transition: all .3s ease-in-out;
  }
  div>i:hover, ::slotted([slot="icon"]:hover){
    background-color: rgb(0 0 0 /.075);
  }
  div[open] i>i{
    transform: rotate(90deg);
  }
  div[open]+ul{
    height:var(--height) ;
  }
  `;
__decorate([
    property()
], MenuList.prototype, "summary", void 0);
__decorate([
    property({ type: Boolean })
], MenuList.prototype, "open", void 0);
MenuList = __decorate([
    customElement(name.tag("menu-list"))
], MenuList);
export { MenuList };
