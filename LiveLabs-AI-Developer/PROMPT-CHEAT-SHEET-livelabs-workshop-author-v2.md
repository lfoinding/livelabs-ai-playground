# LiveLabs Workshop Author v2 Prompt Cheat Sheet

Use these prompt patterns when working with `livelabs-workshop-author-v2`.

## 1. Create A Workshop From Sources

```text
$livelabs-workshop-author-v2
Mode: publish-ready
Create a LiveLabs workshop from these sources:
- <source 1>
- <source 2>
Audience: <audience>
Outcome: <what learner should achieve>
Include screenshots where they materially help.
Include FreeSQL content when runnable SQL improves the lab.
```

## 2. Create Lab 1 Only

```text
$livelabs-workshop-author-v2
Mode: how-to-guide
Create lab 1 only from this source:
- <source>
Lab title: <title>
Include screenshots and one FreeSQL example if useful.
```

## 3. Update An Existing Workshop

```text
$livelabs-workshop-author-v2
Mode: publish-ready
Update this workshop:
Path: <workshop root>
Goal: <what should change>
Keep the existing workshop structure unless the task requires a new lab.
Run QA before returning the result.
```

## 4. Add Embedded FreeSQL To A Lab

```text
$livelabs-workshop-author-v2
Mode: publish-ready
Update this workshop:
Path: <workshop root>
Add FreeSQL inside the workshop, not as a link.
Lab: <lab path or title>
Task outcome: <what the learner should do with the SQL result>
Use an embedded FreeSQL editor with the canonical LiveLabs iframe pattern.
```

## 5. Add A New Quiz Lab

```text
$livelabs-workshop-author-v2
Mode: quiz-ready
Update this workshop:
Path: <workshop root>
Add a new final lab called: <quiz title>
Create scored quiz questions from the earlier labs.
Update the manifest and run QA.
```

## 6. Convert A Workshop To A New Industry

```text
$livelabs-workshop-author-v2
Mode: industry-conversion
Convert this workshop to the <industry> industry.
Source: <workshop path or URL>
Company: <company name>
Preserve source flow and keep generic content close to the original.
Rewrite only the scenario layer first, then run leftover-term and fidelity checks.
```

## 7. Convert To A Specific Company Scenario

```text
$livelabs-workshop-author-v2
Mode: industry-conversion
Convert this workshop for:
Industry: <industry>
Company: <company name>
Persona: <target user>
Business objects: <orders, claims, accounts, policies, etc.>
Statuses: <status list>
Desired outcomes: <business outcomes that should appear in titles and summaries>
Source: <workshop path or URL>
Preserve the original technical teaching flow.
```

## 8. Tighten And Validate A Workshop

```text
$livelabs-workshop-author-v2
Mode: publish-ready
Review and tighten this workshop:
Path: <workshop root>
Run QA, clean up LiveLabs formatting, tighten prose, and summarize any unresolved gaps.
```

## 9. Build A FastLab

```text
$livelabs-workshop-author-v2
Mode: fastlab
Create a short LiveLabs workshop from:
- <source>
Target length: <minutes>
Focus on only the steps required to reach the learner outcome.
```

## 10. Best Prompt Add-Ons

Add these when relevant:

- `Do not use multiple skills.`
- `Use screenshots only where they materially help.`
- `Keep the titles outcome-based.`
- `Use embedded FreeSQL, not a link.`
- `Preserve the original lab order.`
- `Add a new final lab instead of editing an existing one.`
- `Keep the prose direct and remove filler.`
- `Run QA before you return the workshop.`
