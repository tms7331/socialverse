import { TModuleDeclarationKey } from "~ops/template/declarations/types";
import { endSemiColon } from "~ops/template/end/semi-colon";
import { resolveModuleNamedImport } from "~ops/template/module/named/import";
import { symmetryModuleNamed } from "~ops/template/symmetry/named";
import { symmetryQuote } from "~ops/template/symmetry/quote";

export const resolveModuleNamed = <
  D extends TModuleDeclarationKey,
  N extends string,
  S extends string
>(
  declaration: D,
  name: N,
  source: S
) =>
  `${declaration} ${symmetryModuleNamed(
    name
  )} from ${endSemiColon(
    symmetryQuote(source)
  )}` as const;

export const resolveModuleNamedImports =
  (names: string[], source: string) =>
    resolveModuleNamedImport(
      names.join("\n"),
      source
    );
