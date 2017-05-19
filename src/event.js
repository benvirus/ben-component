import Dom from './dom';
import GUID from './guid';

const fixEvent = (event) => {

  return event;
}

const Event = {
  on(el, eventType, fn) {
    const data = Dom.getElData(el);

    data.handlers || (data.handlers = {});
    data.handlers[eventType] || (data.handlers[eventType] = []);
    fn.guid || (fn.guid = GUID.newGuid());

    data.handlers[eventType].push(fn);

    if (!data.dispatcher) {
      data.dispatcher = (event, hash) => {
        event = fixEvent(event);
        const handlers = data.handlers[event.type];
        if (handlers) {
          const handlersCopy = handlers.slice(0);
          handlersCopy.map(handler => {
            handler.call(el, event, hash);
          })
        }
      }
    }

    if (data.handlers[eventType].length === 1) {
      if (el.addEventListener) {
        el.addEventListener(eventType, data.dispatcher, false);
      } else if (el.attachEvent) {
        el.attachEvent(`on${eventType}`, data.dispatcher);
      }
    }
  },

  off(el, eventType, fn){
    if (!Dom.hasElData(el)) {
      return;
    }

    const data = Dom.getElData(el);

    if(!data.handlers) {
      return;
    }

    if(!eventType){
      data.handlers = {};
      return;
    }

    const handlers = data.handlers[eventType];

    if(!handlers) {
      return;
    }

    if(!fn){
      data.handlers[eventType] = [];
      return;
    }

    if(fn.guid){
      for(let n = 0; n < handlers.length; n++){
        if(handlers[n].guid === fn.guid) {
          handlers.splice(n--, 1);
        }
      }
    }
  },

  trigger(el, eventType, hash){
    const data = Dom.getElData(el);

    const event = {type: eventType, target: el};

    if(data.dispatcher){
      data.dispatcher.call(el, event, hash)
    }
  },

  one(el, eventType, fn){
    const fun = (...args) => {
      this.off(el, eventType, fun);
      fn.apply(el, args);
    }
    fun.guid = fn.guid = fn.guid || GUID.newGuid();
    this.on(el, eventType, fun);
  }
}

export default Event;

