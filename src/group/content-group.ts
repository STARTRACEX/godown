import { LitElement, html, css } from "lit";
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { name } from "../config";
@customElement(name.tag("section-group"))
export class SectionGroup extends LitElement {
  current: number;
  all: number;
  get _main() {
    return this.shadowRoot.querySelector('main');
  }
  get _act() {
    return this.shadowRoot?.querySelector('.active');
  }
  static styles = css`
  :host{
    display: block;
    background-color: inherit;
  }
  .active{
    color:#0095ff;
  }
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
      background-color: inherit;
  }
  div{
    height:100%;
    background-color: inherit;
    display: flex;
    flex-direction: column
  }
  .reversal{
    flex-direction: column-reverse;
  }
  .v{
    flex-direction:row !important;
  }
  .v.reversal{
    flex-direction: row-reverse !important;
  }
  .v nav{
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-evenly;
  }
  a {
    padding: 0.625em 1.25em;
    flex: 1 1 0%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .v main{
    flex-direction: column;
  }
  main{
    background-color: rgb(66, 139, 199);
    display: inline-flex;
    width: 100%;
    height:100%;
  }
  ::slotted(*[slot]){
    overflow: hidden;
    transition: all 0.35s;
  }
  `;
  @property() index = this.children[0].slot;
  @property({ type: Boolean }) split = false;
  @property({ type: Boolean }) v = false;
  @property({ type: Boolean }) reversal = false;
  constructor() {
    super();
    this.current = 0;
    this.all = this.children.length;
  }
  render() {
    return html`
    <div class=${classMap({ v: this.v, reversal: this.reversal })}>
      <nav>${this._bar()}</nav>
    <main>
      ${this._slots()}
      <slot></slot>
    </main>
    </div>
    `;
  }
  _slots() {
    return html`${[...this.children].map((v) => html`<slot name="${v.slot}" ></slot>`)}`;
  }
  _bar() {
    return html`
    ${[...this.children].map((v, i) => html`<a
    class=${classMap({ active: !this.split && (this.index == v.slot) })}
    @click=${() => { this.resetindex(v.slot, i); }}>${v.slot}</a>`
    )}
    `;
  }
  firstUpdated() {
    if (!this.split) {
      [...this.children].forEach((v, i) => {
        if (v.slot == this.index) {
          this.current = i;
        }
      });
      if (this.v) {
        [...this.children].forEach(v => (v as HTMLElement).style.height = '0');
        (this.children[this.current] as HTMLElement).style.height = '100%';
      } else {
        [...this.children].forEach(v => (v as HTMLElement).style.width = '0');
        (this.children[this.current] as HTMLElement).style.width = '100%';
      }
    }
  }
  resetindex(name: string, current: number) {
    if (this.split) this.index = null;
    if (this.index === name) {
      if (this._act) {
        this._act.classList.remove('active');
        if (this.v)
          [...this.children].forEach(v => (v as HTMLElement).style.height = '100%');
        else
          [...this.children].forEach(v => (v as HTMLElement).style.width = '100%');
        this.index = null;
      }
      return;
    }
    if (this.v)
      (this.children[current] as HTMLElement).style.height = '100%';
    else
      (this.children[current] as HTMLElement).style.width = '100%';
    var other = [...this.children].filter((v, i) => i != current);
    if (this.v)
      other.forEach(v => (v as HTMLElement).style.height = '0');
    else
      other.forEach(v => (v as HTMLElement).style.width = '0');
    this.split = false;
    this.index = name;
  }
}

@customElement(name.tag("content-group"))
export class ContentGroup extends LitElement {
  get _loading() {
    return this.shadowRoot.querySelector('slot[name="loading"]');
  }
  static styles = css`
  :host{
    overflow:hidden;
    display:block;
  }
  main{
    height:100%;
    overflow:hidden;
    display:grid;
    grid-template-columns:1fr 1fr;
    justify-items: center;
    align-items: center;
    position: relative;
    background:inherit;
  }
  ::slotted([slot="loading"]){
    position: absolute;
    height:100%;
    width:100%;
    background-color:inherit;
    display: flex;
    align-items: center;
    justify-content: center;
  }`;
  @property() sort = "sort";
  @property() col = "1fr 1fr";
  @property({ attribute: false }) inner = [];
  render() {
    return html`<main style=${styleMap({ "grid-template-columns": this.col })}>
    <slot name="loading" style="background-color:inherit;"></slot>
    ${this._content()}
    </main>`;
  }
  firstUpdated() {
    if (this._loading) (<HTMLElement>this._loading).style.display = 'none';
  }
  _content() {
    if (this.sort) {
      let inner = [];
      [...this.children].forEach(e => {
        if (e.getAttribute(this.sort)) inner.push({ id: e.getAttribute(this.sort), el: e });
        (<HTMLElement>e).style.display = '';
      });
      this.inner = inner.sort((p, n) => p.id - n.id);
      return html`${repeat(this.inner, (innerdata) => innerdata.id, (innerdata) => html` ${innerdata.el}`)}`;
    }
    return html`${repeat(this.children, (el) => html`${el}`)}`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "section-group": SectionGroup;
    "content-group": ContentGroup;
  }
}