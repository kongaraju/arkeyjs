export interface ARKElementConfig {
  name: string;
  controller;
}
export class ARKElementsFactory {
  constructor() {}
  register(options: ARKElementConfig) {
    if ("customElements" in window && "define" in window.customElements) {
      window!.customElements!.define(options.name, options.controller);
    } else if ("registerElement" in document) {
      (<any>document)!.registerElement(options.name, options.controller);
    } else {
      console.error(
        "Custom Elements spec is not supported!. Please use polyfill to use custom elements."
      );
    }
  }
}
