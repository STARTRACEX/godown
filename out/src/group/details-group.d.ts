import { LitElement } from "lit";
export declare class DetailsGroup extends LitElement {
    index: number;
    only: boolean;
    pre: number;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    _handleClick(e: any): void;
    reset(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "details-group": DetailsGroup;
    }
}
//# sourceMappingURL=details-group.d.ts.map