# LiveLabs Workshop Author v2 Distribution Readme

This package contains the `livelabs-workshop-author-v2` skill and its bundled references and helper scripts.

## What This Package Is

This is a self-contained skill package for a Codex-style skill environment.

It includes:

- `SKILL.md`
- bundled references
- helper scripts
- prompt templates
- QA guidance

## What This Package Is Not

This is not a standalone desktop application.

It does not include:

- a built-in runtime
- a bundled Python interpreter
- a bundled Node runtime
- a bundled browser automation stack
- a bundled LiveLabs validator outside the local skill workflow

## Minimum Requirements

To use this skill cleanly, the recipient should have:

- a Codex-compatible skill environment that can load `SKILL.md`
- `bash`
- `python3`
- standard Unix command-line tools such as `find`, `cp`, `mkdir`, `sed`, and `zip`

## Full-Feature Requirements

For the full v2 workflow, the recipient should also have:

- `node`
- network access for source blogs, docs, and FreeSQL
- browser/runtime support for screenshot capture workflows
- a local repo or workspace where LiveLabs workshop files can be created or edited

## Feature Impact If Dependencies Are Missing

- Without `python3`:
  manifest rendering, FreeSQL block rendering, and some QA helpers will not run.
- Without `node`:
  screenshot capture helpers will not run.
- Without network access:
  source lookup, FreeSQL usage, and remote screenshot targets will be limited or blocked.
- Without a Codex-compatible skill loader:
  the package is just files on disk and cannot run as a skill.

## Recommended Setup

Recommended environment for smooth use:

- macOS or Linux shell environment
- `bash`
- `python3`
- `node`
- internet access
- a writable workshop repo
- a Codex environment that supports local skills

## Recommended Recipient Guidance

When sharing this package, tell recipients:

1. Place the skill folder in their local skills directory.
2. Confirm `python3` and `node` are installed.
3. Use the prompt cheat sheet for common tasks.
4. Expect the best results when working inside a LiveLabs repo or similar workshop workspace.

## Summary

The package is portable as a skill bundle, but not dependency-free as a standalone product. It runs best in a prepared Codex environment with Python, Node, and normal shell tooling available.
