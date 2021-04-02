# nehan-katex

[nehan](https://github.com/tategakibunko/nehan) plugin for displaying mathematical expression using katex",


## create nehan style

```typescript
import { PagedNehanDocument, CssStyleSheet } from 'nehan';
import * as KatexStyle from 'nehan-katex';

const katexStyle: CssStyleSheet = KatexStyle.create({
  selector: "math"
});

const pd = new PagedNehanDocument("<math>$begin{pmatrix} a & b $$ c & d $end{pmatrix}</math>", {
  styleSheets:[
    katexStyle, // add katex style!
  ]
});
```

## load katex css

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.0/katex.min.css">
```

## use markup

```html
<math class="inline">$sin</math> is called "正弦" in Japanese.
<math>$begin{pmatrix} a & b $$ c & d $end{pmatrix}</math>
```

Note that we use `$` instead of `\` in katex syntax.
