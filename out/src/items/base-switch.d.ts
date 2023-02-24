import { LitElement } from "lit";
export declare class BaseSwitch extends LitElement {
    get _input(): HTMLInputElement;
    static styles: import("lit").CSSResult[];
    checked: boolean;
    disabled: boolean;
    fat: boolean;
    def: string;
    name: string;
    value: string;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    reset(): void;
    _handleChange(): void;
    namevalue(): (string | boolean)[];
}
declare global {
    interface HTMLElementTagNameMap {
        "base-switch": BaseSwitch;
    }
}
//# sourceMappingURL=base-switch.d.ts.map