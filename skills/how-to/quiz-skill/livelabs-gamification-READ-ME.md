# LiveLabs Gamification Guide

Estimated Time: 10 minutes

## Introduction

Use `$livelabs-gamification` when you want Codex to add quiz-based checks to a LiveLabs workshop without rewriting the teaching content.

### Objectives

- Understand the three supported quiz modes
- Prompt Codex with the right workshop path and manifest
- Avoid common mistakes when asking for quiz generation

## Task 1: Choose The Right Quiz Mode

1. Use `Option 1` to add a new scored quiz lab at the end of a workshop and update a named manifest.

2. Use `Option 2` to append a scored quiz to a single FastLab markdown file.

3. Use `Option 3` to insert quiz checks inside existing lab markdown at valid section boundaries.

## Task 2: Follow The Core Rules

1. Build questions only from the workshop content.

2. Keep the instructional content verbatim.

3. Add quiz content only at valid boundaries.

4. Remember these defaults:

    - `Option 1` uses a scored quiz lab with `passing: 75`
    - default badge path is `images/badge.png`
    - validation reports are saved outside the repo in `/Users/<yournamehere>/Documents/validation-reports`

## Task 3: Prompt Codex Clearly

1. Start with the skill name and the target path:

```text
$livelabs-gamification create a quiz for /path/to/workshop
```

2. If you already know the mode, say it directly:

```text
$livelabs-gamification create a quiz for /path/to/workshop
Option 1. Use /path/to/workshop/manifest.json
```

3. Include these details in your request:

- workshop root or markdown file path
- quiz mode
- manifest path if using `Option 1`
- preferred question count
- scope limits such as “use only Labs 1-3”
- tone or style preferences such as “make the questions conceptual”
- any reference quiz file whose syntax or style should be matched

## Task 4: Use Prompt Patterns That Match The Goal

1. Use this pattern for `Option 1`:

```text
$livelabs-gamification create a quiz for /repo/workshops/livelabs
Option 1. Use /repo/workshops/livelabs/manifest.json.
Create 5 conceptual questions from the introduction and Labs 1-3 only.
```

2. Use this pattern for `Option 2`:

```text
$livelabs-gamification add a quiz to /repo/fastlab/my-lab.md
Option 2. Keep it to 3 scored conceptual questions.
```

3. Use this pattern for `Option 3`:

```text
$livelabs-gamification create a quiz for /repo/workshop/lab.md
Option 3. Insert quiz blocks under existing sections, not as a new task.
Use unscored checks.
```

## Task 5: Add Useful Instructions And Avoid Common Mistakes

1. Add instructions such as:

    - “Use only the workshop content”
    - “Make the questions conceptual, not nitty-gritty”
    - “Do not reference specific lab numbers in the questions”
    - “Match the syntax or style of this quiz: /path/to/example.md”
    - “Update both manifests”
    - “Use 5 questions only”

2. Avoid these common mistakes:

    - forgetting to name the manifest for `Option 1`
    - asking for questions based on material not taught in the workshop
    - not giving a scope limit when only some labs should be used
    - assuming a rendering issue is only markdown-related when `index.html` might need a check too

## Task 6: Check The Expected Output

1. Expect Codex to report:

    - files changed
    - quiz mode used
    - badge path
    - whether validation passed for the changed files
    - where the validation report was saved

2. Use this checklist before you finish:

    - confirm the correct mode
    - confirm the correct manifest if using `Option 1`
    - confirm the question count
    - confirm the content scope
    - confirm quiz rendering in the target workshop viewer
    - confirm validation report was produced

## Acknowledgements

* **Author** - Linda Foinding, Principal Product Manager, Outbound Product Management
* **Last Updated By/Date** - Linda Foinding, March 2026
