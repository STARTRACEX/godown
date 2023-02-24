var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { name } from "../config.js";
let DownDrop = class DownDrop extends LitElement {
    render() {
        return html `<main>
    <slot name="hover"></slot>
    <slot name="focus" @click=${this.toggle}></slot>
    <div><slot></slot></div>
    </main>`;
    }
    firstUpdated() {
        if (this.querySelector('[slot="focus"]')) {
            document.addEventListener('click', (e) => {
                if (!this.contains(e.target)) {
                    this.close();
                }
            });
        }
        this.asyncrect();
    }
    async asyncrect() {
        return new Promise(() => {
            setTimeout(() => {
                this.rect();
            }, 0);
        });
    }
    rect() {
        var _a;
        const offsets = ((_a = this.offsetParent) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()) || document.body.getBoundingClientRect();
        const div = this.div;
        const divLeft = div.getBoundingClientRect().left;
        const divTop = div.getBoundingClientRect().top;
        const divRight = div.getBoundingClientRect().right;
        const RightWidth = offsets.width - (divRight - offsets.x);
        const LeftWidth = offsets.width - (offsets.right - divLeft);
        if (divLeft < 0) {
            div.style.transform = `translateX(${-LeftWidth}px)`;
        }
        else if (divRight > offsets.right) {
            div.style.transform = `translateX(${RightWidth}px)`;
        }
        else {
            div.style.transform = `translateX(0)`;
        }
    }
    close() {
        this.div.style.visibility = "hidden";
    }
    open() {
        this.div.style.visibility = "visible";
    }
    toggle() {
        this.div.style.visibility === "visible" ? this.close() : this.open();
    }
};
DownDrop.styles = css `
  main{
    height:100%;
    width:100%;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
  }
  div{
    background-color:inherit;
    position: absolute;
    visibility: hidden;
    top:100%;
  }
  slot[name="hover"]:hover~div,div:hover{
    visibility: visible;
  }
  `;
__decorate([
    query('div')
], DownDrop.prototype, "div", void 0);
DownDrop = __decorate([
    customElement(name.tag('down-drop'))
], DownDrop);
export { DownDrop };
