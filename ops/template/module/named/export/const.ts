import { MODULE_DECLARATIONS } from "~ops/template/declarations/constants";
import { resolveModuleNamed } from "~ops/template/module/named";

export const resolveModuleNamedExportConst = <
  N extends string,
  S extends string
>(
  name: N,
  source: S
) =>
  resolveModuleNamed(
    MODULE_DECLARATIONS["export const"],
    name,
    source
  );
