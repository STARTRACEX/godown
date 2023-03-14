import { LitElement } from 'lit';
declare type inputtype = "hidden" | "text" | "search" | "tel" | "url" | "email" | "password" | "datetime" | "date" | "month" | "week" | "time" | "datetime-local" | "number" | "range" | "color" | "checkbox" | "radio" | "file" | "image";
export declare class BaseInput extends LitElement {
    private _input;
    private _ranged;
    label: string;
    name: string;
    pla: any;
    type: inputtype;
    value: string | number;
    def: string | number;
    min: number;
    max: number;
    step: number;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    _handleRange(e: any): void;
    _handleInput(e: any): void;
    _handelFocus(): void;
    reset(): void;
    _typeSwitcher(): import("lit-html").TemplateResult<1>;
    namevalue(): (string | number)[];
}
declare global {
    interface HTMLElementTagNameMap {
        "base-input": BaseInput;
    }
}
export {};
//# sourceMappingURL=base-input.d.ts.map