# nehan-katex

[nehan](https://github.com/tategakibunko/nehan) plugin for displaying mathematical expression using katex",


## create nehan style.

```typescript
import * as KatexStyle from 'nehan-katex';

const style = KatexStyle.create({
  selector: "math"
});
```

## use markup

```html
<math class="inline">$sin</math> is called "正弦" in Japanese.
<math>$begin{pmatrix} a & b $$ c & d $end{pmatrix}</math>
```

Note that we use `$` instead of `\` in katex syntax.
