---
title: Syntax Reference
description: "An overview of the Runestaff assembly language syntax — directives, instructions, operands, and more."
---

<div style="background: var(--sl-color-orange-low); border: 2px solid var(--sl-color-orange); border-radius: 8px; padding: 1.5rem; margin: 2rem 0;">
  <h2 style="margin-top: 0; color: var(--sl-color-orange);">🚧 Under Construction</h2>
  This page is actively being written. Content may be incomplete or change.
</div>

Runestaff is a human-friendly assembler and dissassembler that targets the JVM. It reads `.rns` source files and produces Java bytecode (`.class` files).

This section covers the syntax of the Runestaff assembly language.

## Sections

| Page | Description |
|---|---|
| [Runestaff Types](./keywords-and-operands/) | Primitive types, reference types, arrays, and JVM type descriptors |
| [Directives](./directives/) | Assembler directives — `.class`, `.method`, `.field`, `.end`, etc. |
| [Instructions](./instructions/) | JVM instruction mnemonics supported by Runestaff |

## Basic Structure

A Runestaff source file is made up of a **class definition** followed by **member definition** (fields and methods).

TODO

## Comments

Single-line comments start with a semicolon (`;`):

```rns
; This is a comment
ldc 42   ; inline comment
```
