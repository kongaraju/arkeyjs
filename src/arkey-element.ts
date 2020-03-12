export class EventData {
  bubbles: boolean = true;
  composed: boolean = true;
  cancelable: boolean = true;
  detail: any = null;
}

export interface ARKElementBaseController {
  onInit();
  onRender();
  onConnected();
  onAttributeChanged(attrName: string, oldVal, newVal);
  onDisconnected();
}

export class ARKElement extends HTMLElement {
  _element: any;
  private _isInitialized: boolean;
  private _isConnected: boolean;
  get isInitialized() {
    return this._isInitialized;
  }
  get isConnected() {
    return this._isConnected;
  }
  _attributes: any;
  _events: object;
  static get observedAttributes() {
    return [];
  }
  constructor(options?) {
    super();
    this._onInit();
  }
  createdCallback() {
    this._onInit();
  }
  private _onInit(): void {
    this.registerProperties();
    this.onInit();
    this._isInitialized = true;
  }
  protected _getProperties() {
    return {};
  }
  protected onRender(): any {
    return "";
  }
  private registerProperties() {
    let props: PropertyDescriptorMap = this._getProperties();
    return props && Object.defineProperties(this, props);
  }
  protected onInit() {}
  attachedCallback() {
    this._onConnected();
  }
  public connectedCallback() {
    this._onConnected();
  }
  private _upgradeProperties(props?: Array<string>) {
    let propsMap: Array<string> = props || Object.keys(this["_properties"]);
    for (const prop of propsMap) {
      this._upgradeProperty(prop);
    }
  }
  private _upgradeProperty(prop: string): void {
    if (this.hasOwnProperty(prop)) {
      let value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }
  private _onConnected(): void {
    //this._upgradeProperties();
    let view: any = this.onRender();
    this.innerHTML = view;
    this._element = this;
    this.onConnected();
    this._isConnected = true;
  }
  protected onConnected() {}
  attributeChangedCallback(attrName: string, oldVal, newVal) {
    this.onAttributeChanged(attrName, oldVal, newVal);
  }
  protected onAttributeChanged(attrName: string, oldVal, newVal) {}
  detachedCallback() {
    this._onDisconnected();
  }
  public disconnectedCallback() {
    this._onDisconnected();
  }
  private _onDisconnected(): void {
    this.onDisconnected();
  }
  protected onDisconnected() {}
  protected dispatchCustomEvent(evName: string, data?: any) {
    if(!this._element){
        return;
    }
    var evData: EventData = new EventData();

    if (data !== undefined) {
      evData.detail = data;
    }

    var event = new CustomEvent(evName, evData);
    this._element.dispatchEvent(event);
  }
}
export default ARKElement;
