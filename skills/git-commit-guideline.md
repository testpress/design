# How to Write a Git Commit Message

Commit messages matter. Here's how to write them well.

**Author:** cbeams · 31 Aug 2014

---

## Introduction: Why good commit messages matter

If you browse the log of any random Git repository, you will probably find its commit messages are more or less a mess. Compare these:

**Poor:**
```
e5f4b49 Re-adding ConfigurationPostProcessorTests after its brief removal in r814...
2db0f12 fixed two build-breaking issues: + reverted ClassMetadataReadingVisitor...
147709f Tweaks to package-info.java files
7f96f57 polishing
```

**Good:**
```
5ba3db6 Fix failing CompositePropertySourceTests
84564a0 Rework @PropertySource early parsing logic
e142fd1 Add tests for ImportSelector meta-data
887815f Update docbook dependency and generate epub
ac8326d Polish mockito usage
```

The former varies in length and form; the latter is concise and consistent. A well-crafted Git commit message is the best way to communicate context about a change. A diff will tell you **what** changed, but only the commit message can properly tell you **why**.

A project's long-term success rests on its maintainability, and a maintainer has few tools more powerful than the project's log. Agree on a convention that defines: **style** (markup, wrap, grammar, capitalization), **content** (what the body should contain), and **metadata** (issue IDs, etc.).

---

## The seven rules of a great Git commit message

1. **Separate subject from body with a blank line**
2. **Limit the subject line to 50 characters**
3. **Capitalize the subject line**
4. **Do not end the subject line with a period**
5. **Use the imperative mood in the subject line**
6. **Wrap the body at 72 characters**
7. **Use the body to explain what and why vs. how**

### Example

```
Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. The blank line separating the summary from the
body is critical; tools like log, shortlog and rebase can get
confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequences? Here's
the place to explain them.

 - Bullet points are okay, too
 - Typically a hyphen or asterisk for the bullet

Resolves: #123
See also: #456, #789
```

### Rule 1: Separate subject from body with a blank line

The text up to the first blank line is the commit title (used in `git log --oneline`, `git shortlog`, etc.). Not every commit needs a body—a single line is fine when no further context is needed.

### Rule 2: Limit the subject line to 50 characters

50 is a rule of thumb; 72 is the hard limit. Keeps subjects readable and forces concise explanation. If summarizing is hard, you might be committing too many changes at once (strive for atomic commits).

### Rule 3: Capitalize the subject line

Begin the subject line with a capital letter.

### Rule 4: Do not end the subject line with a period

Trailing punctuation is unnecessary and wastes space.

### Rule 5: Use the imperative mood in the subject line

Write as if giving a command: "Clean your room", "Close the door". Git does this too (`Merge branch 'x'`, `Revert "Add the thing"`).

**Check:** A good subject line should complete: *If applied, this commit will **your subject line here***

- ✅ *If applied, this commit will refactor subsystem X for readability*
- ❌ *If applied, this commit will fixed bug with Y*
- ❌ *If applied, this commit will changing behavior of X*

### Rule 6: Wrap the body at 72 characters

Git does not wrap text. Wrap the body manually at 72 characters so Git can indent and stay under 80 characters overall.

### Rule 7: Use the body to explain what and why vs. how

Focus on: why you made the change, how things worked before (and what was wrong), how they work now, and why you solved it this way. Leave out low-level "how" details—the code and comments cover that. The future maintainer (maybe you) will thank you.

---

## Tips

- **Use the command line** for committing, merging, rebasing, and history. IDE Git UIs often fall short for good commit messages and history workflow.
- **Read Pro Git** for more.
