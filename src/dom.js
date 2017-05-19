import GUID from './guid';

const elData = {};

const elIdAttr = 'cdata' + (+new Date());

class Dom {
  static createEl(elType = 'div', attrs = {}, props = {}) {
    let el = document.createElement(elType);
    Object.keys(attrs).map((key) => {
      el.setAttribute(key, attrs[key]);
    });
    Object.keys(props).map((key) => {
      el[key] = props[key];
    })
    return el;
  }

  static hasClass(el, className){
    let classList = Array.from(el.classList);
    return classList.indexOf(className) === -1 ? false : true;
  }

  static addClass(el, className) {
    let classList = Array.from(el.classList);
    if (classList.indexOf(className) === -1) {
      classList.push(className);
    }
    el.className = classList.join(' ');
  }

  static removeClass(el, className) {
    let classList = Array.from(el.classList);
    let index = classList.indexOf(className);
    if (index !== -1) {
      classList.splice(index, 1);
    };
    el.className = classList.join(' ');
  }

  static getElData(el) {
    let id = el[elIdAttr];

    if (!id) {
      id = el[elIdAttr] = GUID.newGuid();
    }

    if (!elData[id]) {
      elData[id] = {}
    }

    return elData[id];
  }

  static hasElData(el) {
    let id = el[elIdAttr];

    if (!id) {
      return false;
    }

    return !!Object.getOwnPropertyNames(elData[id]).length;
  }
}

export default Dom;

