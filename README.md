# information_gathering

[![tests](https://github.com/salty-byte/information_gathering/workflows/tests/badge.svg)](https://github.com/salty-byte/information_gathering/actions?workflow=tests)
[![Coverage Status](https://coveralls.io/repos/github/salty-byte/information_gathering/badge.svg?branch=main)](https://coveralls.io/github/salty-byte/information_gathering?branch=main)

To gather information such as security news using [Google Apps Script](https://developers.google.com/apps-script/) and [Google Spreadsheet](https://developers.google.com/apps-script/reference/spreadsheet).
Developed by [clasp](https://github.com/google/clasp).

## Requires

- Nodejs: 14.x

## Usage

**Sign in to Google Apps:**

```shell
npx clasp login
```

Then enable the Google Apps Script API: https://script.google.com/home/usersettings

**Create Sheet:**

```shell
npx clasp create --type sheets --rootDir ./dist
```

**Deploy:**

```shell
npm run deploy
```

**Run Apps Script:**

- createInfos

  - Get data from each website and write them to a spreadsheet.

- uploadInfos

  - Send the data written in the spreadsheet to Slack.

  - Needs: set a script property `SLACK_URL`  
    ex. `https://hooks.slack.com/services/XXXXXXX/YYYYYY/ZZZZZZZZZZZZZ`

## Installs

```shell
npm install
```

## Tests

```shell
npm test
```

## License

[MIT](https://github.com/salty-byte/information_gathering/blob/development/LICENSE)

## Author

[salty-byte](https://github.com/salty-byte)
