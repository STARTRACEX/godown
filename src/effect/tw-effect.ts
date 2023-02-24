import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { name } from "../config";
@customElement(name.tag("tw-text"))
export class TWText extends LitElement {
  @property({ type: Number }) autochange = 0;
  @property({ type: Number }) max = 50;
  @property({ type: Number }) min = 500;
  static styles = css`
  :host{
    font-family: monospace;
    white-space: nowrap;
    color: #1556bd;
  }
  i{
    border-right: 1px solid;
    margin: 1px;
    animation: s 1.5s steps(1) infinite;
  }
  @keyframes s {
  0%{
    border-color: currentColor;
  }
  50% {
    border-color: transparent
  }
  }`;
  render() {
    return html`<slot></slot><i></i>`;
  }
  firstUpdated() {
    console.log(random(this.min, this.max));
    this.rewrite();
  }
  rewrite() {
    const text = this.shadowRoot.querySelector('slot').assignedNodes()[0];
    const textContent = text.textContent.trim();
    text.textContent = '';
    let index = 0;
    let autochange = 0;
    if (!this.autochange) {
      autochange = random(this.min, this.max);
    } else {
      autochange = this.autochange;
    }
    textContent.split('').forEach((char) => {
      setTimeout(() => {
        if (index === textContent.length - 1) {
          this.dispatchEvent(new CustomEvent('done'));
        }
        text.textContent += char;
      }, index);
      index += autochange;
      if (!this.autochange) {
        autochange = random(this.min, this.max);
      }
      this.dispatchEvent(new CustomEvent('change'));
    }
    );
  }
}
function random(m = 0, n = 1) {
  return Math.random() * (n - m) + m;
}
declare global {
  interface HTMLElementTagNameMap {
    "tw-text": TWText;
  }
}