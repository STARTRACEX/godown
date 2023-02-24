import { LitElement, css, html } from "lit";
import { property, customElement } from "lit/decorators.js";
import { name } from '../config';
@customElement(name.tag("details-item"))
export class DetailsItem extends LitElement {
  @property() summary = "";
  @property({ type: Boolean }) open = false;
  @property({ type: Boolean }) fill = false;
  static styles = css`
  i{
    height: 1.5em;
    width: 1.5em;
    transition: all .3s ease-in-out;
    margin-left: auto;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .open i{
    transform: rotate(-90deg);
  }
  dl{
    padding: inherit;
  }
  dl,dd{
    margin: 0;
    overflow: hidden;
  }
  dt{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .open dd{
    height: var(--height);
  }
  dd{
    height: 0;
    transition: all .3s ease-in-out;
    
  }
  div{
    display: flow-root;
    height:var(--height);
  }
  `;
  render() {
    return html`<dl >
      <dt @click=${this.toggle}>
      ${this.summary}
      <slot name="summary"></slot>
        <i>
          <svg fill="currentColor" viewBox="0 0 16 16"><path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/></svg>
        </i>
        </dt>
      <dd @click=${e => { if (this.fill && this.shadowRoot.contains(e.target)) this.toggle(); }}>
        <div>
          <slot></slot>
        </div>
      </dd>
    </dl>`;
  }
  firstUpdated() {
    if (this.open) {
      this.toggle();
      this.open = true;
    }
  }
  toggle() {
    this.shadowRoot.querySelector("dl").style.setProperty("--height", this.shadowRoot.querySelector("div").clientHeight + "px");
    this.shadowRoot.querySelector("dl").classList.toggle("open");
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent("change", { detail: this.open }));
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "details-item": DetailsItem;
  }
}