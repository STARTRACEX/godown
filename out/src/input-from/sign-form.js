var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { name } from "../config.js";
let SignForm = class SignForm extends LitElement {
    render() {
        return html `<form enctype="multipart/form-data"><slot name="pre"></slot>
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
        for (let slot of [...this.shadowRoot.querySelectorAll('slot')])
            for (let i of slot.assignedNodes()) {
                slot.appendChild(i);
            }
    }
    reset() {
        each(this._from, (node) => {
            if (node.reset) {
                node.reset();
            }
        });
    }
    namevalue() {
        var x = {};
        each(this._from, (node) => {
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
        var x = new FormData(this._from);
        each(this._from, (node) => {
            // 将node表单的Formdata追加到x
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
};
SignForm.styles = css `
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
  }
  `;
__decorate([
    query("form")
], SignForm.prototype, "_from", void 0);
SignForm = __decorate([
    customElement(name.tag('sign-form'))
], SignForm);
export { SignForm };
function each(node, callback) {
    if (node) {
        callback(node);
        for (let i of node.childNodes) {
            each(i, callback);
        }
    }
}
