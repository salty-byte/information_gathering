# information_gathering

[![tests](https://github.com/salty-byte/information_gathering/workflows/tests/badge.svg)](https://github.com/salty-byte/information_gathering/actions?workflow=tests)
[![Coverage Status](https://coveralls.io/repos/github/salty-byte/information_gathering/badge.svg?branch=main)](https://coveralls.io/github/salty-byte/information_gathering?branch=main)

To gather information such as security news using [Google Apps Script](https://developers.google.com/apps-script/) and [Google Spreadsheet](https://developers.google.com/apps-script/reference/spreadsheet).
Developed by [clasp](https://github.com/google/clasp).

## Requirement

- Nodejs: 14.x

## Install

```shell
npm install
```

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

**Run functions in Apps Script:**

- createInfos
- uploadInfos
- execSecurityNext
- execHatenaBlog
- execHatenaBookmark
- execITmedia
- execTheHackerNews
- execUCCard

### Details: functions in Apps Script

- createInfos

  - Get the data from each website and write it to spreadsheets.

- uploadInfos

  - Send the data written in the spreadsheets to Slack.

  - Needs: set a script property `SLACK_URL`  
    ex. `https://hooks.slack.com/services/XXXXXXX/YYYYYY/ZZZZZZZZZZZZZ`

- execSecurityNext

  - Get the data about `Security Next` and send it to Slack.

- execHatenaBlog

  - Get the data about `はてなブログ` and send it to Slack.

  - Needs: set a script property `HATENA_BLOG_URLS` if you want to get information about Hatena blogs  
    Set the Hatena blog URLs separated by commas.  
    ex. `https://XXX.hatenadiary.jp/rss,https://YYY.hatenablog.com/rss`

- execHatenaBookmark

  - Get the data about `はてなブックマーク` with security tags and send it to Slack.

- execITmedia

  - Get the data about `ITmedia` and send it to Slack.

- execTheHackerNews

  - Get the data about `The Hacker News` and send it to Slack.

- execUCCard

  - Get the data about `UCカード 重要なお知らせ` and send it to Slack.

## Test

```shell
npm test
```

## License

[MIT](https://github.com/salty-byte/information_gathering/blob/development/LICENSE)

## Author

[salty-byte](https://github.com/salty-byte)
