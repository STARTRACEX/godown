var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { name, theme } from "../config.js";
let SearchInput = class SearchInput extends LitElement {
    constructor() {
        super(...arguments);
        this.query = "";
        this.target = "";
        this.infer = false;
        this.remote = false;
        this.action = "./";
        this.method = "get";
        this.name = "q";
        this.value = "";
        this.list = null;
        this.submit = (x) => {
            console.table(x);
            console.error("You need to process the acquired data\nuse\nelement.submit=(x)=>{...}\nor\nelement.submit=function(x){...}\nreturn a array or null");
            return ["No function for infer"];
        };
    }
    render() {
        return html `<form action=${this.action} method=${this.method}>
      <input name=${this.name} @input=${this._handleInput} autocomplete="off" value=${this.value} >
      <button @click=${this._handleSubmit} type="submit">
        <svg viewBox="0 0 1024 1024" width="100%" height="100%"><path d="M745.429333 655.658667c1.173333 0.746667 2.325333 1.578667 3.413334 2.496l114.410666 96a32 32 0 0 1-41.152 49.024l-114.389333-96a32 32 0 0 1-6.208-6.976A297.429333 297.429333 0 0 1 512 768c-164.949333 0-298.666667-133.717333-298.666667-298.666667S347.050667 170.666667 512 170.666667s298.666667 133.717333 298.666667 298.666666a297.386667 297.386667 0 0 1-65.237334 186.325334zM512 704c129.6 0 234.666667-105.066667 234.666667-234.666667s-105.066667-234.666667-234.666667-234.666666-234.666667 105.066667-234.666667 234.666666 105.066667 234.666667 234.666667 234.666667z"  p-id="9859"></path><path d="M512 298.666667c47.146667 0 89.813333 19.093333 120.682667 49.984l-0.085334 0.085333a21.333333 21.333333 0 1 1-31.210666 28.992A127.573333 127.573333 0 0 0 512 341.333333a21.333333 21.333333 0 0 1 0-42.666666z"  p-id="9860"></path></svg>
    </button>
      ${this.list ? html `
        <ul>${this.list.map((v, i) => html `
          <li key=${i}>
          ${v}
          </li>`)}
        </ul>` : ""}
    </form>`;
    }
    _handleSubmit(e) {
        if (!this.remote)
            e.preventDefault();
        this.dispatchEvent(new CustomEvent('submit', { detail: { value: this.value } }));
    }
    _handleInput(e) {
        const value = e.target.value.trim();
        if (this.remote) {
            if (value) {
                const x = { value };
                this.list = this.submit(x);
            }
            else {
                this.list = null;
            }
            return;
        }
        if (this.target && this.query) {
            if (!value) {
                document.querySelector(this.target).innerHTML = "";
                return;
            }
            var query = document.querySelectorAll(this.query);
            if (query.length) {
                let target = document.querySelector(this.target);
                target.innerHTML = "";
                query.forEach(element => {
                    let e = element;
                    if (e.innerText.includes(value)) {
                        target.appendChild(element.cloneNode(true));
                    }
                });
            }
        }
        this.dispatchEvent(new CustomEvent("input", { detail: { value } }));
    }
};
SearchInput.styles = [theme, css `
  :host{
    display: inline-flex;
    border-radius: 15.6px;
    background-color:  var(--input-background);
  }
  form{
    background-color:inherit;
    color:var(--text);
    border-radius:inherit;
    padding:0;position:relative;width:100%;position:relative;margin:0}button{position:absolute;right:0;padding-left:0}ul{border-top:var(--text) 1px solid;margin:0;list-style:none;padding:.5em}li{margin:.5px;padding-left:5px}button,input{height:36px;border:0;background-color:transparent;outline:none}input{--pl:.75em;--mr:42px;margin-right:var(--mr);padding-left:var(--pl);width: calc(100% - var(--pl) - var(--mr));height:2em;padding-right:0;font-size:18px;color:var(--text)}svg path{fill:currentColor}`
];
__decorate([
    property()
], SearchInput.prototype, "query", void 0);
__decorate([
    property()
], SearchInput.prototype, "target", void 0);
__decorate([
    property({ type: Boolean })
], SearchInput.prototype, "infer", void 0);
__decorate([
    property({ type: Boolean })
], SearchInput.prototype, "remote", void 0);
__decorate([
    property()
], SearchInput.prototype, "action", void 0);
__decorate([
    property()
], SearchInput.prototype, "method", void 0);
__decorate([
    property()
], SearchInput.prototype, "name", void 0);
__decorate([
    property()
], SearchInput.prototype, "value", void 0);
__decorate([
    property({ type: Array })
], SearchInput.prototype, "list", void 0);
__decorate([
    property({ type: Function })
], SearchInput.prototype, "submit", void 0);
SearchInput = __decorate([
    customElement(name.tag('search-input'))
], SearchInput);
export { SearchInput };
const e = [
    { action: "https://www.google.com/search", name: "q", pla: "Google" },
    { action: "https://www.baidu.com/s", name: "wd", pla: "百度" },
    { action: "https://quark.sm.cn/s", name: "q", pla: "Quark" },
    { action: "https://www.bing.com/search", name: "q", pla: "Bing" },
    { action: "https://www.sogou.com/web", name: "query", pla: "搜狗" },
    { action: "https://yandex.com/search/", name: "text", pla: "Yandex" },
    { action: "https://www.qwant.com/", name: "q", pla: "Qwant", },
];
let SearchW = class SearchW extends LitElement {
    constructor() {
        super();
        this.action = "";
        this.name = "";
        this.pla = "";
        this.origin = "";
        Object.assign(this, e[Math.floor(Math.random() * e.length)]);
    }
    render() {
        if (this.origin) {
            Object.assign(this, e.find(v => v.pla === this.origin));
        }
        return html `<form action=${this.action} method="get" target="_blank">
      <input name=${this.name} placeholder=${this.pla} />
      <button type="submit" aria-label="Search">
        <svg viewBox="0 0 18 18"><path d="M7.25 0C3.254 0 0 3.254 0 7.25s3.254 7.25 7.25 7.25c1.727 0 3.316-.61 4.563-1.625l4.906 4.906a.757.757 0 0 0 .73.207.766.766 0 0 0 .54-.539.757.757 0 0 0-.208-.73l-4.906-4.907A7.202 7.202 0 0 0 14.5 7.25C14.5 3.254 11.246 0 7.25 0Zm0 1.5A5.74 5.74 0 0 1 13 7.25c0 1.55-.613 2.953-1.605 3.984a1.035 1.035 0 0 0-.16.16A5.726 5.726 0 0 1 7.25 13 5.74 5.74 0 0 1 1.5 7.25 5.74 5.74 0 0 1 7.25 1.5Z" fill="currentColor" fill-rule="nonzero"></path>
        </svg>
      </button>
    </form>`;
    }
};
SearchW.styles = css `form{height: 2.5em;box-sizing:border-box;position:relative}input{height:100%;width:100%;font-size:1rem;margin:0;justify-content:center;outline:none;flex:1;padding-left:1.5em;padding-right:3.5em;border-radius:100px;border:1px solid #1a1a1a;background-color:transparent;color:#1a1a1a;box-shadow:none !important}button:hover{background-color:rgb(20 69 155)}button{margin:0;background:none transparent;border-spacing:0;text-align:left;align-items:center;justify-content:center;outline:none;border:none;display:inline-flex;transition:background-color .2s cubic-bezier(.165,.84,.44,1) 0ms,color .2s cubic-bezier(.165,.84,.44,1) 0ms,border .2s cubic-bezier(.165,.84,.44,1) 0ms,box-shadow .2s cubic-bezier(.165,.84,.44,1) 0ms;box-shadow:0 2px 4px 0 rgba(0,0,0,.2);padding:0 .25em 0 0;border-radius:0 100px 100px 0;font-size:1em;position:absolute;top:0;right:0;height:100%;width:3.5em;background-color:#1a1a1a}svg{text-indent:0;font-size:1em;color:#fafafa;width:1em;height:1em}`;
__decorate([
    property()
], SearchW.prototype, "action", void 0);
__decorate([
    property()
], SearchW.prototype, "name", void 0);
__decorate([
    property()
], SearchW.prototype, "pla", void 0);
__decorate([
    property()
], SearchW.prototype, "origin", void 0);
SearchW = __decorate([
    customElement(name.tag("search-w"))
], SearchW);
export { SearchW };
