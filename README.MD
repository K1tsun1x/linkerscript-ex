# LinkerScript?EX
**LinkerScript?EX** is a Visual Studio Code extension that provides syntax highlighting, autocompletion, and inline documentation for GNU Linker Scripts (`.ld`). It makes writing linker scripts faster.

## Features
- **Syntax highlighting** for keywords, directives, constants, and output section commands (`BYTE`, `SHORT`, `LONG`, `QUAD`, `SQUAD`, etc.).
- **Autocompletion** for common directives and blocks:
  - Functions: `ENTRY()`, `OUTPUT_ARCH()`, `OUTPUT_FORMAT()`, `ALIGN()`, `KEEP()`, `PROVIDE()`, `GROUP()`, `AT()`.
  - Blocks: `SECTIONS { ... }`, `MEMORY { ... }`, `PHDRS { ... }`.
  - Keywords: `ORIGIN`, `LENGTH`.
  - Output values: `BYTE()`, `SHORT()`, `LONG()`, `QUAD()`, `SQUAD()`.
  - Other: `ADDR()`, `SIZEOF()`.
- **Inline documentation**: hover over a directive or keyword to see explanations and usage.
- **Snippets with placeholders** for common arguments, including suggested values for `ENTRY`, `OUTPUT_ARCH`, and `OUTPUT_FORMAT`.

## Snippets
| Value | Description |
| --- | --- |
| mem | `MEMORY` block, including memory regions with `ORIGIN` and `LENGTH` |
| sec | Section (e.g., `.text : {*(.text)}`, etc.) |
| secsdef | Default section layout (SECTIONS { .text, .data, .bss, .rodata }) |

## License
This extension is released under [The Unlicense](https://unlicense.org/).