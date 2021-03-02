import { ImgHTMLAttributes } from 'react';
import loader from './loader.svg';

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {}

const Loader = (props: Props) => (
  <img {...props} src={loader} alt="Loading..." />
);

export default Loader;
