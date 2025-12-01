# 🎯 Live Coding Cheat Sheet

**Quick reference for your 7-minute live coding session**  
Print this or keep it on a second screen!

---

## ⏱️ Timeline

| Time | Step | Key Point |
|------|------|-----------|
| 0:00 | Intro | "Let's build a type-safe query builder" |
| 0:30 | Create class | `class QueryBuilder<T> { }` |
| 1:30 | Add where() | Show `keyof T` magic |
| 3:00 | Add select() | Show `Pick<T, K>` return type |
| 4:30 | Add orderBy() | Show literal types `'asc' \| 'desc'` |
| 5:30 | Add limit/offset | Quick pagination methods |
| 6:15 | Final demo | Chain everything together |
| 7:00 | Wrap up | Key takeaways |

---

## 📝 Code Snippets (Copy-Paste Ready)

### Step 1: Class Definition
```typescript
class QueryBuilder<T> {
  
}
```

### Step 2: where() Method
```typescript
where<K extends keyof T>(field: K, value: T[K]): this {
  console.log(`WHERE ${String(field)} = ${value}`);
  return this;
}
```

### Step 3: select() Method
```typescript
select<K extends keyof T>(...fields: K[]): Pick<T, K>[] {
  console.log(`SELECT ${fields.map(String).join(', ')}`);
  return [] as Pick<T, K>[];
}
```

### Step 4: orderBy() Method
```typescript
orderBy<K extends keyof T>(field: K, direction: 'asc' | 'desc'): this {
  console.log(`ORDER BY ${String(field)} ${direction.toUpperCase()}`);
  return this;
}
```

### Step 5: limit() & offset() Methods
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

### Step 6: Final Demo
```typescript
const result = new QueryBuilder<User>()
  .where('role', 'admin')
  .orderBy('name', 'desc')
  .limit(10)
  .offset(20)
  .select('id', 'name', 'email');
```

---

## 🎯 Key Talking Points

### At where() Method
> "This `keyof T` means K can ONLY be a valid field name. Watch the autocomplete!"

### At select() Method
> "See `Pick<T, K>`? TypeScript creates a new type with only the fields we selected!"

### At orderBy() Method
> "Notice the `'asc' | 'desc'` - only these two values allowed. No typos!"

### At Final Demo
> "Let's chain it all together... and hover to see the type. Perfect!"

---

## ⚠️ Common Mistakes to Avoid

1. **Forgetting `return this`** → Method chaining won't work
2. **Missing `<K extends keyof T>`** → No autocomplete
3. **Typo in `Pick<T, K>[]`** → Wrong return type
4. **Not showing autocomplete** → Press Ctrl+Space!
5. **Rushing** → Slow down, let audience follow

---

## 🎤 Opening Line
> "Alright, let's get our hands dirty! I'm going to build a type-safe query builder in about 7 minutes. Watch how TypeScript prevents bugs at compile time."

## 🎤 Closing Line
> "And there we have it! A fully type-safe query builder. The complete code is in the repo. Questions?"

---

## 🆘 Emergency Fallback

**If TypeScript breaks:**
1. Restart TypeScript: `Cmd+Shift+P` → "Restart TS Server"
2. If still broken: Open `live-coding-complete.ts` instead
3. Say: "Let me show you the complete version..."

**If you forget what's next:**
- Glance at this cheat sheet
- Or say: "Let me check my notes real quick..."

---

## ✅ Success Checklist

Before you start:
- [ ] Font size 16-18px
- [ ] Notifications disabled
- [ ] `live-coding-starter.ts` open
- [ ] Cheat sheet visible (second screen or printed)
- [ ] Deep breath taken 😊

During:
- [ ] Show autocomplete (Ctrl+Space)
- [ ] Hover to show types
- [ ] Make at least one intentional error
- [ ] Finish in 6-8 minutes
- [ ] Stay calm and confident

---

**You've got this! 🚀**

