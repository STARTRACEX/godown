var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { name } from "../config.js";
const styled = css `:host{
   --text:rgb(240,240,240);
   --surface:rgb(20,20,88);
   --prop:#1a1a1a;
   --ov-1-1:#AE0CA5;--ov-1-2:#FFD802;
   --ov-2-1:#1fe173;--ov-2-2:#582bca;
   --ov-3-1:#00b4f0;--ov-3-2:#e614e6;
   --ov-deg:60deg;
   --ov-1:linear-gradient(var(--ov-deg),var(--ov-1-1),var(--ov-1-2));
   --ov-2:linear-gradient(var(--ov-deg),var(--ov-2-1),var(--ov-2-2));
   --ov-3:linear-gradient(var(--ov-deg),var(--ov-3-1),var(--ov-3-2))}
.overbreathbord{position:relative;width:120px;height:50px;border-radius:.375em;overflow:hidden;background-color:var(--prop)}.overbreathbord .overbreathbutton{--edge:8.5px;border-radius:inherit;width:calc(100% - var(--edge) - 1.2px);height:calc(100% - var(--edge));border:0;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;background-color:inherit}.overbreath{font-size:inherit;padding-bottom:1rem;display:flex;flex-direction:column;align-items:center}.overbreath .overbreathpart{line-height:1;position:relative}.overbreath .overbreathroot{color:var(--text);position:absolute;top:0}.overbreath .overbreathtext,.overbreath .overbreathroot{white-space:nowrap;box-sizing:border-box;padding-right:2.5px;letter-spacing:-2.5px;width:fit-content;background-clip:text;-webkit-background-clip:text;font-weight:800;font-size:inherit}.overbreath .overbreathtext{box-sizing:border-box;-webkit-text-fill-color:transparent}@media screen and (min-width:1440px){.overbreath{width:fit-content;margin-left:auto;margin-right:auto;flex-direction:row}}.overbreath .overbreathpart:nth-child(1) .overbreathtext{animation:ke_overbreathtext1 8s infinite;background-image:var(--ov-1)}.overbreath .overbreathpart:nth-child(2) .overbreathtext{animation:8s ease 0s infinite normal none running ke_overbreathtext2;background-image:var(--ov-2)}.overbreath .overbreathpart:nth-child(3) .overbreathtext{animation:8s ease 0s infinite normal none running ke_overbreathtext3;background-image:var(--ov-3)}.overbreath .overbreathpart:nth-child(1) .overbreathroot{animation:ke_overbreath1 8s infinite}.overbreath .overbreathpart:nth-child(2) .overbreathroot{animation:ke_overbreath2 8s infinite}.overbreath .overbreathpart:nth-child(3) .overbreathroot{animation:ke_overbreath3 8s infinite}@keyframes ke_overbreathtext1{0%,16.667%,to{opacity:1}33.333%,83.333%{opacity:0}}@keyframes ke_overbreathtext2{0%,to{opacity:0}33.333%,50%{opacity:1}16.667%,66.667%{opacity:0}}@keyframes ke_overbreathtext3{0%,50%,to{opacity:0}66.667%,83.333%{opacity:1}}@keyframes ke_overbreath1{0%,16.667%,to{opacity:0}25%,91.667%{opacity:1}}@keyframes ke_overbreath2{0%,to{opacity:1}33.333%,50%{opacity:0}25%,58.333%{opacity:1}}@keyframes ke_overbreath3{0%,58.333%,91.667%,to{opacity:1}66.667%,83.333%{opacity:0}}.overbreathflow{animation:8s linear infinite breathflow;height:100%;width:100%}@keyframes breathflow{0%,100%{opacity:1;background-image:var(--ov-1)}33.33%{opacity:1;background-image:var(--ov-2)}16.66%,50.33%,83%{opacity:0}66.67%{opacity:1;background-image:var(--ov-3)}}
`;
let OVText = class OVText extends LitElement {
    constructor() {
        super(...arguments);
        this.t1 = `Text I.`;
        this.t2 = `Text II..`;
        this.t3 = `Text III...`;
    }
    render() {
        return html `<div class="overbreath"><span class="overbreathpart"><span class="overbreathroot">${this.t1}</span><span class="overbreathtext">${this.t1}</span></span><span class="overbreathpart"><span class="overbreathroot">${this.t2}</span><span class="overbreathtext">${this.t2}</span></span><span class="overbreathpart"><span class="overbreathroot">${this.t3}</span><span class="overbreathtext">${this.t3}</span></span></div>`;
    }
};
OVText.styles = [styled, css `:host{font-size:clamp(4.5rem,10vw,6rem);}`];
__decorate([
    property()
], OVText.prototype, "t1", void 0);
__decorate([
    property()
], OVText.prototype, "t2", void 0);
__decorate([
    property()
], OVText.prototype, "t3", void 0);
OVText = __decorate([
    customElement(name.tag("ov-text"))
], OVText);
export { OVText };
let OVPort = class OVPort extends LitElement {
    render() {
        return html `<div class="overbreathflow"><slot></slot></div>`;
    }
};
OVPort.styles = styled;
OVPort = __decorate([
    customElement(name.tag("ov-port"))
], OVPort);
export { OVPort };
let OVButton = class OVButton extends LitElement {
    render() {
        return html `<div class="overbreathbord"><div class="overbreathflow"></div><button class="overbreathbutton"><slot></slot></button></div>`;
    }
};
OVButton.styles = [styled, css `::slotted(*){
      background-color: transparent;
      border:0;
      color:rgb(240 240 240);
  }`];
OVButton = __decorate([
    customElement(name.tag("ov-button"))
], OVButton);
export { OVButton };
