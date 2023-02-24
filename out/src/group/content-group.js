var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { name } from "../config.js";
let SectionGroup = class SectionGroup extends LitElement {
    constructor() {
        super();
        this.index = this.children[0].slot;
        this.split = false;
        this.v = false;
        this.reversal = false;
        this.current = 0;
        this.all = this.children.length;
    }
    get _main() {
        return this.shadowRoot.querySelector('main');
    }
    get _act() {
        var _a;
        return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.active');
    }
    render() {
        return html `
    <div class=${classMap({ v: this.v, reversal: this.reversal })}>
      <nav>${this._bar()}</nav>
    <main>
      ${this._slots()}
      <slot></slot>
    </main>
    </div>
    `;
    }
    _slots() {
        return html `${[...this.children].map((v) => html `<slot name="${v.slot}" ></slot>`)}`;
    }
    _bar() {
        return html `
    ${[...this.children].map((v, i) => html `<a
    class=${classMap({ active: !this.split && (this.index == v.slot) })}
    @click=${() => { this.resetindex(v.slot, i); }}>${v.slot}</a>`)}
    `;
    }
    firstUpdated() {
        if (!this.split) {
            [...this.children].forEach((v, i) => {
                if (v.slot == this.index) {
                    this.current = i;
                }
            });
            if (this.v) {
                [...this.children].forEach(v => v.style.height = '0');
                this.children[this.current].style.height = '100%';
            }
            else {
                [...this.children].forEach(v => v.style.width = '0');
                this.children[this.current].style.width = '100%';
            }
        }
    }
    resetindex(name, current) {
        if (this.split)
            this.index = null;
        if (this.index === name) {
            if (this._act) {
                this._act.classList.remove('active');
                if (this.v)
                    [...this.children].forEach(v => v.style.height = '100%');
                else
                    [...this.children].forEach(v => v.style.width = '100%');
                this.index = null;
            }
            return;
        }
        if (this.v)
            this.children[current].style.height = '100%';
        else
            this.children[current].style.width = '100%';
        var other = [...this.children].filter((v, i) => i != current);
        if (this.v)
            other.forEach(v => v.style.height = '0');
        else
            other.forEach(v => v.style.width = '0');
        this.split = false;
        this.index = name;
    }
};
SectionGroup.styles = css `
  :host{
    display: block;
    background-color: inherit;
  }
  .active{
    color:#0095ff;
  }
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
      background-color: inherit;
  }
  div{
    height:100%;
    background-color: inherit;
    display: flex;
    flex-direction: column
  }
  .reversal{
    flex-direction: column-reverse;
  }
  .v{
    flex-direction:row !important;
  }
  .v.reversal{
    flex-direction: row-reverse !important;
  }
  .v nav{
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-evenly;
  }
  a {
    padding: 0.625em 1.25em;
    flex: 1 1 0%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .v main{
    flex-direction: column;
  }
  main{
    background-color: rgb(66, 139, 199);
    display: inline-flex;
    width: 100%;
    height:100%;
  }
  ::slotted(*[slot]){
    overflow: hidden;
    transition: all 0.35s;
  }
  `;
__decorate([
    property()
], SectionGroup.prototype, "index", void 0);
__decorate([
    property({ type: Boolean })
], SectionGroup.prototype, "split", void 0);
__decorate([
    property({ type: Boolean })
], SectionGroup.prototype, "v", void 0);
__decorate([
    property({ type: Boolean })
], SectionGroup.prototype, "reversal", void 0);
SectionGroup = __decorate([
    customElement(name.tag("section-group"))
], SectionGroup);
export { SectionGroup };
let ContentGroup = class ContentGroup extends LitElement {
    constructor() {
        super(...arguments);
        this.sort = "sort";
        this.col = "1fr 1fr";
        this.inner = [];
    }
    get _loading() {
        return this.shadowRoot.querySelector('slot[name="loading"]');
    }
    render() {
        return html `<main style=${styleMap({ "grid-template-columns": this.col })}>
    <slot name="loading" style="background-color:inherit;"></slot>
    ${this._content()}
    </main>`;
    }
    firstUpdated() {
        if (this._loading)
            this._loading.style.display = 'none';
    }
    _content() {
        if (this.sort) {
            let inner = [];
            [...this.children].forEach(e => {
                if (e.getAttribute(this.sort))
                    inner.push({ id: e.getAttribute(this.sort), el: e });
                e.style.display = '';
            });
            this.inner = inner.sort((p, n) => p.id - n.id);
            return html `${repeat(this.inner, (innerdata) => innerdata.id, (innerdata) => html ` ${innerdata.el}`)}`;
        }
        return html `${repeat(this.children, (el) => html `${el}`)}`;
    }
};
ContentGroup.styles = css `
  :host{
    overflow:hidden;
    display:block;
  }
  main{
    height:100%;
    overflow:hidden;
    display:grid;
    grid-template-columns:1fr 1fr;
    justify-items: center;
    align-items: center;
    position: relative;
    background:inherit;
  }
  ::slotted([slot="loading"]){
    position: absolute;
    height:100%;
    width:100%;
    background-color:inherit;
    display: flex;
    align-items: center;
    justify-content: center;
  }`;
__decorate([
    property()
], ContentGroup.prototype, "sort", void 0);
__decorate([
    property()
], ContentGroup.prototype, "col", void 0);
__decorate([
    property({ attribute: false })
], ContentGroup.prototype, "inner", void 0);
ContentGroup = __decorate([
    customElement(name.tag("content-group"))
], ContentGroup);
export { ContentGroup };
