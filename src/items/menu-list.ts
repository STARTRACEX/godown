import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { name } from "../config";
@customElement(name.tag("menu-list"))
export class MenuList extends LitElement {
  @property() summary = "";
  @property({ type: Boolean }) open = false;
  static styles = css`
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
  render() {
    return html`<div ?open=${this.open}>
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
    } else {
      this.open = this.open;
    }
  }
  toggle() {
    this.open = !this.open;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "menu-list": MenuList;
  }
}