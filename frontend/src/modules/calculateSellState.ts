function calculateAxisOffset(playgroundAxisSize: number, sellSize: number, sellAxisCount: number): number {
  return Math.floor((playgroundAxisSize - (sellSize * sellAxisCount)) / 2) || 0;
}

export function calculateSellState(
  playgroundMaxWidth: number,
  playgroundMaxHeight: number,
  sellWidthCount: number,
  sellHeightCount: number
): {
  sellSize: number,
  xOffset: number,
  yOffset: number
} {
  const sellWidth = Math.floor(playgroundMaxWidth / sellWidthCount);
  const sellHeight = Math.floor(playgroundMaxHeight / sellHeightCount);

  const sellSize = sellWidth > sellHeight ? sellHeight : sellWidth;

  const xOffset = calculateAxisOffset(playgroundMaxWidth, sellSize, sellWidthCount);
  const yOffset = calculateAxisOffset(playgroundMaxHeight, sellSize, sellHeightCount);

  console.log({
    playgroundMaxWidth,
    sellSize,
    xOffset
  });

  return {
    sellSize,
    xOffset,
    yOffset
  };
}