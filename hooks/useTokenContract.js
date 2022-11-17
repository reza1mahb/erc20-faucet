import ERC20_ABI from '../artifacts/BitTokenERC20.json';
import useContract from './useContract';

export default function useTokenContract(tokenAddress) {
  return useContract(tokenAddress, ERC20_ABI);
}
