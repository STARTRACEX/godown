import * as React from 'react';
import * as X from "../src/layout/index.js";
import { createComponent } from '@lit-labs/react';
export const NavLayout = createComponent({
    tagName: 'nav-layout',
    elementClass: X.NavLayout,
    react: React
});
export const AsideNav = createComponent({
    tagName: 'aside-nav',
    elementClass: X.AsideNav,
    react: React
});
export const DownDrop = createComponent({
    tagName: 'down-drop',
    elementClass: X.DownDrop,
    react: React
});
export const DivierLine = createComponent({
    tagName: 'divier-line',
    elementClass: X.DivierLine,
    react: React
});
