
ArkeyJS is a custom elements ployfills which can run on any browser irrespective the supported webcomponents custom elments specification.

### To create and register a new custom element

```js
    import {ARKElementsFactory, ARKElement} from 'arkeyjs';

    class ElementClass extends ARKElement {
        static get observedAttributes(){
            return [];
        }
        onInit(){} //To initialize component
        onRender(){} //To pass view to render
        onConnected(){} //To catch and do operations on DOM
        onAttributeChanged(){} //To identify attribute changes
        onDisconnected(){} //To destroy view
    }

    ARKElementsFactory.register('element-name', ElementClass);
```

