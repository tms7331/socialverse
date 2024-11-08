import { MODULE_DECLARATIONS } from '../template/declarations/constants';
import { endSemiColon } from '../template/end/semi-colon';

const VARIABLE_NAME = 'FaviconsLight';

const NAME = '';
// "Head";
// ${resolveModuleImport(NAME, "next/head")}

export const resolveFaviconsComponent = (children: string) =>
  endSemiColon(
    `

${MODULE_DECLARATIONS['export const']} ${VARIABLE_NAME} = () => (
<${NAME}>
  ${children}
</${NAME}>
);
` as const
  );
