var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { name, theme } from "../config.js";
let LoadTrack = class LoadTrack extends LitElement {
    constructor() {
        super(...arguments);
        this.current = 20;
        this.max = 1;
        this.min = 0;
        this.modify = false;
    }
    set value(val) {
        if (val === null || val === undefined || val === "") {
            this.removeAttribute("value");
            // return;
        }
        else {
            this.setAttribute("value", val);
        }
        this.current = this.parsePercent(val || "20");
    }
    get value() {
        return this.getAttribute("value");
    }
    render() {
        return html `<div class="progress" @click=${this._handleClick} ><i style="width:${this.current}%;"><slot></slot></i></div>`;
    }
    firstUpdated() {
        this.current = this.parsePercent(this.value);
    }
    parsePercent(s = "0") {
        if (String(s).includes("%")) {
            return parseFloat(s);
        }
        return parseFloat(s) / (this.max - this.min) * 100;
    }
    _handleClick(e) {
        if (this.modify) {
            this.value = ((e.offsetX / this.offsetWidth) * (this.max - this.min)).toString();
            this.dispatchEvent(new CustomEvent("change", { detail: e.offsetX / this.offsetWidth }));
        }
    }
    namevalue() {
        return [this.getAttribute("name"), this.getAttribute("value")];
    }
};
LoadTrack.styles = [theme, css `
  :host,div{
    display:inline-flex;
  }
  .progress {
    position: relative;
    width: 10em;
    height: .5em;
    border-radius: .25em;
    background-color: var(--input-false);
    z-index: 1;
  }
  .progress i {
    position: absolute;
    border-radius: inherit;
    top: 0;
    left: 0;
    height: 100%;
    width: 20%;
    background-color: var(--input-true);
    z-index: 2;
    transition: all .3s;
    animation: progress 1.5s ease-in-out infinite alternate;
  }
  @keyframes progress {
    from {
      left: 0%;
    }
    to {
      left: 80%;
    }
  }
  .progress[value] i {
    animation: none;
  }
  `];
__decorate([
    property({ attribute: false })
], LoadTrack.prototype, "current", void 0);
__decorate([
    property({ type: Number })
], LoadTrack.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], LoadTrack.prototype, "min", void 0);
__decorate([
    property({ type: Boolean })
], LoadTrack.prototype, "modify", void 0);
LoadTrack = __decorate([
    customElement(name.tag('load-track'))
], LoadTrack);
export { LoadTrack };
