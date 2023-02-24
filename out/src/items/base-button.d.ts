import { LitElement } from "lit";
export declare class BaseButton extends LitElement {
    static styles: import("lit").CSSResult[];
    disabled: boolean;
    ghost: boolean;
    href: string;
    target: string;
    color: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "base-button": BaseButton;
    }
}
//# sourceMappingURL=base-button.d.ts.map