/**
 * A function similar to pythons string.format() where curly braces are replaced by the arguments
 * Similar to the Python function you can index the values
 * to change the order or replace a value multiple times
 *
 * @param {string} input
 * @param {string} args
 */
export function format_string(input: string, ...args: string[]): string {
  const literals_set = new Set<string>();

  const regexp = new RegExp(/\{\d\}/g);

  const matches = input.match(regexp) || [];

  for (const match of matches) {
    literals_set.add(match);
  }

  const literals = Array.from(literals_set).sort();

  for (const l of literals) {
    // remove curly braces
    const index = l.substring(1, l.length - 1);
    const literal_regexp = new RegExp(`\\{${index}\\}`, "g");
    input = input.replace(literal_regexp, args.shift() || "");
  }

  // replace all placeholders that didn't match indexed placeholders with the remaining args
  if (input.includes("{}")) {
    input = input.replace(/{}/g, args.join(" "));
  }
  return input;
}
