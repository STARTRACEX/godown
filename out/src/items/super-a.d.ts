import { LitElement } from "lit";
export declare class SuperAuchor extends LitElement {
    href: string;
    target: string;
    active: string;
    arrow: string;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    _arrowSwitcher(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'super-a': SuperAuchor;
    }
}
//# sourceMappingURL=super-a.d.ts.map