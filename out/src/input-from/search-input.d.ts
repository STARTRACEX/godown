import { LitElement } from 'lit';
export declare class SearchInput extends LitElement {
    query: string;
    target: string;
    infer: boolean;
    remote: boolean;
    action: string;
    method: "get" | "post";
    name: string;
    value: string;
    list: any[];
    submit: (x: any) => string[];
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
    _handleSubmit(e: any): void;
    _handleInput(e: any): void;
}
export declare class SearchW extends LitElement {
    static styles: import("lit").CSSResult;
    action: string;
    name: string;
    pla: string;
    origin: string;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "search-input": SearchInput;
        "search-w": SearchW;
    }
}
//# sourceMappingURL=search-input.d.ts.map