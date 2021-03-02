import { XBT_USD } from '../api';

const NAME_MAP: Record<string, string> = {
  [XBT_USD]: 'XBT/USD',
};

const productIdToName = (productId: string): string | undefined =>
  NAME_MAP[productId];

export default productIdToName;
