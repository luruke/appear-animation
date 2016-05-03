# appear-animation

Fade Up example

```javascript
var FadeUp = AppearAnimation.create({
  offset: 100,
  delay: 250,
  elements: document.querySelectorAll('.card'),

  prepare: function(el, instance) {
    TweenLite.set(el, { opacity: 0, y: 100 });
  },

  run: function(el, instance) {
    TweenLite.to(el, 0.5, { opacity: 1, y: 0 });
  }
});

FadeUp.init();
```


Complex animation w/ Siblings calculation and Barba.js

```javascript
const AppearAnimation = require('appear-animation');
const Barba = require('barba.js');
const forEach = require('lodash/forEach');

function init(container) {
  var ShowCards = AppearAnimation.create({
    offset: 50,
    delay: 250,
    elements: container.querySelectorAll('.card'),

    prepare: function(el, i) {
      el = $(el);
      i.title = el.find('.card__title');
      i.content = el.find('.card__content');
      i.code = el.find('.card__code');
      i.bg = el.find('.card__bg');
      i.image = el.find('.card__image img');

      if (el.hasClass('card--imagefull')) {
        TweenLite.set(i.image, { y: 10, opacity: 0 });
      } else {
        TweenLite.set(i.image, { x: 25, opacity: 0 });
      }

      TweenLite.set(i.content, { opacity: 0 });
      TweenLite.set(i.bg, { right: '100%' });
    },

    run: function(el, i) {
      const instances = this.getSiblings(el);

      let time = 0;
      forEach(instances, (instance) => {
        window.setTimeout(() => {
          this.runSingle(instance)
        }, time);

        time += 300;
      });
    },

    runSingle: function(i) {
      // i.el

      const tl = new TimelineLite();
      tl.add('start');
      tl.to(i.bg, 0.8, { right: '0%' }, 'start');

      tl.add('afterblock')
      tl.to(i.image, 1, { opacity: 1 }, 'afterblock');
      tl.to(i.image, 3, { x: 0, y: 0 }, 'afterblock');

      tl.to(i.content, 1, { opacity: 1 }, 'afterblock+=0.5');
    },

    getSiblings: function(el) {
      const y = el.getBoundingClientRect().top;
      let sibilings = [];

      forEach(this.instances, (i) => {
        if (y === i.el.getBoundingClientRect().top) {
          sibilings.push(i);
        }
      });

      return sibilings;
    }
  });

  ShowCards.init();
}

init(document.body);

Barba.Dispatcher.on('newPageReady', (a, b, container) => {
  init(container);
});
```
