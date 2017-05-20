import Dom from './dom.js';
import Event from './event.js';

const components_ = {};

class Component {
  constructor(parent, options){
    this.parent = parent;
    this.options = options;
    this.el = this.createEl();
  }

  on(eventType, callback){
    Event.on(this.el, eventType, callback);
  }

  one(eventType, callback){
    Event.one(this.el, eventType, callback);
  }

  trigger(eventType, data){
    Event.trigger(this.el, eventType, data)
  }

  createEl(elType = 'div', attrs = {}, props = {}){
    return Dom.createEl(elType, attrs, props);
  }

  addClass(className){
    Dom.addClass(this.el, className);
  }

  removeClass(className){
    Dom.removeClass(this.el, className);
  }

  hasClass(className){
    return Dom.hasClass(this.el, className);
  }

  addChild(component){
    (this.containerEl || this.el).appendChild(component.el);
    this.children || (this.children = []);
    this.children.push(component);
  }

  static registerComponent(name, comp) {
    if (!name) {
      return;
    }

    components_[name] = comp;
    return comp;
  }

  static getComponent(name) {
    if (!name) {
      return;
    }

    if (components_[name]) {
      return components_[name];
    }

    throw new Error('The component you wanna get is not exist!');
  }
}

export default Component;