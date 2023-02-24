import { LitElement } from "lit";
export declare class MenuList extends LitElement {
    summary: string;
    open: boolean;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    toggle(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "menu-list": MenuList;
    }
}
//# sourceMappingURL=menu-list.d.ts.map