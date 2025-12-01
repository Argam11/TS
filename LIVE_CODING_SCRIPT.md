# 🎬 Live Coding Script: Type-Safe Database Query Builder

**Total Time:** ~7 minutes  
**Difficulty:** Intermediate  
**Goal:** Show how TypeScript generics + keyof + Pick create amazing type safety

---

## 🎯 Key Learning Points to Highlight

1. **Generics** make code reusable for any data model
2. **`keyof T`** ensures only valid field names
3. **`Pick<T, K>`** extracts specific properties
4. **Method chaining** returns `this` for fluent API
5. **Type inference** gives autocomplete everywhere

---

## 📋 Pre-Presentation Setup

1. Open `live-coding-starter.ts` in your editor
2. Make sure TypeScript is working (check bottom bar)
3. Split screen: Editor (70%) + Slides (30%)
4. Zoom editor font to 16-18px for visibility
5. Close all other files/tabs

---

## 🎬 The Script (Step-by-Step)

### ⏱️ 0:00 - Introduction (30 seconds)

**Say:**
> "Let's build something practical that shows TypeScript's power. We'll create a type-safe query builder - think Prisma or TypeORM, but simpler. Watch how TypeScript prevents bugs at compile time!"

**Action:**
- Show `live-coding-starter.ts` on screen
- Point to the `User` interface (already defined)

---

### ⏱️ 0:30 - Step 1: Create Generic QueryBuilder Class (1 minute)

**Say:**
> "First, we create a generic class. The `<T>` means it works with any data model."

**Type this:**
```typescript
class QueryBuilder<T> {
  
}
```

**Pause & Say:**
> "This `T` will be our User, Post, Product, whatever. TypeScript will track it."

---

### ⏱️ 1:30 - Step 2: Add where() Method (1.5 minutes)

**Say:**
> "Let's add a `where` method. Watch this magic - we use `keyof T` to ensure only valid field names."

**Type this:**
```typescript
where<K extends keyof T>(field: K, value: T[K]): this {
  console.log(`WHERE ${String(field)} = ${value}`);
  return this;
}
```

**Pause & Explain:**
> "Look at this:
> - `K extends keyof T` - K must be a valid key of T
> - `T[K]` - the value must match the field's type
> - `returns this` - enables method chaining"

**Demonstrate:**
```typescript
// Below the class, type:
const query = new QueryBuilder<User>()
  .where('email', 'alice@example.com'); // ✅ Works!
```

**Then show the error:**
```typescript
// Type this and show the error:
// .where('invalid', 'test'); // ❌ Error! (uncomment to show)
```

**Say:**
> "See? TypeScript won't let us use invalid field names. And look at the autocomplete!"

---

### ⏱️ 3:00 - Step 3: Add select() Method (1.5 minutes)

**Say:**
> "Now let's add select. This one's cool - it uses `Pick` to return only selected fields."

**Type this:**
```typescript
select<K extends keyof T>(...fields: K[]): Pick<T, K>[] {
  console.log(`SELECT ${fields.map(String).join(', ')}`);
  return [] as Pick<T, K>[];
}
```

**Pause & Explain:**
> "`Pick<T, K>` creates a new type with only the fields we selected. TypeScript knows the exact shape!"

**Demonstrate:**
```typescript
const users = new QueryBuilder<User>()
  .where('email', 'alice@example.com')
  .select('id', 'name'); // Type: Pick<User, 'id' | 'name'>[]
```

**Show in hover/tooltip:**
> "Hover over `users` - see? TypeScript knows it's `{ id: number; name: string }[]` - not the full User!"

---

### ⏱️ 4:30 - Step 4: Add orderBy() Method (1 minute)

**Say:**
> "Let's add sorting. Again, `keyof T` ensures we only sort by valid fields."

**Type this:**
```typescript
orderBy<K extends keyof T>(field: K, direction: 'asc' | 'desc'): this {
  console.log(`ORDER BY ${String(field)} ${direction.toUpperCase()}`);
  return this;
}
```

**Demonstrate:**
```typescript
const sorted = new QueryBuilder<User>()
  .where('role', 'admin')
  .orderBy('name', 'asc'); // Autocomplete shows: 'id' | 'name' | 'email' | 'role'
```

---

### ⏱️ 5:30 - Step 5: Add limit() & offset() (45 seconds)

**Say:**
> "Quick - let's add pagination. Simple but type-safe."

**Type this:**
```typescript
limit(count: number): this {
  console.log(`LIMIT ${count}`);
  return this;
}

offset(count: number): this {
  console.log(`OFFSET ${count}`);
  return this;
}
```

---

### ⏱️ 6:15 - Step 6: Final Demo (45 seconds)

**Say:**
> "Now let's chain it all together and see the magic!"

**Type this complete example:**
```typescript
// Complete example
const result = new QueryBuilder<User>()
  .where('role', 'admin')
  .orderBy('name', 'desc')
  .limit(10)
  .offset(20)
  .select('id', 'name', 'email');

// result type: Pick<User, 'id' | 'name' | 'email'>[]
console.log(result);
```

**Run it (if possible) or walk through:**
> "If we run this, we see our SQL-like output. But more importantly..."

**Show the type on hover:**
> "TypeScript knows EXACTLY what fields are in the result. Full autocomplete, zero runtime errors!"

---

### ⏱️ 7:00 - Conclusion & Key Takeaways (30 seconds)

**Say:**
> "In 7 minutes we built a type-safe query builder! This is the power of TypeScript:
> - **Generics** make it reusable
> - **`keyof`** prevents typos
> - **`Pick`** gives exact return types
> - **Zero runtime overhead** - all this magic happens at compile time!
> 
> Questions? The complete code is in the repo!"

---

## 💡 Tips for Success

### During Coding:
- ✅ **Type slowly** - let audience read along
- ✅ **Show autocomplete** - press Ctrl+Space to trigger
- ✅ **Hover to show types** - demonstrate TypeScript's inference
- ✅ **Make intentional errors** - show TypeScript catching bugs
- ✅ **Explain as you type** - don't code in silence

### What to Highlight:
- 🎯 How autocomplete knows valid field names
- 🎯 Type errors appearing in real-time
- 🎯 The exact return types in tooltips
- 🎯 Method chaining fluency

### If Something Goes Wrong:
- 😅 **Don't panic!** Say "Let's see what TypeScript tells us..."
- 🔍 Read the error message aloud
- 🛠️ Fix it step by step
- 💡 This shows real development workflow!

### Questions You Might Get:

**Q: "Does this work with real databases?"**
> "This is the concept! Libraries like Prisma, TypeORM, Kysely use these exact patterns with actual SQL generation."

**Q: "What's the performance cost?"**
> "Zero! All type checking happens at compile time. The JavaScript output is just a regular class."

**Q: "Can you nest queries?"**
> "Absolutely! You'd add a `join()` method. The types get more complex but the pattern is the same."

---

## 🎥 Backup Plan

If live coding feels risky, you can:
1. Have the complete code ready
2. "Type" by uncommenting prepared code blocks
3. Still explain each part as if coding live

But live coding is more engaging! 🚀

---

## 📁 Files Reference

- **Starter:** `live-coding-starter.ts` (what you begin with)
- **Complete:** `live-coding-complete.ts` (final solution)
- **This script:** `LIVE_CODING_SCRIPT.md`

Good luck! You've got this! 💪

