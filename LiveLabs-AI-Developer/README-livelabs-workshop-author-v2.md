# LiveLabs Workshop Author v2

`livelabs-workshop-author-v2` is a self-contained skill for creating, updating, converting, illustrating, and validating Oracle LiveLabs workshops from source material such as blogs, docs, screenshots, commands, and sample SQL.

## What It Does

- Creates brand-new LiveLabs workshops from source material only
- Updates existing workshops without requiring a full rewrite
- Builds procedural how-to guides, fastlabs, publish-ready drafts, and quiz-ready workshops
- Converts existing workshops to a new industry while preserving teaching flow
- Adds screenshots and FreeSQL content where they materially improve the lab
- Validates structure, formatting, and prose quality before delivery

## Authoring Modes

- `draft`
- `publish-ready`
- `how-to-guide`
- `fastlab`
- `industry-conversion`
- `quiz-ready`

## Core Capabilities

- Translate source material into learner outcomes, lab sequence, tasks, screenshots, and FreeSQL opportunities
- Scaffold a workshop root from a canonical structure
- Create lab folders and markdown stubs automatically
- Generate or refresh `manifest.json`
- Author LiveLabs-compliant markdown labs
- Capture and stage screenshots
- Add runnable FreeSQL content
- Tighten prose using bundled writing guidance
- Run QA and produce a validation summary

## FreeSQL Support

The skill can add FreeSQL as:

- plain code blocks
- share links
- native `Run in FreeSQL` buttons
- embedded inline editors

When the user explicitly asks for FreeSQL inside the workshop, inline, embedded, or in-frame, v2 uses the embedded editor path instead of falling back to a link or button.

## Industry Conversion Support

The skill can convert an existing workshop to a new company or industry while preserving:

- lab order
- task flow
- technical teaching logic

It can also rewrite:

- scenario framing
- company language
- sample data
- statuses
- manifest descriptions
- selected quiz language

It includes leftover-term scanning and source-to-target fidelity checks to reduce source-domain leakage.

## Included Scripts

- `scaffold_workshop.sh`
- `create_lab_stub.sh`
- `render_manifest.py`
- `capture_web_screenshots.mjs`
- `stage_screenshots.sh`
- `render_freesql_block.py`
- `scan_leftover_terms.sh`
- `compare_workshop_fidelity.py`
- `run_workshop_qa.sh`

## Included References

- authoring workflow
- workshop structure
- markdown rules
- screenshot authoring
- FreeSQL authoring
- FreeSQL decision matrix
- FreeSQL site observations
- industry conversion
- source traceability
- mode selection
- prompt templates
- QA delivery contract
- AI-generated content guidance
- Lanham guidance
- grading
- lard reduction guidance

## Best Use Cases

- Create a workshop from a blog post or product page
- Upgrade a rough draft into a publish-ready LiveLabs workshop
- Add screenshots and FreeSQL to an existing lab
- Convert a workshop to finance, retail, healthcare, or another industry
- Prepare a workshop for quiz or gamification follow-on work
- Validate and tighten a workshop before review

## Output

Typical output includes:

- workshop root path
- changed/generated files
- selected mode
- QA summary
- traceability summary
- unresolved SME gaps

## Summary

If you give this skill to someone, they can use it as a self-contained LiveLabs workshop production tool to plan, scaffold, write, enrich, convert, validate, and package workshop content for review.
