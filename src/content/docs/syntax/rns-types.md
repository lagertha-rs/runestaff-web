---
title: Runestaff Types
description: "Operand types in Runestaff — identifiers, integers, strings, keywords, and more."
---

<div style="background: var(--sl-color-orange-low); border: 2px solid var(--sl-color-orange); border-radius: 8px; padding: 1.5rem; margin: 2rem 0;">
  <h2 style="margin-top: 0; color: var(--sl-color-orange);">🚧 Under Construction</h2>
  This page is actively being written. Content may be incomplete or change.
</div>

Runestaff's type system closely follows the Java class file format. Every token in a `.rns` source file is parsed as one of the operand types described below. The parser determines a token's type by inspecting its first character.

---

## Identifiers

Identifiers refer to classes, methods, fields, and other constant pool entries. They are encoded as `CONSTANT_Utf8` strings in the constant pool.

Any token that does not match another operand type is parsed as an identifier:

```rns
.super java/lang/Object
; "java/lang/Object" doesn't start with a digit or a quote, so it's an identifier
```

### Forced identifier syntax

In some cases you may need an identifier that starts with a digit, a dot, or another character that would otherwise trigger a different parse rule. Two escape syntaxes handle this:

**`#"..."` — raw identifier**

```rns
.super #"42"
; Refers to an identifier literally named "42", not the integer 42
```

**`$"..."` — identifier with escape sequences**

```rns
.super $"you can escape \" in here too\n"
; Refers to an identifier named: you can escape " in here too\n
```

Both syntaxes allow spaces, special characters, and anything else that would break normal identifier parsing.

---

## Integers

Integers are supported in two representations:

| Representation | Examples |
|---|---|
| Decimal | `42`, `-7`, `0` |
| Hexadecimal | `0x2A`, `-0x7`, `0x0` |

A token starting with a `-` or a digit is parsed as an integer literal and encoded as a `CONSTANT_Integer` in the constant pool.

---

## Strings

String literals are enclosed in double quotes and support standard escape sequences:

```rns
ldc "Hello, World!"
ldc "line one\nline two"
ldc "she said \"hi\""
```

String literals are encoded as `CONSTANT_String` entries in the constant pool.

> Note: Multi-line string literals are not currently supported, it should be written as a single line.

---

## Floats, Doubles, and Longs

> Not yet supported.

---

## Keywords

### Access flags

Access flags are reserved keywords that control the visibility and behaviour of classes, methods, and fields. Common examples: `public`, `private`, `protected`, `static`, `final`, `abstract`.

Their meaning is **positional** — the same keyword behaves differently depending on where it appears.

As a modifier in a class declaration:

```rns
.class public MyClass
```

As an identifier in a context that expects one:

```rns
.super public
; "public" is treated as a CONSTANT_Utf8 identifier here, not a modifier
```

---

## Directives

Directives always start with a dot (`.`) and declare structural elements: classes, methods, fields, and so on. They are not a type per se, but they consume operands of the types described above.

See the [Directives](./directives/) page for the full list.
