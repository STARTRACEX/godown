import { LitElement } from 'lit';
export declare class SignForm extends LitElement {
    static styles: import("lit").CSSResult;
    _from: HTMLFormElement;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    reset(): void;
    namevalue(): {}[];
    FormData(): any;
}
declare global {
    interface HTMLElementTagNameMap {
        'sign-form': SignForm;
    }
}
//# sourceMappingURL=sign-form.d.ts.map