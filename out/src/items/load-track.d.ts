import { LitElement } from 'lit';
export declare class LoadTrack extends LitElement {
    static styles: import("lit").CSSResult[];
    current: number;
    max: number;
    min: number;
    modify: boolean;
    set value(val: string);
    get value(): string;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    parsePercent(s?: string): number;
    _handleClick(e: any): void;
    namevalue(): string[];
}
//# sourceMappingURL=load-track.d.ts.map