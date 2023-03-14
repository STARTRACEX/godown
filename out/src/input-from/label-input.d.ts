import { LitElement } from 'lit';
declare type inputtype = "hidden" | "text" | "search" | "tel" | "url" | "email" | "password" | "datetime" | "date" | "month" | "week" | "time" | "datetime-local" | "number" | "range" | "color" | "checkbox" | "radio" | "file" | "image";
export declare class LabelInput extends LitElement {
    type: inputtype;
    label: string;
    def: string;
    pla: any;
    name: string;
    value: string;
    static styles: import("lit").CSSResult[];
    private _input;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    _handleInput(i: any): void;
    reset(): void;
    _passwordSwitcher(): void;
    namevalue(): string[];
}
declare global {
    interface HTMLElementTagNameMap {
        'label-input': LabelInput;
    }
}
export {};
//# sourceMappingURL=label-input.d.ts.map