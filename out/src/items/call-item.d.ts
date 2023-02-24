import { LitElement } from "lit";
export declare class AlertItem extends LitElement {
    static styles: import("lit").CSSResult;
    call: string;
    autoclose: number;
    title: string;
    content: string;
    render(): import("lit-html").TemplateResult<1>;
    close(): void;
}
export declare class DialogItem extends LitElement {
    static styles: import("lit").CSSResult;
    key: boolean;
    scale: boolean;
    model: boolean;
    call: string;
    tempmodel: boolean;
    get _aside(): HTMLElement;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    show(): void;
    showModel(): void;
    close(): void;
    _handleClick(): void;
    _handleWheel(e: any): void;
    _handleKeydown(e: any): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "alert-item": AlertItem;
        "dialog-item": DialogItem;
    }
}
//# sourceMappingURL=call-item.d.ts.map