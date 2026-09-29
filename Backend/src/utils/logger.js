export function logger(
  message,
  data = ""
) {
  console.log(
    `[ASHRAYA] ${message}`,
    data
  );
}