---
title: Keywords and Operand types
description: "Operand types in Runestaff — identifiers, integers, strings, keywords, and more."
---

<div style="background: var(--sl-color-orange-low); border: 2px solid var(--sl-color-orange); border-radius: 8px; padding: 1.5rem; margin: 2rem 0;">
  <h2 style="margin-top: 0; color: var(--sl-color-orange);">🚧 Under Construction</h2>
  This page is actively being written. Content may be incomplete or change.
</div>

Runestaff's type system closely follows the Java class file format. Every token in a `.rns` source file is parsed as one of the types described below. The parser determines a token's type mostly by inspecting its first character.

---

## Keywords

Keywords are reserved words that carry special meaning in the language syntax. In Runestaff, keywords are **positionally reserved** — they are only treated as keywords in certain positions, and can be used as plain identifiers everywhere else. Think of them as "soft" reserved words.

For example, `.super` is a directive keyword, but it can also appear as an identifier in the operand position:

```rns
.super com/example/MySuperClass
; ".super" is the directive keyword
; "com/example/MySuperClass" is an identifier

.super .super
; or
.super public
; here ".super" and "public" are in operand position — treated as identifiers, not keywords
```

This applies to **any** keyword: its meaning is determined entirely by where it appears, not by what it is.

---

### Directives

Directives always start with a dot (`.`) and declare structural elements: classes, methods, fields, and so on. They consume operands of the types described in the [Operands](#operands) section below.

See the [Directives](/syntax/directives/) page for the full list.

---

### Access flags

Access flags control the visibility and behaviour of classes, methods, and fields. Common examples: `public`, `private`, `protected`, `static`, `final`, `abstract`. Access flag is optionally present and should be placed right after the directive keyword (TODO: examples on methods and fields).:

```rns
.class public final MyClass
```

#### Order of access flags

I don't enforce a specific order for access flags:

```rns
.class final public MyClass
```

TODO: Interfaces, annotations, enums blabla
TODO: Say about some rules and JVMS warnings

---

## Operands

Operands are the values that directives and instructions operate on. They are mostly based on <a href="https://docs.oracle.com/javase/specs/jvms/se25/html/jvms-4.html#jvms-4.4-140" target="_blank" rel="noopener noreferrer">constant pool entries</a>, because almost all operands are encoded as constant pool references in the resulting bytecode.

Runestaff supports implicit type inference for operands — the parser determines the operand type from its syntax. A token starting with a digit is parsed as an integer literal, one starting with `"` is a string, and so on.

---

### Identifiers

Identifiers are the most general operand type. An identifier can refer to almost any constant pool entry without requiring explicit type syntax. The assembler resolves it to the appropriate constant pool type based on context.

For example, a superclass reference is stored as a `CONSTANT_Class` entry in the constant pool, but you just write it as a plain identifier:

```rns
.super java/lang/Object
; "java/lang/Object" resolves to a CONSTANT_Class entry
```

A method name or descriptor resolves to `CONSTANT_Utf8`:

```rns
.method public static main ([Ljava/lang/String;)V
; "main" and "([Ljava/lang/String;)V" resolve to CONSTANT_Utf8 entries
```

#### Forced identifier syntax

Sometimes you need an identifier that starts with a digit, contains spaces, or includes characters that would break normal parsing. Use the raw identifier syntax for this:

**`#"..."` — raw identifier**

```rns
.super #"42"
; An identifier literally named "42", not the integer 42

.super #"my class name"
; An identifier with spaces
```

The following escape sequences are supported inside `#"..."`:

| Sequence | Meaning |
|---|---|
| `\"` | Double quote |
| `\\` | Backslash |
| `\n` | Newline |
| `\t` | Tab |
| `\r` | Carriage return |
| `\0` | Null |
| `\b` | Backspace |
| `\f` | Form feed |

---

### Integers

Integers are supported in two representations:

| Representation | Examples |
|---|---|
| Decimal | `42`, `-7`, `0` |
| Hexadecimal | `0x2A`, `-0x7`, `0x0` |

A token starting with a digit or `-` is parsed as an integer literal and encoded as a `CONSTANT_Integer` in the constant pool.

---

### Strings

String literals are enclosed in double quotes and support the same escape sequences as [raw identifiers](#forced-identifier-syntax):

```rns
ldc "Hello, World!"
ldc "line one\nline two"
ldc "she said \"hi\""
```

String literals are encoded as `CONSTANT_String` entries in the constant pool.

> Note: Multi-line string literals are not currently supported. A string must be written on a single line.

---

### Floats, Doubles, and Longs

> Not yet supported.

---

### Type hints

By default, Runestaff infers the constant pool type from context. However, since Runestaff is a sister project to [Lagertha VM](https://github.com/Obito-git/lagertha-vm) and is designed to produce any bytecode — including intentionally invalid bytecode — you may need to force a specific constant pool type regardless of context.

Type hints let you do exactly that. The syntax is:

```
@type (components...)
```

Where `type` is the constant pool type name and the parentheses contain the **space-separated components** of that constant pool entry.

For example, to force a superclass reference to point to a `CONSTANT_Methodref` instead of a `CONSTANT_Class`:

```rns
.super @methodref (java/lang/Object toString ()Ljava/lang/String;)
; Forces the operand to a method reference, regardless of what .super normally expects
```

Supported type hints:

| Type hint | Constant pool entry | Components | Example |
|---|---|---|---|
| `@utf8` | `CONSTANT_Utf8` | Identifier | `@utf8 (MyClass.class)` |
| `@int` | `CONSTANT_Integer` | Decimal or hex integer | `@int (42)` |
| `@string` | `CONSTANT_String` | String literal | `@string ("Hello, World!")` |
| `@class` | `CONSTANT_Class` | Class name identifier | `@class (java/lang/Object)` |
| `@methodref` | `CONSTANT_Methodref` | ClassName MethodName Descriptor | `@methodref (java/lang/Object toString ()Ljava/lang/String;)` |
| todo | ... | ... | ... |
