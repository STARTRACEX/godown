import { LitElement } from 'lit';
export declare class SplitInput extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    value: string;
    max: number;
    index: number;
    input: HTMLInputElement;
    spans: NodeListOf<HTMLSpanElement>;
    current: number;
    currentValue: Array<string | null>;
    firstUpdated(): void;
    namevalue(): string[];
    private _handleInput;
    focu(i?: number): void;
    blur(i?: number): void;
}
//# sourceMappingURL=split-input.d.ts.map