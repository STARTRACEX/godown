import { LitElement } from 'lit';
declare type inputtype = "hidden" | "text" | "search" | "tel" | "url" | "email" | "password" | "datetime" | "date" | "month" | "week" | "time" | "datetime-local" | "number" | "range" | "color" | "checkbox" | "radio" | "file" | "image";
export declare class ExpInput extends LitElement {
    static styles: import("lit").CSSResult[];
    label: string;
    name: string;
    pla: any;
    type: inputtype | "textarea";
    value: string;
    def: string;
    base: "outline" | "filed" | "underline";
    offset: string;
    private _input;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    _handleInput(i: any): void;
    reset(): void;
    namevalue(): string[];
}
export {};
//# sourceMappingURL=exp-input.d.ts.map