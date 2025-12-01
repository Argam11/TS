# 🎯 Live Coding Tips & Best Practices

Essential tips for delivering a smooth live coding session during your presentation.

---

## ⚡ Pre-Presentation Checklist

### Day Before
- [ ] Practice the live coding 3-5 times using the script
- [ ] Time yourself (aim for 6-7 minutes, no more than 8)
- [ ] Test your screen sharing (font size, colors visible?)
- [ ] Prepare backup plan (complete file ready to show)
- [ ] Check TypeScript is working in your editor

### 30 Minutes Before
- [ ] Close unnecessary apps/tabs
- [ ] Disable notifications (Slack, email, etc.)
- [ ] Set editor theme to high contrast (dark theme recommended)
- [ ] Increase font size (16-18px minimum)
- [ ] Open `live-coding-starter.ts`
- [ ] Have `LIVE_CODING_SCRIPT.md` open on second screen
- [ ] Test TypeScript autocomplete (Ctrl+Space)

### Just Before You Start
- [ ] Clear terminal
- [ ] Position editor to take 70% of screen
- [ ] Zoom to comfortable viewing size
- [ ] Take a deep breath! 😊

---

## 🎬 During Live Coding

### DO ✅

1. **Type Slowly & Deliberately**
   - Give audience time to read
   - Verbalize what you're typing
   - Pause after completing each method

2. **Show TypeScript Magic**
   - Press `Ctrl+Space` to trigger autocomplete
   - Hover over variables to show inferred types
   - Deliberately make errors to show red squiggles
   - Let audience see IntelliSense in action

3. **Narrate Your Thinking**
   - "Now I'm going to add a where method..."
   - "Notice how TypeScript gives us autocomplete here..."
   - "Watch what happens if I try an invalid field name..."

4. **Engage the Audience**
   - "Can everyone see this?"
   - "Notice the type in the tooltip?"
   - Pause for "aha!" moments

5. **Use the Script**
   - Follow `LIVE_CODING_SCRIPT.md` timing
   - Hit the key talking points
   - Stay on track

### DON'T ❌

1. **Don't Code in Silence**
   - Explain as you type
   - Share your thought process

2. **Don't Rush**
   - Quality > speed
   - Better to skip a feature than rush

3. **Don't Panic on Errors**
   - Read the error aloud
   - Say "Let's see what TypeScript tells us..."
   - Fix it step by step
   - This is actually good teaching!

4. **Don't Go Off-Script**
   - Stick to the plan
   - Save extra features for Q&A

5. **Don't Apologize**
   - If something breaks: "This is real development!"
   - Mistakes are learning opportunities

---

## 🎯 Key Moments to Emphasize

### Moment 1: First `keyof` Usage
```typescript
where<K extends keyof T>(field: K, value: T[K])
```
**Say:** "This `keyof T` is magic - it means K can ONLY be a valid field name. No typos allowed!"

**Do:** Type `.where('` and pause - show autocomplete popup with valid fields

---

### Moment 2: Type Mismatch Error
```typescript
.where('email', 123) // ❌ Error
```
**Say:** "Watch this - I'll try to pass a number to email..."

**Do:** Let the error appear, read it aloud, then fix it

---

### Moment 3: Pick Type Result
```typescript
const users = new QueryBuilder<User>()
  .select('id', 'name');
```
**Say:** "Now hover over 'users'... see? TypeScript knows it's Pick<User, 'id' | 'name'>[] - exactly these two fields!"

**Do:** Actually hover and let audience see the tooltip for 2-3 seconds

---

### Moment 4: Method Chaining
```typescript
.where('role', 'admin')
.orderBy('name', 'desc')
.limit(10)
```
**Say:** "And it chains beautifully - reads almost like SQL!"

---

## 🆘 Backup Plans

### If TypeScript Autocomplete Breaks
1. Restart TypeScript server (Cmd+Shift+P → "Restart TS Server")
2. If still broken: "My IntelliSense is shy today, but trust me, it works!"
3. Show the complete file instead

### If You Get Stuck
1. Don't panic - audiences are forgiving
2. Say: "Let me check my notes..."
3. Look at `LIVE_CODING_SCRIPT.md`
4. Or skip to the complete example

### If You're Running Over Time
Skip these (in order):
1. `groupBy()` bonus method
2. Some example usages
3. Error demonstrations (just mention them)

### If You Finish Early
Add these:
1. Show `groupBy()` method
2. Demonstrate with different models (Product, Post)
3. Take questions early

---

## 🎤 Scripted Transitions

### Starting
> "Alright, let's get our hands dirty! I'm going to build a type-safe query builder in about 7 minutes. Watch how TypeScript prevents bugs at compile time. Everyone see my screen okay?"

### After Each Method
> "Great! So now we have [method name]. Notice how TypeScript... [key point]"

### Demonstrating Errors
> "Now let me show you what happens if we try to break it..."

### Wrapping Up
> "And there we have it! A fully type-safe query builder in 7 minutes. The complete code is in the repo. Any questions on this before we move on?"

---

## 📊 Success Metrics

You nailed it if:
- ✅ Finished in 6-8 minutes
- ✅ Showed autocomplete working
- ✅ Demonstrated at least one error
- ✅ Audience can see types in tooltips
- ✅ Code compiles at the end
- ✅ You stayed calm and explained clearly

---

## 🎓 What If Someone Asks...

**"Can this handle complex WHERE with AND/OR?"**
> "Great question! You'd add a `and()` and `or()` method that returns a condition builder. Prisma does this beautifully - check their API!"

**"What about SQL injection?"**
> "In production, you'd parameterize the actual SQL. This is just the type layer - the real SQL generation would use prepared statements."

**"Why not just use Prisma?"**
> "Absolutely use Prisma! This shows HOW it works under the hood. Understanding these patterns helps you use Prisma better."

**"Does this work with MongoDB?"**
> "Same pattern! The type safety works with any data source. You'd just change the implementation inside the methods."

---

## 🚀 Practice Routine

### Practice 1 (15 min)
- Follow script word-for-word
- Time yourself
- Don't worry about perfection

### Practice 2 (12 min)
- Use script as reference only
- Explain in your own words
- Time yourself again

### Practice 3 (10 min)
- No script
- Present as if to audience
- Record yourself if possible

### Practice 4 (8 min)
- Final run-through
- Smooth and confident
- You've got this! 💪

---

## 🎯 Remember

- **The code doesn't have to be perfect** - teaching matters more
- **Mistakes are okay** - they show real development
- **Audience wants you to succeed** - they're on your team
- **You know this material** - trust yourself
- **Have fun!** - enthusiasm is contagious 😊

---

## 📞 Emergency Contacts

If technology fails completely:
1. Show `live-coding-complete.ts` instead
2. Walk through the code on screen
3. Still explain the concepts
4. Nobody will know it was "plan B"

---

**You've prepared thoroughly. You've got this! 🚀**

Good luck with your presentation! 🎉

