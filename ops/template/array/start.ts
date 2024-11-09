import { MODULE_DECLARATIONS } from "../../template/declarations/constants";

export type TTTitleToUpperCaseSnake<
  T extends string,
  A extends string = string
> = T extends `${infer F}${infer R}`
  ? TTTitleToUpperCaseSnake<R, `${A}${F extends ' ' ? '_' : `${Uppercase<F>}`}`>
  : A;

export const upperCase = <I extends string>(value: I): Uppercase<I> =>
  value?.toUpperCase() as Uppercase<I>;

export const titleToUpperSnake = <I extends string>(
  title: I
): TTTitleToUpperCaseSnake<I> =>
  title.split(' ').map(upperCase).join('_') as TTTitleToUpperCaseSnake<I>;

export const initTemplateArray = (name: string) =>
  `${MODULE_DECLARATIONS['export const']} ${titleToUpperSnake(name)} = [
`;
