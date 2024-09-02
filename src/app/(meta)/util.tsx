export function escapeString(str: string) {
  // Adapted from https://stackoverflow.com/questions/40418024/how-to-replace-n-to-linebreaks-in-react-js
  return str
    .split(" ")
    .join("\u00A0")
    .split("\\n")
    .map((line, i) => {
      return i === 0 ? line : [<br key={i} />, line];
    });
}
