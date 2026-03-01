---
title: "JVMS-001: Interface Flags Combination Violation"
description: "Identifies illegal combinations of class access flags when defining a Java interface."
error_code: "JVMS-001"
severity: "jvm_spec"
---

**Severity**: JVM Specification Warning  
**JVM Spec Reference**: <a href="https://docs.oracle.com/javase/specs/jvms/se25/html/jvms-4.html#jvms-4.1-200-E.1" target="_blank" rel="noopener noreferrer">Section 4.1, Table 4.1-B</a>

### Description

According to the Java Virtual Machine Specification, the `ACC_INTERFACE` flag has strict requirements regarding its relationship with other access flags. Specifically:

> If the `ACC_INTERFACE` flag is set, the `ACC_ABSTRACT` flag **must** also be set, and the `ACC_FINAL`, `ACC_SUPER`, `ACC_ENUM`, and `ACC_MODULE` flags **must not** be set.

### Examples

#### Violation: Interface is not marked Abstract

In the JVM, all interfaces are implicitly abstract. Omitting this flag is a spec violation.

```rns
; Warning: Interface flag set but ACC_ABSTRACT is missing
.class interface public MyInterface
```

#### Violation: Mutually Exclusive Flags

Interfaces cannot be final (because they must be implemented) or enum (which are specialized classes).
Extrait de code

```rns
; Warning: Interface cannot be final
.class interface final public MyInterface
```

```rns
; Warning: Interface cannot be an enum
.class interface enum public MyInterface
```

### Solution

To resolve this warning, ensure that any type flagged as an interface adheres to the following bitmask rules:

> Always include ACC_ABSTRACT.
> Remove ACC_FINAL, ACC_SUPER, ACC_ENUM, and ACC_MODULE.

#### Standard Interface Definition

A typical public interface should only carry the 0x0601 mask (ACC_PUBLIC | ACC_INTERFACE | ACC_ABSTRACT).
Extrait de code

```rns
; Correct Flag Usage
.class interface abstract public MyInterface
```
