var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { name } from "../config.js";
let TWText = class TWText extends LitElement {
    constructor() {
        super(...arguments);
        this.autochange = 0;
        this.max = 50;
        this.min = 500;
    }
    render() {
        return html `<slot></slot><i></i>`;
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
        }
        else {
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
        });
    }
};
TWText.styles = css `
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
__decorate([
    property({ type: Number })
], TWText.prototype, "autochange", void 0);
__decorate([
    property({ type: Number })
], TWText.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], TWText.prototype, "min", void 0);
TWText = __decorate([
    customElement(name.tag("tw-text"))
], TWText);
export { TWText };
function random(m = 0, n = 1) {
    return Math.random() * (n - m) + m;
}
