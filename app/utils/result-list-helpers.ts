const extractLastNumber = (url: string): string => {
  const match = url.match(/\/(\d+)\/$/);
  return match ? match[1] : '';
};

export default extractLastNumber;
