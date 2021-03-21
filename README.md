# nehan-katex

[nehan](https://github.com/tategakibunko/nehan) plugin for displaying mathematical expression using katex",


## create nehan style.

```typescript
import * as KatexStyle from 'nehan-katex';

const katexStyle = KatexStyle.create({
  selector: "math"
});

const pd = new PagedNehanDocument("<math>$begin{pmatrix} a & b $$ c & d $end{pmatrix}</math>", {
  styleSheets:[
    katexStyle, // add katex style!
  ]
});
```

## use markup

```html
<math class="inline">$sin</math> is called "正弦" in Japanese.
<math>$begin{pmatrix} a & b $$ c & d $end{pmatrix}</math>
```

Note that we use `$` instead of `\` in katex syntax.
