/** Divide "texto con *palabras* marcadas" en palabras, indicando cuáles van marcadas. */
export function splitMarked(text: string) {
  return text.split(" ").map((raw) => {
    const marked = raw.startsWith("*") && raw.endsWith("*");
    return { text: marked ? raw.slice(1, -1) : raw, marked };
  });
}
