# appear-animation

Fade Up example

```
var FadeUp = AppearAnimation.create({
  delay: 250,
  elements: document.querySelectorAll('.card'),

  prepare: function(el) {
    TweenLite.set(el, { opacity: 0, y: 100 });
  },

  run: function(el) {
    TweenLite.to(el, 0.5, { opacity: 1, y: 0 });
  }
});

FadeUp.init();
```
