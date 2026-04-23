# Playwright Automation Exercise Project

This repository uses a project-oriented Playwright structure:

- `project/`: reusable automation code
- `tests/`: executable suites

## Structure

- `project/actions/`
  Business flows built on top of page objects
- `project/config/`
  Runtime config readers and environment mapping
- `project/core/`
  Base test and shared app context
- `project/fixtures/`
  Real Playwright fixture extensions
- `project/pages/`
  Page objects and locators
- `project/utils/`
  Small reusable helpers
- `tests/smoke/`
  Fast confidence checks
- `tests/regression/`
  Broader end-to-end coverage

## Run

```bash
npm test
npm run test:smoke
npm run test:regression
npm run test:headed
```

## Quality Checks

```bash
npm run lint
npm run format:check
```

## How To Add A New Page

1. Create a page object in `project/pages/`
2. Add reusable flows in `project/actions/` if needed
3. Register shared access in `project/core/TestContext.js`
4. Write suites in `tests/smoke/` or `tests/regression/`

## Test Data

Edit `project/testDataConfig.json` to control:

- selected environment
- deterministic timestamp
- default user data
