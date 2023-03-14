export const name = {
  host:"Host",
  prefix: "",
  suffix: "",
  tag: (origin: string) => name.prefix + origin + name.suffix,
};
import { css } from "lit";
export const theme = css`
/* @layer host{ */
:host{
    
    --text:rgb(240 240 240);
    --shadow: rgb(0 0 0 / 55%);
    --nav-background: rgb(28  28  31);
    --nav-super: rgb(40 160 150 / 55%);
    
    --input-outline: rgb(25, 130, 180);
    --input-outline-focus: rgb(29, 155, 180);
    --input-background: rgb(36, 34, 34);
    --input-background-hover: rgb(42, 42, 42);
    
    --input-control:rgb(244 244 244);
    --input-true: rgb(47 129 237);
    --input-false: rgb(204 204 204);
    
  }
  *{
    color:inherit
  }
/* } */
`;
/**
* Create element with args append to target
* @param target Appended target element or use document.querySelector(target) or document.body
* @param args tag:tag name, props:attribute, children:appended chindren, html:innerHTML
*/
export const append = (target: string | object, args: { tag: any, props?: any, children?: any, html?: any; }) => {
  if (!args) return;
  target = (typeof target === 'string' ? document.querySelector(target) : target) || document.body;
  const element = create(args);
  (target as HTMLElement).appendChild(element);
};
/**
* Create element from args
* @param args tag:tag name, props:attribute, children:appended chindren, html:innerHTML
*/
export const create = (args) => {
  const tag = (typeof args === 'string' ? args : args?.tag) || "div";
  const { props, children, html } = args || {};
  const element = document.createElement(tag);
  if (props) {
    Object.keys(props).forEach((prop) => {
      // element[prop] = props[prop];
      element.setAttribute(prop, props[prop] === true ? '' : props[prop]);
    });
  };
  if (html) element.innerHTML = html;
  if (children) {
    if (children.length) /* Iterators exist */ {
      [...children].forEach((child) => {
        typeof child === "string" ? element.appendChild(document.createTextNode(child)) : element.appendChild(child);
      });
    } else {
      typeof children === "string" ? element.appendChild(document.createTextNode(children)) : element.appendChild(children);
    }
  }
  return element;
};
/**
* Create element with args append to target
* @param map Map of key:selector, value:args
*/
export const retag = (map) => {
  // args是一个映射
  if (!map) return;
  for (let [key, args] of map) {
    // 倒叙遍历
    for (let i = document.querySelectorAll(key).length - 1; i >= 0; i--) {
      const element = document.querySelectorAll(key)[i];
      const tag = (typeof args === 'string' ? args : args?.tag) || "div";
      let props = args.props || {};
      const { children, html = "" } = args;
      [...element.attributes].reduce((acc, attr) => {
        acc[attr.name] = attr.args;
        return acc;
      }, props);
      const newElement = create(
        {
          tag,
          html: html + element.innerHTML,
          props,
          children,
        }
      );
      element.parentNode.replaceChild(newElement, element);
    }
  }
};