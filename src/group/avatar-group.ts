import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { name, append } from "../config";
@customElement(name.tag("avatar-group"))
export class AvatarGroup extends LitElement {
  @property({ type: Boolean }) rank = false;
  @property({ type: Number }) max = 0;
  static styles = css`
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
  get assigned(): any {
    return this.shadowRoot.querySelector('slot').assignedElements();
  }
  render() {
    if (this.rank)
      return html`<slot style="display: flex;flex-direction: row;"></slot>`;
    else {
      return html`<div><slot></slot></div>`;
    }
  }
  firstUpdated() {
    if (this.rank) {
      this.assigned.forEach((ava: HTMLElement) => { ava.style.maxWidth = '2em'; });
      if (this.assigned[0]?.call == 'right')
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
}