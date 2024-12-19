export const normalizeDimensions = (
  width: number,
  height: number
): { width: number; height: number } => {
  const maxDimension = 500;

  if (width <= maxDimension && height <= maxDimension) {
    return { width, height };
  }

  const widthRatio = width / maxDimension;
  const heightRatio = height / maxDimension;
  const maxRatio = Math.max(widthRatio, heightRatio);

  return {
    width: Math.round(width / maxRatio),
    height: Math.round(height / maxRatio),
  };
};
