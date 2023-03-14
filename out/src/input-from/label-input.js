var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { name, theme } from "../config.js";
let LabelInput = class LabelInput extends LitElement {
    constructor() {
        super(...arguments);
        this.type = "text";
        this.label = "";
        this.def = "";
        this.pla = undefined;
        this.name = "";
        this.value = "";
    }
    render() {
        if (!this.name)
            this.name = this.label || this.type;
        return html `<label for=${this.name}><span>${this.label}<slot></slot></span>
  <fieldset>
    <i><slot name="pre"></slot></i>
    <input value=${this.value} @input=${this._handleInput} id=${this.name} type=${this.type} placeholder=${ifDefined(this.pla)} class=${this.type} />
    <i><slot name="suf"></slot></i>
    ${this.type === "password" && !!this.querySelector('[slot="suf"]') ? html `<i @mousedown=${this._passwordSwitcher} @mouseup=${() => { this._input.type = "password"; }} @mouseleave=${() => { this._input.type = "password"; }} ><svg viewBox="0 0 48 48" fill="none"><path d="M9.85786 18C6.23858 21 4 24 4 24C4 24 12.9543 36 24 36C25.3699 36 26.7076 35.8154 28 35.4921M20.0318 12.5C21.3144 12.1816 22.6414 12 24 12C35.0457 12 44 24 44 24C44 24 41.7614 27 38.1421 30" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.3142 20.6211C19.4981 21.5109 19 22.6972 19 23.9998C19 26.7612 21.2386 28.9998 24 28.9998C25.3627 28.9998 26.5981 28.4546 27.5 27.5705" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 42L6 6" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></i>` : undefined}
  </fieldset>
</label>`;
    }
    firstUpdated() {
        if (!this.def)
            this.def = this.value || "";
        if (!this.value)
            this.value = this.def;
    }
    _handleInput(i) {
        this.value = i.target.value;
        this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
    }
    reset() {
        this.value = this.def;
        this._input.value = this.def;
    }
    _passwordSwitcher() {
        if (this._input.type === "password") {
            this._input.type = "text";
        }
        else {
            this._input.type = "password";
        }
    }
    namevalue() {
        return [this.name, this.value];
    }
};
LabelInput.styles = [theme, css `
  :host{
    background-color: inherit;
    display:inline-flex;
    color:var(--text);
  }
  label {
    margin: auto;
    width: 100%;
    box-sizing: border-box;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.4px;
  }
  span {
    margin-right: .15em;
  }
  input {
    background-color: transparent;
    font-size: 102.5%;
    line-height: 1.2em;
    border: 0;
    border-radius: 4px;
    outline: 0;
    box-sizing: border-box;
    flex:1;
    width:100%;
    padding:4.8px;
  }
  fieldset:has(input:focus) {
    outline: .18em solid var(--input-outline-focus);
  }
  @media screen and (max-width:540px) {
    label {
      justify-content: flex-start;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  i {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
  }
  svg{
    height:1em;
    width:1.5em;
    
  }
  fieldset {
    position: relative;
    background-color: var(--input-background);
    display: flex;
    padding: 0;
    border-radius: 4px;
    outline: none;
    border: 0;
    margin: 0;
    width:12.2em;
  }
  ::-ms-reveal {
    display: none;
  }`];
__decorate([
    property()
], LabelInput.prototype, "type", void 0);
__decorate([
    property()
], LabelInput.prototype, "label", void 0);
__decorate([
    property()
], LabelInput.prototype, "def", void 0);
__decorate([
    property()
], LabelInput.prototype, "pla", void 0);
__decorate([
    property()
], LabelInput.prototype, "name", void 0);
__decorate([
    property()
], LabelInput.prototype, "value", void 0);
__decorate([
    query('input')
], LabelInput.prototype, "_input", void 0);
LabelInput = __decorate([
    customElement(name.tag('label-input'))
], LabelInput);
export { LabelInput };
