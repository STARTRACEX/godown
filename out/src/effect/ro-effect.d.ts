import { LitElement } from "lit";
export declare class ROPort extends LitElement {
    index: number;
    autochange: number;
    static styles: import("lit").CSSResult;
    current: number;
    get assigned(): any;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    show(i: any): void;
    next(): void;
    prev(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "ro-effect": ROPort;
    }
}
//# sourceMappingURL=ro-effect.d.ts.map