var OnAppear = require('on-appear');

var extend = function(obj, props) {
  var newObj = Object.create(obj);

  for(var prop in props) {
    if(props.hasOwnProperty(prop)) {
      newObj[prop] = props[prop];
    }
  }

  return newObj;
};

var AppearAnimation = {
  delay: 0,
  offset: 0,
  instances: [],
  elements: [],

  create: function(obj) {
    return extend(this,  obj);
  },

  init: function() {
    for (var i = 0; i < this.elements.length; i++) {
      var el = this.elements[i];
      this.register(el);
    }
  },

  prepare: function(el, instance) {
    // To implement
  },

  run: function(el, instance) {
    // To implement
  },

  register: function(el) {
    var _this = this;
    var instance = new OnAppear(el, {
      delay: this.delay,
      offset: this.offset,
      callback: function() {
        _this.run(el, this);
      }
    });

    this.prepare(el, instance);
    this.instances.push(instance);
  },

  destroy: function() {
    for (var i = 0; i < this.instances.length; i++) {
      this.instances[i].destroy();
    }
  }
};

module.exports = AppearAnimation;
