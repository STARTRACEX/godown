import { LitElement } from 'lit';
export declare class SplitInput extends LitElement {
    static styles: import("lit").CSSResult[];
    name: string;
    value: string;
    max: number;
    index: number;
    private _input;
    private _spans;
    current: number;
    currentValue: Array<string | null>;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    namevalue(): string[];
    private _handleInput;
    focu(i?: number): void;
    blur(i?: number): void;
}
//# sourceMappingURL=split-input.d.ts.map