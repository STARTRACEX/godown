import { LitElement } from 'lit';
export declare class DownDrop extends LitElement {
    static styles: import("lit").CSSResult;
    private div;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    asyncrect(): Promise<unknown>;
    rect(): void;
    close(): void;
    open(): void;
    toggle(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'down-drop': DownDrop;
    }
}
//# sourceMappingURL=down-drop.d.ts.map