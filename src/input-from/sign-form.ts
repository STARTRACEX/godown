import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { name } from '../config';
import "./label-input";
@customElement(name.tag('sign-form'))
export class SignForm extends LitElement {
  static styles = css`
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
  }
  main{
    display: flex;
    flex-direction: column;
  }
  input[type="submit"],input[type="reset"]{
    --submit: rgb(44, 194, 224);
    padding: 0.5em 1.8em;
    border-width: 0;
    font-size:95%;
    border-radius: .42em;
    margin:.25em;
    background-color: var(--submit);
    color: inherit;
  }
  input[type="submit"]:hover,input[type="reset"]:hover{
    background-color: var(--hover);
    transform: scale(1.02);
  }`;
  @query("form") _from: HTMLFormElement;
  render() {
    return html`<form enctype="multipart/form-data"><slot name="pre"></slot>
<main>
  <label-input name="e-mail" type="email">
    E-mail
  </label-input>
  <label-input type="password" >
    Password
  </label-input>
</main><slot></slot><slot name="suf"></slot></form>`;
  }
  firstUpdated() {
    for (let slot of [...this.shadowRoot.querySelectorAll('slot')]) for (let i of slot.assignedNodes()) { slot.appendChild(i); }
  }
  reset() {
    each(this._from, (node: any) => {
      if (node.reset) { node.reset(); }
    });
  }
  namevalue() {
    var x = {};
    each(this._from, (node: any) => {
      if (node.namevalue) {
        var [name, value] = node.namevalue();
        if (name) {
          x[name] = value;
        }
      }
    });
    var y = Object.fromEntries(new FormData(this._from));
    x = { ...x, ...y };
    return [this.getAttribute('name'), x];
  }
  FormData() {
    var x = new FormData(this._from) as any;
    each(this._from, (node: any) => {
      if (node.namevalue) {
        var [name, value] = node.namevalue();
        if (name && typeof value !== 'object' && !x.has(name)) {
          x.append(name, value);
        }
      }
      if (node.FormData) {
        for (let [key, value] of node.FormData()) {
          if (!x.has(key)) {
            x.append(key, value);
          }
        }
      }
    });
    return x;
  }
}
function each(node:Node, callback: (node: Node) => void) {
  if (node) {
    callback(node);
    for (let i of node.childNodes) {
      each(i, callback);
    }
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'sign-form': SignForm;
  }
}