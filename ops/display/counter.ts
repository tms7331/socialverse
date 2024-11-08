import { inverseGreen } from './index';
let i = 0;
export const counter = () => {
  i++;
  process.stdout.write(inverseGreen(`\r ${i} items processed.`));
};
