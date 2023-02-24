var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { name } from "../config.js";
let DetailsGroup = class DetailsGroup extends LitElement {
    constructor() {
        super();
        this.index = 0;
        this.only = false;
        this.pre = 0;
        this.addEventListener("click", this._handleClick);
    }
    render() {
        return html `
    <slot></slot>
    `;
    }
    firstUpdated() {
        const opened = this.shadowRoot.querySelector("slot").assignedElements()[this.index];
        if (opened) {
            if (opened.toggle) {
                opened.toggle();
            }
            opened.setAttribute("open", "");
        }
        this.pre = this.index;
        if (this.only) {
            this.shadowRoot.querySelector("slot").assignedElements().forEach((item, index) => {
                item.setAttribute("only", String(index));
            });
        }
    }
    _handleClick(e) {
        let target = e.target;
        while (target.parentNode != this) {
            target = target.parentNode;
        }
        if (target.hasAttribute("only")) {
            const index = target.getAttribute("only");
            if (this.pre != index) {
                const opened = this.shadowRoot.querySelector("slot").assignedElements()[this.pre];
                if (opened) {
                    if (opened.toggle) {
                        opened.toggle();
                    }
                    opened.removeAttribute("open");
                }
                this.pre = index;
            }
        }
    }
    reset() {
        console.log(this.index);
        const opened = this.shadowRoot.querySelector("slot").assignedElements()[this.index];
        if (opened) {
            if (!opened.open) {
                opened.toggle();
            }
            opened.setAttribute("open", "");
        }
        this.shadowRoot.querySelector("slot").assignedElements().forEach((e, i) => {
            if (i != this.index) {
                if (e.open) {
                    e.toggle();
                }
                e.removeAttribute("open");
            }
        });
        this.pre = this.index;
    }
};
__decorate([
    property()
], DetailsGroup.prototype, "index", void 0);
__decorate([
    property({ type: Boolean })
], DetailsGroup.prototype, "only", void 0);
DetailsGroup = __decorate([
    customElement(name.tag("details-group"))
], DetailsGroup);
export { DetailsGroup };
