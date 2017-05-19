import Dom from './dom.js';
import Event from './event.js';

class Component {
  constructor(player){
    this.player = player;
    this.containerEl = this.containerEl();
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

  createEl(elType, attrs = {}, props = {}){
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

  containerEl(){

  }
}

export default Component;