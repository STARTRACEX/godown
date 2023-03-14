import { LitElement } from 'lit';
export declare class SelectInput extends LitElement {
    static styles: import("lit").CSSResult;
    pla: string;
    m: boolean;
    def: string;
    autofocus: boolean;
    value: any[];
    name: string;
    text: Array<string>;
    get assigned(): any;
    private _input;
    private _aside;
    render(): import("lit-html").TemplateResult<1>;
    lists(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    select(value: string, text?: string): void;
    focus(): void;
    close(): void;
    open(): void;
    _handleInput(): void;
    namevalue(): any[];
    reset(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "select-input": SelectInput;
    }
}
//# sourceMappingURL=select-input.d.ts.map