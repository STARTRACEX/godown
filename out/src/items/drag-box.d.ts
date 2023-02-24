import { LitElement } from 'lit';
export declare class DragBox extends LitElement {
    x: string;
    y: string;
    static styles: import("lit").CSSResult;
    get offsetsWidth(): number;
    get offsetsHeight(): number;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    drag: boolean;
    t: number;
    l: number;
    cx: number;
    cy: number;
    _startDrag(e: MouseEvent): void;
    _endDrag(): void;
    _handleDrag(e: MouseEvent): void;
    reset(): void;
}
//# sourceMappingURL=drag-box.d.ts.map