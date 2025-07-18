export const formatNum = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace('.0', '') + 'k';
  }
  return count.toString();
};