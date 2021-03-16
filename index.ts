import { CssStyleSheet, DynamicStyleContext, LogicalCssEvaluator } from 'nehan';
import * as katex from 'katex';

// TODO: prevent '\$' from escaping, because it's used as 'dollar text'.
// current workaround is $dollar -> \text{\textdollar}
function normalizeDefault(markup: string): string {
  return markup.trim()
    .replace(/\n/g, "")
    .replace(/\$dollar/g, "\\text{\\textdollar}")
    .replace(/\$/g, "\\")
    ;
}

function attachDefault(dom: HTMLDivElement) {
  document.body.appendChild(dom);
}

function detachDefault(dom: HTMLDivElement) {
  document.body.removeChild(dom);
}

export function create(args: {
  selector?: string;
  spacingSize?: number;
  margin?: string;
  normalize?: (markup: string) => string;
  attachDOM?: (dom: HTMLElement) => void;
  detachDOM?: (dom: HTMLElement) => void;
}): CssStyleSheet {
  const selector = args.selector ?? "math";
  const spacingSize = args.spacingSize ?? 10;
  const normalize = args.normalize ?? normalizeDefault;
  const attachDOM = args.attachDOM ?? attachDefault;
  const detachDOM = args.detachDOM ?? detachDefault;
  const fontSize = "0.8em";
  return new CssStyleSheet({
    [selector]: {
      fontSize,
      "!render": (ctx: DynamicStyleContext) => {
        const pcont = ctx.parentContext;
        if (!pcont) {
          return;
        }
        const isInline = ctx.element.classList.contains("inline");
        const display = isInline ? "inline-block" : "block";
        const margin = isInline ? "0" : args.margin ?? "0.5em 0";
        const backgroundColor = isInline ? "transparent" : "white";
        const isVert = pcont.env.writingMode.isTextVertical();
        const markup = normalize(ctx.element.$node.textContent || "");
        const maxMeasure = pcont.maxMeasure - spacingSize * 2; // padding-start(10px) + padding-end(10px)
        const $dom = document.createElement("div");
        const writingMode = pcont.env.writingMode;
        const etor = new LogicalCssEvaluator(writingMode);
        pcont.env.font.acceptCssEvaluator(etor).applyTo($dom.style);
        $dom.style.fontSize = fontSize;

        if (isInline) {
          $dom.style.display = "inline-block";
        } else {
          $dom.style.width = `${maxMeasure}px`;
          $dom.style.padding = `${spacingSize}px`;
        }
        $dom.style.fontSize = `${ctx.emSize}px`;
        $dom.style.visibility = "hidden";

        katex.render(markup, $dom, {
          throwOnError: false
        });

        // To get accurate dom size, we need to append $dom to document-tree temporarily.
        attachDOM($dom);
        const mathMeasure = isInline ? $dom.clientWidth : maxMeasure;
        const mathExtent = $dom.clientHeight;
        detachDOM($dom);
        $dom.style.visibility = "visible";
        ctx.setExternalDOM($dom);

        if (isVert) {
          $dom.style.transform = `translateX(${mathExtent}px) rotateZ(90deg)`;
          $dom.style.transformOrigin = "top left";
        }
        const padding = isInline ? "0" : `${spacingSize}px`;
        const width = isVert ? mathExtent : mathMeasure;
        const height = isVert ? mathMeasure : mathExtent;

        return { display, backgroundColor, padding, margin, width, height };
      }
    }
  });
}

