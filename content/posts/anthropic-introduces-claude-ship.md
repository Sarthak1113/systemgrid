---
title: "Anthropic introduces Claude Ship, which enables AI agents to review, fix and approve code changes."
slug: "anthropic-introduces-claude-ship"
description: "Anthropic announces Claude Ship, a suite of AI agents automating code reviews, bug fixes, and policy-driven pull request approvals."
publishedAt: "2026-11-24"
updatedAt: "2026-11-24"
author:
  name: "Meera Negi"
  title: "Lead Tech & Systems Writer at SystemGrid"
  avatar: "/authors/meera-negi.png"
category: "Artificial Intelligence"
tags: ["Artificial Intelligence", "Anthropic", "Claude Ship", "DevOps", "AI Agents", "Code Review"]
readingTime: "3 min read"
cluster: "cloud-infrastructure"
isPillar: false
schemaType: "TechArticle"
---

Anthropic is moving from having [Claude](https://www.anthropic.com/claude) write code to helping developers decide when that code is ready to ship. On Monday, the newly public AI company announced Claude Ship, a suite of AI agents that automates code reviews, fixes, and approvals for routine code changes.

The latter is the more interesting part of this new set of tools, as AI coding tools have already offered code review features. What’s notable about Claude Ship is not just that it can review proposed code changes and identify and address problems, but that it also includes an agent that can approve code changes automatically based on policies set by a development team.

The launch comes at a time when AI coding agents have become increasingly capable of generating substantial amounts of code, creating bottlenecks in reviewing and approving code changes before they go live. With Claude Ship, the idea is to automate even more of the development process by delegating approval authority to an AI agent.

“Most teams want a person to approve every change, and that’s easy to keep up with when people write every line. But a lot of developers build with agents now,” a company blog post explains. “On the Claude Code team, Claude writes most of our code, and we wanted everything after the PR to move that fast too.”

Claude Ship is launching in beta, allowing early adopters to use it to review pull requests (PRs), and then decide what’s ready to merge.

The new offering consists of Code Review, which is already generally available, and two new agents now in beta: PR Steward and Claude Approvals. PR Steward focuses on addressing issues such as failing CI checks, merge conflicts, and feedback from Code Review. It also comments after every push on what it changed and how to roll it back, if needed.

Claude Approvals then applies an approval policy that the team writes as a file in the repository. This approval process can incorporate various signals, including Code Review findings or the company’s own classifiers, with policies written in natural language.

Because the offering is still in beta, Anthropic suggests running the approval functionality in observe-only mode first. Teams can also start with just one repository and set monthly spending limits to better control the process.

Anthropic says teams will also remain in control of where Claude Ship runs, which review settings to use (e.g., Quick, Standard, or Deep), and which changes should be escalated to a human for a decision.

Claude Ship is rolling out to Claude Team and Enterprise plans for GitHub repositories. Code Review is generally available, while PR Steward and Claude Approvals are in beta.
