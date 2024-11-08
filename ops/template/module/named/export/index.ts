import { MODULE_DECLARATIONS } from "~ops/template/declarations/constants";
import { resolveModuleNamed } from "~ops/template/module/named";

export const resolveModuleNamedExport = <
  N extends string,
  S extends string
>(
  name: N,
  source: S
) =>
  resolveModuleNamed(
    MODULE_DECLARATIONS.export,
    name,
    source
  );
