# LiveLabs Industry Converter Guide

Estimated Time: 10 minutes

## Introduction

Use `$livelabs-industry-converter` when you want Codex to create an industry-specific version of an existing Oracle LiveLabs workshop while preserving the source structure and teaching flow.

### Objectives

- Understand the simple prompt shape for the converter
- Know what the skill handles automatically
- Review the converted workshop for fidelity and duplication issues

## Task 1: Start With The Core Prompt

1. Use the skill name with the source workshop path and target industry:

    ```text
    $livelabs-industry-converter convert this workshop to the finance industry.
    Source: /path/to/source/workshop
    ```

2. Add `Output:` when you want the converted workshop written to a specific folder.

3. Add `Company:` when you want the examples anchored to a specific target company.

## Task 2: Let The Skill Own The Internal Workflow

1. Do not add validator rules, grading rubric text, or conversion mechanics in the user prompt.

2. The skill already handles:

    - source inspection
    - manifest and lab-order detection
    - domain mapping
    - rewrite and repair passes
    - screenshot preservation
    - validator checks
    - source-fidelity checks

## Task 3: Review The Result Carefully

1. Check for:

    - missing labs, tasks, or numbered steps
    - shortened explanation text
    - missing screenshots
    - leftover source-domain terms
    - duplicated intro blocks or repeated task text introduced during repair

2. Do not treat validator success alone as proof of fidelity.

## Acknowledgements

* **Author** - Linda Foinding, Principal Product Manager, Outbound Product Management
* **Last Updated By/Date** - Linda Foinding, April 2026
