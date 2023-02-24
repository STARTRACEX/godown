import { LitElement } from 'lit';
export declare class TWText extends LitElement {
    autochange: number;
    max: number;
    min: number;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    rewrite(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "tw-text": TWText;
    }
}
//# sourceMappingURL=tw-effect.d.ts.map