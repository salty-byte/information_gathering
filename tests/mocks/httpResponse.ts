const xmlArray = [
  {
    startUrl: 'https://rss.itmedia.co.jp/',
    content: `<?xml version="1.0" encoding="utf-8" ?>
      <rss version="2.0">
        <channel>
          <title>チャンネルタイトル</title>
          <link>https://example.com/security/</link>
          <description>チャンネル説明</description>
          <language>ja</language>
          <pubDate>Sun, 29 Nov 2020 00:00:00 +0900</pubDate>
          <item>
            <title>タイトル１く</title>
            <link>https://example.com/itmedia/1</link>
            <description>説明１</description>
            <pubDate>Fri, 27 Nov 2020 00:00:00 +0900</pubDate>
          </item>
          <item>
            <title>タイトル２</title>
            <link>https://example.com/itmedia/2</link>
            <description>説明２</description>
            <pubDate>Thu, 26 Nov 2020 19:00:00 +0900</pubDate>
          </item>
        </channel>
      </rss>`,
  },
  {
    startUrl: 'https://www.security-next.com/',
    content: `<?xml version="1.0" encoding="UTF-8"?>
      <rss version="2.0">
        <channel>
          <title>チャンネルタイトル</title>
          <link>https://example.com/</link>
          <description>チャンネル説明</description>
          <lastBuildDate>Fri, 26 Nov 2020 00:00:00 +0900</lastBuildDate>
          <language>ja</language>
          <item>
            <title>タイトル１</title>
            <link>https://example.com/security-next/1</link>
            <pubDate>Wed, 25 Nov 2020 00:00:00 +0000</pubDate>
            <description>説明１</description>
          </item>
          <item>
            <title>タイトル２</title>
            <link>https://example.com/security-next/2</link>
            <pubDate>, 26 Nov 2020 00:00:00 +0000</pubDate>
            <description>説明２</description>
          </item>
        </channel>
      </rss>`,
  },
  {
    startUrl: 'https://feeds.feedburner.com/TheHackersNews',
    content: `<?xml version="1.0" encoding="UTF-8"?>
      <?xml-stylesheet type="text/xsl"?>
      <rss xmlns:media="/" version="2.0">
        <channel>
          <title>Channel Title</title>
          <link>https://example.com/</link>
          <description>Channel Description</description>
          <language>en</language>
          <openSearch:totalResults xmlns:openSearch="/1.0">1</openSearch:totalResults>
          <image>
            <link>/licenses</link>
            <url>/licenses.jpg</url>
            <title>Image Title</title>
          </image>
          <item>
            <title>Title1</title>
            <link>https://example.com/the-hackers-news/1</link>
            <pubDate>Fri, 27 Nov 2020 00:00:00 PST</pubDate>
            <description>Description1</description>
            <media:thumbnail url="/media1.jpg" height="72" width="72" />
            <feedburner:origLink>/burner2</feedburner:origLink>
          </item>
          <item>
            <title>Title2</title>
            <link>https://example.com/the-hackers-news/2</link>
            <pubDate>Thu, 26 Nov 2020 00:00:00 PST</pubDate>
            <description>Description2</description>
            <media:thumbnail url="/media2.jpg" height="72" width="72" />
            <feedburner:origLink>/burner2</feedburner:origLink>
          </item>
        </channel>
      </rss>`,
  },
];

export class MockHTTPResponse {
  private content: string;

  constructor(url: string) {
    const xml = xmlArray.find((v) => url.startsWith(v.startUrl));
    this.content = xml ? xml.content : '';
  }

  getContentText(): string {
    return this.content;
  }
}
