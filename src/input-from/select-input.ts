import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { name } from '../config';
const selcls = `${name.tag('select-input')}-selected`;
@customElement(name.tag('select-input'))
export class SelectInput extends LitElement {
  static styles = css`
  :host{
    display: inline-flex;
    outline: 1px solid #08224a;
    border-radius: 0.25em;
    height: 1.36em;
    width: 12em;
    z-index: 2;
  }
  input{
    cursor:inherit;
    height:100%;
    width: 100%;
    box-sizing: border-box;
    padding-right: 1.25em;
    border:inherit;
    outline: none;
    border-radius:inherit;
    flex:1;
  }
  div{
    display: inline-flex;
    position: relative;
    width: 100%;
    border-radius:inherit;
    z-index: inherit;
  }
  input+svg{
    position: absolute;
    height: 100%;
    right: 0;
    pointer-events: none;
  }
  aside{
    margin-top: 1px;
    position: absolute;
    top:100%;
    width: 100%;
    visibility: hidden;
    z-index: 1;
    border-radius:inherit;
  }
  section{
    max-width:calc(100% - 1.2em);
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    border-radius:inherit;
    z-index: inherit;
  }
  i.selected-item{
    border-radius:inherit;
    height: 100%;
    float:left;
    display: inline-flex;
    font-style: normal;
    align-items: center;
    padding-left: .1em;
    margin-left: 0.1em;
  }
  i:first-child{
    margin-left: 0;
  }
  i.selected-item svg{
    padding: 0 .12em;
    height:.8em;
    pointer-events: all;
  }
  `;
  @property() pla = '';
  @property({ type: Boolean }) m = false;
  @property() def = '';
  @property() autofocus = false;
  @property({ type: Array }) value = [];
  @property() name = '';
  @state() text: Array<string> = [];
  get assigned(): any {
    return this.shadowRoot.querySelector('slot').assignedElements();
  }
  @query('input') private _input: HTMLInputElement;
  @query('aside') private _aside: HTMLInputElement;
  render() {
    return html`<div>
  <section>
    ${this.lists()}
  </section>
  <input @focus=${this.focus} @input=${this._handleInput} placeholder=${this.pla} />
  <svg viewBox="0 0 48 48" fill="none"><path d="M36 19L24 31L12 19H36Z" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>
  <aside><slot></slot></aside>
</div>`;
  }
  lists() {
    var itemTemplates = [];
    if (this.value.length)
      for (const i in this.value) {
        itemTemplates.push(html`<i class="selected-item">${this.text[i] || this.value[i]}
        <svg @click=${() => { this.select(this.value[i]); }} t="1678769821062" viewBox="0 0 1024 1024" version="1.1" p-id="2770"><path d="M960 512c0-249.6-198.4-448-448-448S64 262.4 64 512s198.4 448 448 448 448-198.4 448-448zM691.2 736L512 556.8 332.8 736c-12.8 12.8-32 12.8-44.8 0-12.8-12.8-12.8-32 0-44.8L467.2 512 288 332.8c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0L512 467.2 691.2 288c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L556.8 512 736 691.2c12.8 12.8 12.8 32 0 44.8-12.8 12.8-32 12.8-44.8 0z" fill="currentColor" p-id="2771"></path></svg>
        </i>`);
      }
    return html`${itemTemplates}`;
  }
  firstUpdated() {
    this.reset();
    if (this.autofocus) this.focus();
    this.assigned.forEach((option: { value: any; addEventListener: (arg0: string, arg1: () => void) => void; innerText: any; children: any; }) => {
      if (option.value) {
        option.addEventListener("click", () => {
          this.select(option.value, option.innerText);
        });
      }
      else if (option.children) {
        [...option.children].forEach(option => {
          option.addEventListener("click", () => {
            this.select(option.value, option.innerText);
          });
        });
      }
    });
    document.addEventListener("click", (e) => {
      if (!this.m && e.target != this || this.m && !this.contains(e.target as Node)) {
        this.close();
      }
    });
  }
  select(value: string, text?: string) {
    if (text === undefined) {
      this.assigned.forEach((option: { value: any; innerText: any; children: any; }) => {
        if (option.value) {
          if (option.value == value) {
            text = option.innerText;
          }
        }
        else if (option.children) {
          [...option.children].forEach(option => {
            if (option.value == value) {
              text = option.innerText;
            }
          });
        }
      });
    }
    if (this.value.includes(value)) {
      if (this.m) {
        this.value = this.value.filter(v => v != value);
        this.text = this.text.filter(v => v != text);
      } else {
        this.value = [];
        this.text = [];
      }
    } else {
      if (this.m) {
        this.value.push(value);
        this.text.push(text);
      } else {
        this.value = [value];
        this.text = [text];
      }
    }
    this.assigned.forEach((option: { value: any; classList: { add: (arg0: string) => void; remove: (arg0: string) => void; }; children: any; }) => {
      if (option.value) {
        if (this.value.includes(option.value)) {
          option.classList.add(selcls);
        }
        else {
          option.classList.remove(selcls);
        }
      }
      else if (option.children) {
        [...option.children].forEach(option => {
          if (this.value.includes(option.value)) {
            option.classList.add(selcls);
          }
          else {
            option.classList.remove(selcls);
          }
        });
      }
    });
    this._input.value = "";
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent("change", { detail: this.namevalue() }));
  }
  focus() {
    this._input.focus();
    this.open();
  }
  close() {
    this._aside.style.visibility = "hidden";
  }
  open() {
    this._aside.style.visibility = "visible";
  }
  _handleInput() {
    let value = this._input.value.trim();
    if (this.m && value.includes(";")) {
      value = value.split(";").pop().trim();
    }
    this.assigned.forEach(option => {
      if (option.value) { option.style.display = "block"; }
      if (option.children) {
        option.style.display = "block";
        [...option.children].forEach(option => {
          option.style.display = "block";
        });
      }
    });
    if (value) {
      this.assigned.forEach(option => {
        if (option.value) {
          if (option.value.toLowerCase().includes(value.toLowerCase()) || option.innerText.toLowerCase().includes(value.toLowerCase())) {
            option.style.display = "block";
          }
          else {
            option.style.display = "none";
          }
        }
        else if (option.children) {
          [...option.children].forEach(option => {
            if (option.value.toLowerCase().includes(value.toLowerCase()) || option.innerText.toLowerCase().includes(value.toLowerCase())) {
              option.style.display = "block";
            }
            else {
              option.style.display = "none";
            }
          });
          if ([...option.children].filter(option => option.style.display == "block").length == 0) {
            (option as HTMLElement).style.display = "none";
          }
        }
      });
    }
    this.dispatchEvent(new CustomEvent("input", { detail: this.namevalue() }));
  }
  namevalue() {
    if (this.m) {
      return [this.name, this.value];
    }
    return [this.name, this.value[0]];
  }
  reset() {
    this.value = [];
    this.text = [];
    this._input.value = "";
    this.assigned.forEach((option: { value: any; classList: { remove: (arg0: string) => void; }; children: any; }) => {
      if (option.value) {
        option.classList.remove(selcls);
      }
      else if (option.children) {
        [...option.children].forEach(option => {
          option.classList.remove(selcls);
        });
      }
    });
    if (this.def) {
      if (this.m) {
        this.def.split(";").forEach(def => {
          if (def.trim())
            this.select(def.trim(), undefined);
        });
      }
      else {
        if (this.def.split(";")[0].trim())
          this.select(this.def.split(";")[0].trim(), undefined);
      }
    }
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "select-input": SelectInput;
  }
}