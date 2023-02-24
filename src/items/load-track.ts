import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { name, theme } from '../config';
@customElement(name.tag('load-track'))
export class LoadTrack extends LitElement {
  static styles = [theme, css`
  :host,div{
    display:inline-flex;
  }
  .progress {
    position: relative;
    width: 10em;
    height: .5em;
    border-radius: .25em;
    background-color: var(--input-false);
    z-index: 1;
  }
  .progress i {
    position: absolute;
    border-radius: inherit;
    top: 0;
    left: 0;
    height: 100%;
    width: 20%;
    background-color: var(--input-true);
    z-index: 2;
    transition: all .3s;
    animation: progress 1.5s ease-in-out infinite alternate;
  }
  @keyframes progress {
    from {
      left: 0%;
    }
    to {
      left: 80%;
    }
  }
  .progress[value] i {
    animation: none;
  }
  `];
  @property({ attribute: false }) current = 20;
  @property({ type: Number }) max = 1;
  @property({ type: Number }) min = 0;
  @property({ type: Boolean }) modify = false;
  set value(val) {
    if (val === null || val === undefined || val === "") {
      this.removeAttribute("value");
      // return;
    } else {
      this.setAttribute("value", val);
    }
    this.current = this.parsePercent(val || "20");
  }
  get value() {
    return this.getAttribute("value");
  }
  render() {
    return html`<div class="progress" @click=${this._handleClick} ><i style="width:${this.current}%;"><slot></slot></i></div>`;
  }
  firstUpdated() {
    this.current = this.parsePercent(this.value);
  }
  parsePercent(s = "0") {
    if (String(s).includes("%")) {
      return parseFloat(s);
    }
    return parseFloat(s) / (this.max - this.min) * 100;
  }
  _handleClick(e) {
    if (this.modify) {
      this.value = ((e.offsetX / this.offsetWidth) * (this.max - this.min)).toString();
      this.dispatchEvent(new CustomEvent("change", { detail: e.offsetX / this.offsetWidth }));
    }
  }
  namevalue() {
    return [this.getAttribute("name"), this.getAttribute("value")];
  }
}