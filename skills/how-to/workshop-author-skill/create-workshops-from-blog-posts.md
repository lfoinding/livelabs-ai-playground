# From Idea to Publish-Ready in One Flow

## Introduction

This lab shows authors how to use `livelabs-workshop-author` to turn a source article into a draft LiveLabs workshop with a clear lab plan, solid structure, and validator-aligned markdown.

This lab uses the Oracle Database blog post `Introducing Private Agent Factory: Unlocking the Agentic AI Potential in Enterprises with Oracle AI Database 26ai` as the source. Do not copy the article section by section. Convert it into a workshop with a clear learner flow, concrete outcomes, and explicit TODO markers where the source points to product pages or hands-on labs instead of full implementation detail.

### Objectives

In this lab, you will:

- use a simple prompt to create a workshop from a blog post
- convert source narrative into a LiveLabs lab plan
- shape a first lab that starts the learner flow
- turn launch content into concrete lab outcomes
- review the generated workshop for structure, teaching flow, and source fidelity

Estimated Time: 15 minutes

## Task 1: Start With A Simple Source-To-Workshop Prompt

1. Use `livelabs-workshop-author` when the source is a blog post, product doc, tutorial page, or similar reference rather than an existing workshop.

2. Keep the first prompt simple. Give Codex the source URL, output path, intended audience, and target workshop shape.

3. Use a prompt like this:

    ```text
    $livelabs-workshop-author create a new LiveLabs workshop from this source blog post.
    Source: https://blogs.oracle.com/database/introducing-private-agent-factory-unlocking-the-agentic-ai-potential-in-enterprises-with-oracle-ai-database-26ai
    Output: /path/to/private-agent-factory-workshop
    Audience: enterprise architects, AI developers, and database platform teams
    Variant: sandbox
    Create an introduction and 3 labs.
    Lab 1 should start the learner flow.
    Use only the source content and convert it into workshop tasks.
    ```

4. Do not add validator rules, markdown contract text, or writing rules to the prompt. The skill already owns those internal steps.

    ![Agent Factory container diagram from the source blog post showing the main platform components that can become the opening visual anchor in the generated workshop](https://blogs.oracle.com/database/wp-content/uploads/sites/78/2026/03/AgentFactoryContainer.png)

    Source-blog screenshot showing the core platform view that the generated workshop can use to anchor the opening explanation.

## Task 2: Convert The Blog Into A Real Lab Plan

1. Review the source and convert it into learner actions instead of copying the blog headings as-is.

2. For the Private Agent Factory article, a strong first-draft workshop plan is:

    - `Introduction`: explain what Private Agent Factory is, who it serves, and what the learner will review
    - `Lab 1`: map the platform shape, entry points, and core building blocks from the source article
    - `Lab 2`: translate differentiators such as database integration, air-gapped deployment, security, and portability into customer-facing outcomes
    - `Lab 3`: package the next steps by pointing learners to the hands-on lab, product page, deployment options, and any remaining SME follow-up items

3. Use the blog workflow, commands, and outcomes as the source of truth for the lab sequence.

4. Avoid mirroring the source article mechanically. A good workshop uses the article to build a learner journey, not a prose summary.

## Task 3: Make Lab 1 Start The Hands-On Work

1. Keep `Lab 1` concrete. Start the first real learner task there instead of spending the whole lab on background.

2. In this example, `Lab 1` should start by helping the learner understand what the platform includes and how a user starts:

    - review the no-code Agent Builder canvas
    - identify the main entry points such as pre-built agents, templates, and the canvas
    - map the data, user, and LLM configuration options
    - explain how published agents are exposed through secure REST APIs

3. Turn product-level gaps into explicit TODO markers instead of pretending the source includes implementation detail it does not provide.

4. Preserve exact product names, platform terms, deployment targets, and linked follow-on resources from the source when they appear in the blog post.

    ![Agent Factory landing page screenshot from the source blog post showing the main starting points for pre-built agents, templates, and the Agent Builder canvas](https://blogs.oracle.com/database/wp-content/uploads/sites/78/2026/03/AgentFactory_Screen-1.png)

    Source-blog screenshot showing the landing page elements that belong in the first guided lab.

## Task 4: Preserve Commands And Cut Prose Bloat

1. Keep source facts exact.

2. Rewrite the explanation around those facts so it is shorter, more direct, and easier to follow in workshop form.

3. For this blog example, preserve facts and artifacts such as:

    - the no-code Agent Builder canvas
    - secure REST API access for published agents
    - support for private or cloud LLMs
    - portability through the Open Agent Specification
    - deployment and availability across Oracle AI Database environments
    - links to the hands-on lab and product page

4. Convert blog narration into task language:

    - what the learner must do
    - what platform capability they must identify
    - what customer outcome that capability supports
    - what screenshot or source fact proves the point
    - what missing implementation detail still needs SME follow-up

    ![Context graph illustration from the source blog post showing how Oracle AI Database and Agent Factory frame business context and trusted actions](https://blogs.oracle.com/database/wp-content/uploads/sites/78/2026/03/ContextGraphstack.png)

    Source-blog screenshot showing the architecture view that can support a customer-outcomes section in the generated workshop.

## Task 5: Add A FreeSQL Run Section When The Lab Includes SQL

1. If the source material includes SQL, PL/SQL, Quick SQL, or database queries that learners should run, tell `livelabs-workshop-author` to include a FreeSQL step inside the lab.

2. Use the FreeSQL section when the learner benefits from running code instead of only reading it.

3. Ask for one of these output shapes:

    - a plain SQL code block when readability is enough
    - a FreeSQL share link when markdown is the safest default
    - an embedded FreeSQL worksheet when the LiveLabs experience should keep the learner in the lab

4. Use a prompt like this when the generated workshop should include runnable SQL:

    ```text
    Update this workshop to add a FreeSQL run section wherever the learner should execute SQL.
    Use the FreeSQL guidance inside livelabs-workshop-author.
    Prefer an embedded FreeSQL worksheet when the lab should keep the learner in the flow.
    Otherwise use a FreeSQL share link.
    Keep the SQL exact and add a clear success check after each run step.
    ```

5. In the generated markdown, make the FreeSQL step concrete:

    - tell the learner what SQL to run
    - tell the learner where to run it
    - tell the learner what result proves success
    - keep the run step inside the numbered task flow

6. Use an embedded FreeSQL iframe block when the lab should keep the learner inside the LiveLabs flow.

7. Add a prerequisite when the lab depends on FreeSQL:

    - `FreeSQL account created`

8. Use embedded FreeSQL only when it improves the lab. If the SQL is short or the renderer is uncertain, a share link is the safer default.

This is the rendered pattern you want in the final lab. The sample below uses a known-good query that returns five rows from `hr.employees`, so it renders cleanly in FreeSQL. Replace the embedded URL with the worksheet generated for your own SQL when you build the final workshop:

<iframe
            class="freesql-embed"
            data-freesql-src="https://freesql.com/embedded/?layout=vertical&compressed_code=H4sIAP9EzWkC%2FytOzUlNLlHQUkgrys9VyCjSS80tyMmvTE0tVkhLLUnOUEjLLCouUTBVKMovL1bIz8uptAYA9Tcb1zMAAAA%3D&code_language=SQL&code_format=sql"
            height="460px"
            width="100%"
            scrolling="no"
            frameborder="0"
            allowfullscreen="true"
            name="FreeSQL Embedded Playground"
            title="FreeSQL"
            style="width: 100%; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;"
        >FreeSQL Embedded Playground</iframe>

When you use a block like this in a lab, add a short success check right after it, for example: `Run the query and confirm that FreeSQL returns five employee rows.`

## Task 6: Review The Generated Workshop Like An Editor

1. After generation, review the result against the source article.

2. Check these items first:

    - the workshop has an `Introduction` plus the intended lab sequence
    - `Lab 1` starts the learner flow
    - every major platform capability or deployment fact in scope is preserved accurately
    - source prose was converted into numbered learner steps
    - unsupported claims were not invented
    - product-detail gaps are marked clearly as TODO items

3. Then check the LiveLabs authoring details:

    - each file has the required sections
    - task headers are in the right format
    - estimated time labels are present
    - acknowledgements are present
    - `Learn More` links include the source article when useful

## Task 7: Use Follow-Up Prompts That Fix The Right Problem

1. If the generated workshop reads too much like the source article, ask for a structure pass instead of a generic polish pass.

2. Use a prompt like this when the output stayed too narrative:

    ```text
    Rework this workshop so each lab follows the learner workflow from the source.
    Convert narrative paragraphs into clearer tasks and numbered steps.
    Keep commands and URLs exact.
    ```

3. Use a prompt like this when the workshop invented values that should stay open:

    ```text
    Recheck the generated workshop against the source article.
    Replace any invented deployment steps, setup commands, or unsupported product details with explicit TODO markers unless the source states them directly.
    ```

4. Use a prompt like this when the workshop needs a stronger lab split:

    ```text
    Re-split the workshop into an introduction plus 3 labs.
    Keep Lab 1 focused on platform shape and entry points.
    Use Lab 2 for differentiators and customer outcomes.
    Use Lab 3 for hands-on lab links, product links, deployment options, and next steps.
    ```

## Task 8: Expect A Useful Delivery Summary

1. Expect Codex to report:

    - the generated workshop path
    - files created or updated
    - the source used
    - the lab plan it chose
    - validation status
    - unresolved TODO items that still need SME input

2. Before you finish, confirm:

    - the correct source URL was used
    - the output path was correct
    - the lab split matches the source workflow
    - the commands stayed accurate
    - the final markdown reads like a workshop, not a blog summary

## Learn More

- [Oracle Database Blog: Introducing Private Agent Factory](https://blogs.oracle.com/database/introducing-private-agent-factory-unlocking-the-agentic-ai-potential-in-enterprises-with-oracle-ai-database-26ai)
- [Oracle AI Database Private Agent Factory Product Page](https://www.oracle.com/database/agent-factory/)
- [Oracle LiveLabs: The Private Agent Factory Turn Data into Action](https://livelabs.oracle.com/ords/r/dbpm/livelabs/view-workshop?clear=RR,180&wid=4336)
- [Oracle LiveLabs How-To](https://livelabs.oracle.com/how-to)

## Acknowledgements

* **Author** - Linda Foinding, Principal Product Manager, Outbound Database Product Management
* **Last Updated By/Date** - Linda Foinding, April 2026
