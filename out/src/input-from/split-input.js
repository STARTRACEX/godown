var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, query, queryAll, state } from 'lit/decorators.js';
1;
import { name, theme } from "../config.js";
let SplitInput = class SplitInput extends LitElement {
    constructor() {
        super(...arguments);
        this.name = "";
        this.value = "";
        this.max = 6;
        this.index = -1;
        this.current = 0;
        this.currentValue = [];
    }
    render() {
        return html `<main><div>
  ${Array(this.max).fill(0).map(() => html `<span><i></i></span>`)}
  <input @input=${this._handleInput} value="     ">
</div></main>`;
    }
    firstUpdated() {
        this.currentValue = this.value.split('').concat(Array(this.max - this.value.length).fill(null));
        this.current = (this.index < 0 || this.index > this.max) ? this.currentValue.indexOf(null) : this.index;
        ;
        this._spans.forEach((span, index) => {
            span.addEventListener('click', () => {
                this.current = index;
                this.focu();
                this._input.focus();
            });
        });
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target)) {
                this.blur();
            }
        });
    }
    namevalue() {
        return [this.name, this.value];
    }
    _handleInput(e) {
        if (e.data === null) {
            if (this.currentValue[this.current] !== null) {
                this.currentValue[this.current] = null;
                this.current = this.current;
            }
            else {
                this.currentValue[this.current - 1] = null;
                this.current = this.current - 1 < 0 ? 0 : this.current - 1;
            }
        }
        else {
            this.currentValue[this.current] = e.data;
            if (this.current + 1 >= this.max) {
                this.current = this.currentValue.indexOf(null);
                if (this.current === -1) {
                    this.blur();
                }
            }
            else {
                this.current += 1;
            }
        }
        this.focu();
        this._spans.forEach((span, index) => {
            span.querySelector('i').innerText = this.currentValue[index] || '';
        });
        this.value = this.currentValue.join('');
        this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
    }
    focu(i = this.current) {
        var _a;
        this._spans.forEach((span) => {
            span.classList.remove('focus');
        });
        (_a = this._spans[i]) === null || _a === void 0 ? void 0 : _a.classList.add('focus');
        this._input.value = "      ";
    }
    blur(i = this.current) {
        var _a;
        (_a = this._spans[i]) === null || _a === void 0 ? void 0 : _a.classList.remove('focus');
        this._input.blur();
    }
};
SplitInput.styles = [theme, css `:host{
      display: inline-block;
    }
    div {
      position: relative;
      display:inline-flex;
    }
    span {
      display: inline-flex;
      width: 1em;
      padding: 0.1em;
      height: 1em;
      pointer-events: all;
    }
    i {
      width: 100%;
      z-index: 1;
      background-color: var(--input-false);
      font-style: normal;
      font-size: .5em;
      text-align: center;
    }
    input {
      opacity: 0;
      left: 0;
      position: absolute;
      background-color: tan;
      right: 0;
      top: 0;
      bottom: 0;
    }
    .focus i {
      outline: .12em solid var(--input-true);
    }`];
__decorate([
    property()
], SplitInput.prototype, "name", void 0);
__decorate([
    property()
], SplitInput.prototype, "value", void 0);
__decorate([
    property({ type: Number })
], SplitInput.prototype, "max", void 0);
__decorate([
    property()
], SplitInput.prototype, "index", void 0);
__decorate([
    query('input')
], SplitInput.prototype, "_input", void 0);
__decorate([
    queryAll('span')
], SplitInput.prototype, "_spans", void 0);
__decorate([
    state()
], SplitInput.prototype, "current", void 0);
__decorate([
    state()
], SplitInput.prototype, "currentValue", void 0);
SplitInput = __decorate([
    customElement(name.tag('split-input'))
], SplitInput);
export { SplitInput };
