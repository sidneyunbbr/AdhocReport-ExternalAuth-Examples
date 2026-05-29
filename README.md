# AdhocReport External Auth Examples (Starter)

This folder is a **publish-ready starter** for a public repository with didactic external authentication servers.

## Goal
Provide clear, practical examples of how an external server must answer `AdhocReport.ServerApp` authentication requests.

## Proposed public repository name
- `AdhocReport-ExternalAuth-Examples`

## Suggested structure
- `docs/` - canonical contract, rules, integration, troubleshooting
- `javascript-node/` - first didactic implementation (no database seed required)
- `dotnet-aspnet/` - future example
- `java-spring/` - future example
- `go-fiber/` - future example

## Included in this starter
- Canonical contract documentation
- ServerApp integration tutorial
- First Node.js implementation with in-memory users

## Existing internal references you can adapt
- `scr/App/Presentation/AdhocReport.Web.UI/AdhocReport.ServerApp/ExternalAuth-User-Manual.md`
- `scr/App/Presentation/AdhocReport.Web.UI/AdhocReport.ServerApp/ExternalAuth-Mental-Map.md`

## Publish flow
1. Copy this folder to a new repository root.
2. Rename repository to your final public name.
3. Keep `javascript-node` as the first working sample.
4. Add new language servers following the same docs + endpoint contract.
