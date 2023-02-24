var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { name } from "../config.js";
let DragBox = class DragBox extends LitElement {
    constructor() {
        super(...arguments);
        this.x = 'auto';
        this.y = 'auto';
    }
    get offsetsWidth() {
        var _a, _b;
        return (_b = (_a = this.offsetParent) === null || _a === void 0 ? void 0 : _a.clientWidth) !== null && _b !== void 0 ? _b : document.body.offsetWidth;
    }
    get offsetsHeight() {
        var _a, _b;
        return (_b = (_a = this.offsetParent) === null || _a === void 0 ? void 0 : _a.clientHeight) !== null && _b !== void 0 ? _b : document.body.offsetHeight;
    }
    render() {
        return html `
    <div @mousedown=${this._startDrag} @mouseup=${this._endDrag} >
      <slot></slot>
    </div>`;
    }
    firstUpdated() {
        this.reset();
        document.addEventListener('mouseup', this._endDrag.bind(this));
    }
    _startDrag(e) {
        this.cx = e.clientX;
        this.cy = e.clientY;
        this.t = this.offsetTop;
        this.l = this.offsetLeft;
        this.drag = true;
        document.addEventListener('mousemove', this._handleDrag.bind(this));
    }
    _endDrag() {
        this.drag = false;
        document.removeEventListener('mousemove', this._handleDrag.bind(this));
    }
    _handleDrag(e) {
        if (!this.drag)
            return;
        var nl = e.clientX - (this.cx - this.l);
        var nt = e.clientY - (this.cy - this.t);
        if (nl < 0) {
            this.style.left = '0';
        }
        else if (nl < this.offsetsWidth - this.offsetWidth) {
            this.style.left = `${nl}px`;
        }
        else {
            this.style.left = `${this.offsetsWidth - this.offsetWidth}'px'`;
        }
        if (nt < 0) {
            this.style.top = '0';
        }
        else if (nt < this.offsetsHeight - this.offsetHeight) {
            this.style.top = `${nt}px`;
        }
        else {
            this.style.top = `${this.offsetsHeight - this.offsetHeight}px`;
        }
    }
    reset() {
        this.style.left = this.x || '0';
        this.style.top = this.y || '0';
        if (this.offsetLeft > this.offsetsWidth - this.offsetWidth) {
            this.style.left = `${this.offsetsWidth - this.offsetWidth}px`;
        }
        if (this.offsetTop > this.offsetsHeight - this.offsetHeight) {
            this.style.top = `${this.offsetsHeight - this.offsetHeight}px`;
        }
    }
};
DragBox.styles = css `:host{
    position:relative;
    display: inline-flex;
  }`;
__decorate([
    property()
], DragBox.prototype, "x", void 0);
__decorate([
    property()
], DragBox.prototype, "y", void 0);
DragBox = __decorate([
    customElement(name.tag('drag-box'))
], DragBox);
export { DragBox };
