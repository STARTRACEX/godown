import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { name } from "../config";
import { DetailsItem } from "../items";
@customElement(name.tag("details-group"))
export class DetailsGroup extends LitElement {
  @property() index = 0;
  @property({ type: Boolean }) only = false;
  pre: number;
  constructor() {
    super();
    this.pre = 0;
    this.addEventListener("click", this._handleClick);
  }
  render() {
    return html`
    <slot></slot>
    `;
  }
  firstUpdated() {
    const opened = this.shadowRoot.querySelector("slot").assignedElements()[this.index] as DetailsItem;
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
        const opened = this.shadowRoot.querySelector("slot").assignedElements()[this.pre] as DetailsItem;
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
    const opened = this.shadowRoot.querySelector("slot").assignedElements()[this.index] as DetailsItem;
    if (opened) {
      if (!opened.open) {
        opened.toggle();
      }
      opened.setAttribute("open", "");
    }
    this.shadowRoot.querySelector("slot").assignedElements().forEach((e, i) => {
      if (i != this.index) {
        if ((<DetailsItem>e).open) {
          (<DetailsItem>e).toggle();
        }
        e.removeAttribute("open");
      }
    });
    this.pre = this.index;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "details-group": DetailsGroup;
  }
}