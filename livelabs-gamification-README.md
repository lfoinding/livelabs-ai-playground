# LiveLabs Gamification Guide

Use `$livelabs-gamification` when you want Codex to add quiz-based gamification to a LiveLabs workshop without rewriting the instructional content.

## What The Skill Can Do

- `Option 1`: add a new scored quiz lab at the end of a workshop as an additional lab and update a named manifest
- `Option 2`: append a scored quiz to a single FastLab markdown file
- `Option 3`: insert quiz checks inside existing lab markdown at valid section boundaries

## Core Rules

- Questions must come only from the workshop content
- Existing instructional content must remain verbatim
- Quiz content must be added only at valid boundaries
- `Option 1` uses a scored quiz lab with `passing: 75`
- Default badge path is `images/badge.png`
- Validation reports are saved outside the repo in `/Users/<yournamehere>/Documents/validation-reports`

## How To Prompt It

Start with the skill name and the target path:

```text
$livelabs-gamification create a quiz for /path/to/workshop
```

If you already know the mode, say it directly:

```text
$livelabs-gamification create a quiz for /path/to/workshop
Option 1. Use /path/to/workshop/manifest.json
```

## What To Include In Your Request

For best results, specify:

- workshop root or markdown file path
- quiz mode
- manifest path if using `Option 1`
- preferred question count
- scope limits such as “use only Labs 1-3”
- tone/style preferences such as “make the questions conceptual”
- any reference quiz file whose syntax or style should be matched

## Recommended Prompt Patterns

### Option 1: Add A New Quiz Lab

```text
$livelabs-gamification create a quiz for /repo/workshops/livelabs
Option 1. Use /repo/workshops/livelabs/manifest.json.
Create 5 conceptual questions from the introduction and Labs 1-3 only.
```

### Option 2: Append To A FastLab

```text
$livelabs-gamification add a quiz to /repo/fastlab/my-lab.md
Option 2. Keep it to 3 scored conceptual questions.
```

### Option 3: Distribute Quiz Checks Inside A Lab

```text
$livelabs-gamification create a quiz for /repo/workshop/lab.md
Option 3. Insert quiz blocks under existing sections, not as a new task.
Use unscored checks.
```

## Good Instructions To Add

- “Use only the workshop content”
- “Make the questions conceptual, not nitty-gritty”
- “Do not reference specific lab numbers in the questions”
- “Match the syntax/style of this existing quiz: /path/to/example.md”
- “Update both manifests”
- “Use 5 questions only”

## Common Pitfalls

- forgetting to name the manifest for `Option 1`
- asking for questions based on material not taught in the workshop
- not giving a scope limit when only some labs should be used
- assuming a rendering issue is always markdown-only; sometimes `index.html` also needs to be checked

## Expected Output From Codex

Codex should report:

- files changed
- quiz mode used
- badge path
- whether validation passed for the changed files
- where the validation report was saved

## Quick Checklist

- confirm the correct mode
- confirm the correct manifest if using `Option 1`
- confirm the question count
- confirm the content scope
- confirm quiz rendering in the target workshop viewer
- confirm validation report was produced
