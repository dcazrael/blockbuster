export function calcDimensions() {
  return {
    height() {
      return +getComputedStyle(gameScreen)
        .getPropertyValue('height')
        .slice(0, -2);
    },
    width() {
      return +getComputedStyle(gameScreen)
        .getPropertyValue('width')
        .slice(0, -2);
    },
  };
}
