var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { name, append } from "../config.js";
let AvatarGroup = class AvatarGroup extends LitElement {
    constructor() {
        super(...arguments);
        this.rank = false;
        this.max = 0;
    }
    get assigned() {
        return this.shadowRoot.querySelector('slot').assignedElements();
    }
    render() {
        if (this.rank)
            return html `<slot style="display: flex;flex-direction: row;"></slot>`;
        else {
            return html `<div><slot></slot></div>`;
        }
    }
    firstUpdated() {
        var _a;
        if (this.rank) {
            this.assigned.forEach((ava) => { ava.style.maxWidth = '2em'; });
            if (((_a = this.assigned[0]) === null || _a === void 0 ? void 0 : _a.call) == 'right')
                this.style.alignItems = 'flex-end';
        }
        if (this.max && this.assigned.length > this.max) {
            const length = this.assigned.length;
            console.log(this.assigned.length, this.max);
            this.assigned.slice(this.max).forEach(ava => ava.remove());
            // 添加more
            append(this, { tag: name.tag('avatar-anchor'), props: { more: length - this.max, } });
        }
    }
    append(args, bool) {
        if (this.max && this.assigned.length == this.max) {
            append(this, { tag: name.tag('avatar-anchor'), props: { more: '1', } });
            return;
        }
        if (this.max && this.assigned.length >= this.max) {
            this.assigned[this.max].more += 1;
            return;
        }
        if (!args.props.call)
            args.props.call = bool ? "left" : "right";
        append(this, args);
        if (this.rank) {
            this.assigned.pop().style.maxWidth = '2em';
            if (this.assigned[0].call == 'right')
                this.style.alignItems = 'flex-end';
        }
    }
    subtract() {
        if (this.max && this.assigned.length == this.max) {
            this.assigned[this.max - 1].remove();
            return;
        }
        if (this.max && this.assigned.length > this.max) {
            this.assigned[this.max].more -= 1;
            if (this.assigned[this.max].more == 0)
                this.assigned[this.max].remove();
            return;
        }
        this.assigned.pop().remove();
    }
};
AvatarGroup.styles = css `
  :host{
    display: flex;
    border-radius: 50%;
    flex-direction: column;
  }
  div{
    display: flex;
    flex-direction: inherit;
    flex-wrap: nowrap;
    width: 100%;
    min-width:8em;
    overflow-y: auto;
    overflow-x: hidden;
  }
  div::slotted([call="left"]){
    margin-right: 2.5em;
  }
  div::slotted([call="right"]){
    margin-left: 2.5em;
  }
  `;
__decorate([
    property({ type: Boolean })
], AvatarGroup.prototype, "rank", void 0);
__decorate([
    property({ type: Number })
], AvatarGroup.prototype, "max", void 0);
AvatarGroup = __decorate([
    customElement(name.tag("avatar-group"))
], AvatarGroup);
export { AvatarGroup };
