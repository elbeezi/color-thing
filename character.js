const Character = {
  _size: null,
  _x: null,
  _y: null,

  domObject: null,

  get size() {
    return this._size;
  },

  set size(value) {
    value = +value;
    this._size = value;
    this._setAttrDOM('height', value);
    this._setAttrDOM('width', value);
  },

  get x() {
    return this._x;
  },

  set x(value) {
    value = +value;
    this._x = value;
    this._setAttrDOM('x', value);
  },

  get y() {
    return this._y;
  },

  set y(value) {
    value = +value;
    this._y = value;
    this._setAttrDOM('y', value);
  },

  create(options) {

    if (options) {
      for (item in options) {
        this[item] = options[item];
      }
    }

    return this;
  },

  _setAttrDOM(attr, value) {
    this.domObject.setAttribute(attr, value);
  }
};
