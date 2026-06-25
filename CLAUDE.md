# Claude Code Rules for Money-Stopwatch

## Branch Rules
- ALWAYS commit directly to main
- NEVER create a new branch under any circumstances
- If there is a merge conflict or any issue that would normally require a new branch, STOP and ask the user before proceeding
- Do not use git rebase, git merge from another branch, or any operation that creates a new branch
- If you are unsure whether a change is safe to commit to main, ask the user first

## URL Standards
- All new pages use folder/index.html structure: /feed/article-name/index.html serves as /feed/article-name/
- Never use .html extensions on new pages
- Always use https://moneystopwatch.com/ — no www prefix
- Always use trailing slash on folder URLs

## General Rules
- Never modify the /admin/ directory unless explicitly instructed
- Always verify CSS and JS paths are correct for the file depth before committing
