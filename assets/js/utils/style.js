export function className(...classes) {
  return classes
    .map((c) => {
      if (typeof c === "string") {
        return c;
      }

      if (Array.isArray(c)) {
        return className(...c);
      }

      if (typeof c === "object") {
        return Object.entries(c)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(" ");
      }

      return "";
    })
    .join(" ");
}
