import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { name, theme } from '../config';
type inputtype = "hidden" | "text" | "search" | "tel" | "url" | "email" | "password" | "datetime" | "date" | "month" | "week" | "time" | "datetime-local" | "number" | "range" | "color" | "checkbox" | "radio" | "file" | "image";
@customElement(name.tag('base-input'))
export class BaseInput extends LitElement {
  @query("input") private _input: HTMLInputElement;
  @query(".range i") private _ranged: HTMLElement;
  @property() label = '';
  @property() name = '';
  @property() pla = undefined;
  @property() type: inputtype = 'text';
  @property() value: string | number = '';
  @property() def: string | number = '';
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  static styles = [theme, css`
  :host{
    display: inline-flex;
    background-color: var(--input-background);
    border-radius: .2em;
    outline: .14em solid transparent;
    color:var(--text);
  }
  :host(:focus){
    outline-color:var(--input-outline);
  }
  div{
    display: flex;
    flex: 1;
  }
  *{
    border-radius: inherit;
    cursor: inherit;
    font-family: inherit;
  }
  .input[type="color"] {
    padding: 0;
    height: 100% !important;
  }
  .input[type="file"]{
    display: none;
  }
  .input {
    box-sizing: border-box;
    height:1.6em;
    width: 100%;
    font-size: .8em;
    outline: 0;
    border: 0;
    margin: 0;
    border: none;
    color: inherit;
    background: transparent;
    padding: 0 .25em;
    border-radius: .25em;
  }
  .range{
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 .5px .1em var(--shadow);
    background-color:var(--input-false);
    
  }
  .range input~i {
    position: absolute;
    left: 0;
    width: 50%;
    pointer-events: none ;
    background-color: var(--input-true);
    height: calc(.6em - 1.1px);
  }
  .range input {
    height: .6em;
    margin: 0px -0.5em;
    width: calc(100% + 0.5em);
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    background-color: transparent;
  }
  .range input::-webkit-slider-runnable-track {
    height: .6em;
  }
  .range input::-webkit-slider-thumb {
    z-index: 1;
    appearance: none;
    -webkit-appearance: none;
    position: relative;
    height: 1.2em;
    width: 1.2em;
    margin-top: -0.3em;
    background-color: var(--input-control);
    border-radius: 50%;
    border: solid 0.125em rgba(0, 221, 255, 0.5);
    box-shadow: 0 .1em .1em var(--shadow);
  }
  `];
  render() {
    if (!this.name) this.name = this.label || this.type;
    return html`
    <div>
    <slot name="pre"></slot>
      <slot></slot>
      <div class=${this.type}>
        ${this._typeSwitcher()}
      </div>
      <slot name="suf"></slot></div>`;
  }
  firstUpdated() {
    if (!this.def) this.def = this.value || "";
    if (!this.value) this.value = this.def;
    if (this.type === "range") {
      this._ranged.style.width = 100 * (this.value as number / (this.max - this.min)) + '%';
      if (this.childNodes.length) {
        this.shadowRoot.querySelector('div').style.margin = "0";
      }
    } this.addEventListener('click', this._handelFocus);
  }
  _handleRange(e) {
    this.value = e.target.value;
    var a: Element;
    this._ranged.style.width = 100 * e.target.value / (this.max - this.min) + '%';
    this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
  }
  _handleInput(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
  }
  _handelFocus() {
    this._input.focus();
    if (this.type === "file") this._input.click();
  }
  reset() {
    if (this.type === "range") {
      this._input.value = (this.def as number || (this.max - this.min) / 2).toString();
      this.value = this.def || (this.max - this.min) / 2;
      this._ranged.style.width = 100 * (this.value as number / (this.max - this.min)) + '%';
    } else {
      this._input.value = this.def.toString();
      this.value = this.def;
    }
  }
  _typeSwitcher() {
    switch (this.type) {
      case "range":
        return html`<input type="range" @input=${this._handleRange} min=${this.min} max=${this.max} step=${this.step} value=${this.value} ><i></i>`;
      default:
        return html`<input class="input" type=${this.type} placeholder=${ifDefined(this.pla)} value=${this.value} @input=${this._handleInput} />`;
    }
  }
  namevalue() {
    return [this.name, this.value || ""];
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "base-input": BaseInput;
  }
}