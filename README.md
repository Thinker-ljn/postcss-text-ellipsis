# PostCSS Ellipsis [![Build Status][ci-img]][ci]

[PostCSS] plugin create a full ellipsis style.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/Thinker-ljn/postcss-text-ellipsis.svg
[ci]:      https://travis-ci.org/Thinker-ljn/postcss-text-ellipsis

## Grammar
  ellipsis: width [max, [block]];
- width: content width
- max: is max-width
- block: set property display to block, default set to inline-block

## Example
```css
.foo {
  ellipsis: 60px max block;
}
.bar {
  ellipsis: 60px;
}
```
will produce
```css
.foo {
  display: block;
  max-width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.bar {
  display: inline-block;
  width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## Usage

```js
postcss([ require('postcss-text-ellipsis') ])
```

See [PostCSS] docs for examples for your environment.
