# LiveLabs Workshop Author Guide

Estimated Time: 10 minutes

## Introduction

Use `$livelabs-workshop-author` when you want Codex to create a LiveLabs workshop from source material such as a blog post, product documentation, or a tutorial page.

### Objectives

- understand the minimum source-to-workshop prompt shape
- know what the skill handles automatically
- review the generated workshop for teaching flow, structure, and source fidelity

## Task 1: Start With The Source And Output Path

1. Use the skill name with the source URL and the output path for the new workshop.

2. Add audience, environment, and lab-count guidance only when it helps the workshop shape.

3. Use a prompt like this:

    ```text
    $livelabs-workshop-author create a new workshop from this blog post.
    Source: https://blogs.oracle.com/database/introducing-private-agent-factory-unlocking-the-agentic-ai-potential-in-enterprises-with-oracle-ai-database-26ai
    Output: /path/to/private-agent-factory-workshop
    Audience: enterprise architects, AI developers, and database platform teams
    Variant: sandbox
    Create an introduction and 3 labs.
    Lab 1 should start the learner flow.
    ```

## Task 2: Let The Skill Own The Internal Workflow

1. Do not pack the prompt with validator rules, Lanham rules, markdown anatomy, or repair instructions.

2. The skill already handles:

    - source-to-lab planning
    - workshop scaffolding
    - markdown structure
    - prose tightening
    - manifest assembly
    - validator-oriented repair

## Task 3: Review The Result Like An Editor

1. Check for:

    - a clear learner outcome
    - labs that follow the source workflow instead of mirroring blog headings
    - commands and URLs preserved accurately
    - TODO markers where the blog assumes environment-specific values
    - source links in `Learn More`

## Acknowledgements

* **Author** - Linda Foinding, Principal Product Manager, Outbound Database Product Management
* **Last Updated By/Date** - Linda Foinding, April 2026
