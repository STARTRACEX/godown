import { html, css, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { name } from '../config';
@customElement(name.tag('down-drop'))
export class DownDrop extends LitElement {
  static styles = css`
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
  @query('div') private div: HTMLDivElement;
  render() {
    return html`<main>
    <slot name="hover"></slot>
    <slot name="focus" @click=${this.toggle}></slot>
    <div><slot></slot></div>
    </main>`;
  }
  firstUpdated() {
    if (this.querySelector('[slot="focus"]')) {
      document.addEventListener('click', (e) => {
        if (!this.contains(e.target as HTMLElement)) {
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
    const offsets = this.offsetParent?.getBoundingClientRect() || document.body.getBoundingClientRect();
    const div = this.div;
    const divLeft = div.getBoundingClientRect().left;
    const divRight = div.getBoundingClientRect().right;
    const RightWidth = offsets.width - (divRight - offsets.x);
    const LeftWidth = offsets.width - (offsets.right - divLeft);
    if (divLeft < 0) {
      div.style.transform = `translateX(${-LeftWidth}px)`;
    } else if (divRight > offsets.right) {
      div.style.transform = `translateX(${RightWidth}px)`;
    } else {
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
}
declare global {
  interface HTMLElementTagNameMap {
    'down-drop': DownDrop;
  }
}