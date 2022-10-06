# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.21.2] - 2022-10-06

### Changed

- Fix UserMetric `LAST_SEEN` aggregateId

## [1.21.1] - 2022-09-22

### Changed

- Fix Swagger schema syntax errors
- Enforce validation of Swagger schema on generate
- Improve compatibility with OpenAPI 6 generator

## [1.21.0] - 2022-09-21

### Added

- Add custom fields introspection to program template
- Add `countryCode` to program trigger schema
- Documentation for event idempotency added to Swagger schema

### Changed

- Update User Metric schema to include windowing configurations
- Update User Metric schema to remove fieldsFilter
- Fixed user metric aggregate schema, `eventKey` should've been `userEventKey`

## [1.19.0] - 2022-07-21

### Added

- Microsite template schema
- Values schema for Microsite pages and layouts
- `dependencies` and `notFoundUrlPath` to Microsite hosting schema

## [1.18.1] - 2022-07-04

### Added

- Program engine EXCHANGE_REWARD mutation

## [1.18.0] - 2022-05-09

### Changed

- Added hosted portal and managed identity config schemas

## [1.17.0] - 2022-03-23

### Added

- Tenant job schema for user deletion and US tax reports

### Changed

- Updated dependencies
- Upgraded all draft-04 schemas to draft-06

## [1.16.11] - 2021-11-17

### Changed

- Program Messages
  - Removed "image" as a required field for the "HOSTED" source
  - Removed "pinterestShareBody" as a required field for the "PINTEREST" share medium
  - Removed "pinterestImageURL" as a required field for the "PINTEREST" share medium

[1.21.2]: https://github.com/saasquatch/schema/releases/tag/v1.21.2
[1.21.1]: https://github.com/saasquatch/schema/releases/tag/v1.21.1
[1.21.0]: https://github.com/saasquatch/schema/releases/tag/v1.21.0
[1.19.0]: https://github.com/saasquatch/schema/releases/tag/v1.19.0
[1.18.1]: https://github.com/saasquatch/schema/releases/tag/v1.18.1
[1.18.0]: https://github.com/saasquatch/schema/releases/tag/v1.18.0
[1.17.0]: https://github.com/saasquatch/schema/releases/tag/v1.17.0
[1.16.11]: https://github.com/saasquatch/schema/releases/tag/v1.16.11
