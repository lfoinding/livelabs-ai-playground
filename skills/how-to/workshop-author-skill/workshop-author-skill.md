# LiveLabs Workshop Author Skill

Estimated Time: 10 minutes

## Introduction

Use `$livelabs-workshop-author` when you want Codex to turn a source article, product page, or tutorial into a draft LiveLabs workshop.

This guide points you to the full lab and summarizes the minimum prompt shape so you can start quickly.

### Objectives

- know when to use the workshop author skill
- find the full lab in this repo
- understand the minimum source-to-workshop prompt

## Task 1: Start With The Full Lab

1. Use the full lab here:

    - `skills/how-to/workshop-author-skill/create-workshops-from-blog-posts.md`

2. Use that lab when you want the full step-by-step workflow for:

    - turning a blog post into a workshop plan
    - shaping `Lab 1` as the first hands-on lab
    - preserving exact commands from the source
    - reviewing the result for structure and source fidelity

## Task 2: Remember The Core Prompt Pattern

1. Start with the skill name, source URL, and output path.

2. Add audience, target variant, and lab count only when they improve the workshop shape.

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

## Acknowledgements

* **Author** - Linda Foinding, Principal Product Manager, Outbound Database Product Management
* **Last Updated By/Date** - Linda Foinding, April 2026
