import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { name } from '../config';
@customElement(name.tag('divier-line'))
export class DivierLine extends LitElement {
  static styles = css`
    div {
      display: flex;
      align-items: center;
      border-radius:inherit;
    }
    hr {
      border-radius:inherit;
      margin: 0;
      border: 0;
      flex: 1;
      backdrop-filter: invert(0.2);
      -webkit-backdrop-filter: invert(0.2)
    }
    .v {
      height: 100%;
      display: flex;
      flex-direction: column;
    }`;
  @property() pre = "auto";
  @property() suf = "auto";
  @property({ type: Boolean }) v = false;
  @property() b = "2.2";
  render() {
    var hrstyle = `.before{height:${this.b};max-width:${this.pre}}.after{height:${this.b};max-width:${this.suf}}.v .before{width:${this.b};max-height:${this.pre}}.v .after{width:${this.b};max-height:${this.suf}}`;
    return html`<div class=${this.v ? "v" : "h"}>
    <style>${hrstyle}</style>
      <hr class="before"/>
      <slot></slot>
      <hr class="after"/>
    </div>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'divier-line': DivierLine;
  }
}