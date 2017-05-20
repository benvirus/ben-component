### What's this component for?

It's a base component template for creating a web component. You can easily to add a event and trigger a event, add a class and remove a class, even to add a child component which is extends this component.

### Usage

##### Base usage

```js
import Component from 'ben-component';

class Button extends Component {
    constructor(parent, options) {
        super(parent, options);
    }

    createEl() {
        return super.createEl('button', {
            className: 'buttom'
        }, {
            innerHTML: 'click me'
        });
    }
}

const button = new Button;
button.on('click', () => {
    console.log(123);
});
button.trigger('click'); // 123;
```

##### add child component

```js
import Component from 'ben-component';

const parent = new Component;
const son = new Component;
parent.addChild(son);
parent.on('a', () => {
    console.log('Parent envent: a');
})
son.on('a', () => {
    console.log('Son envent: a');
    parent.trigger('a');
});

son.trigger('a');
// --------
Son envent: a
Parent envent: a
```

### Change Log

##### 0.0.3 (2017-05-19)
* [feature] Set the parent component as the first argv of constructor.

##### 0.0.2 (2017-05-19)
* [feature] Add component register and get function.

##### 0.0.1 (2017-05-18)
* [feature] Finished the base component create, event functions.

### Contact

Author: Ben Chen
E-mail: chenhaijiao@howzhi.com
