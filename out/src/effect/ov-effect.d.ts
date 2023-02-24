import { LitElement } from 'lit';
export declare class OVText extends LitElement {
    static styles: import("lit").CSSResult[];
    t1: string;
    t2: string;
    t3: string;
    render(): import("lit-html").TemplateResult<1>;
}
export declare class OVPort extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
export declare class OVButton extends LitElement {
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ov-text': OVText;
        'ov-port': OVPort;
        'ov-button': OVButton;
    }
}
//# sourceMappingURL=ov-effect.d.ts.map