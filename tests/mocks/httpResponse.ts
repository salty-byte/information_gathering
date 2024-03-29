const xmlArray = [
  {
    startUrl: 'https://test.example.com/',
    content: '<html>test</html>',
  },
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
            <title>タイトル１</title>
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
            <pubDate>Thu, 26 Nov 2020 00:00:00 +0000</pubDate>
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
            <author>test1@example.com (Test1)</author>
            <pubDate>Fri, 27 Nov 2020 00:00:00 PST</pubDate>
            <description>Description1</description>
            <media:thumbnail url="/media1.jpg" height="72" width="72" />
          </item>
          <item>
            <title>Title2</title>
            <link>https://example.com/the-hackers-news/2</link>
            <author>test2@example.com (Test2)</author>
            <pubDate>Thu, 26 Nov 2020 00:00:00 PST</pubDate>
            <description>Description2</description>
            <media:thumbnail url="/media2.jpg" height="72" width="72" />
          </item>
        </channel>
      </rss>`,
  },
  {
    startUrl: 'https://b.hatena.ne.jp/',
    content: `<?xml version="1.0" encoding="UTF-8"?>
      <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
        <channel rdf:about="https://example.com">
        <title>Title</title>
        <link>https://example.com/it</link>
        <description>Description</description>
        <items>
          <rdf:Seq>
            <rdf:li rdf:resource="https://example.com/resource" />
          </rdf:Seq>
        </items>
        </channel>
        <item rdf:about="https://example.com/hatena/1">
          <title>&#x30BF;&#x30A4;&#x30C8;&#x30EB;&#xFF11;</title>
          <link>https://example.com/hatena/1</link>
          <description>&#x8AAC;&#x660E;&#xFF11;</description>
          <dc:date>2020-12-28T00:00:00Z</dc:date>
          <dc:subject>&#x30BB;&#x30AD;&#x30E5;&#x30EA;&#x30C6;&#x30A3;</dc:subject>
          <dc:subject>test1</dc:subject>
        </item>
        <item rdf:about="https://example.com/hatena/2">
          <title>&#x30BF;&#x30A4;&#x30C8;&#x30EB;&#xFF12;</title>
          <link>https://example.com/hatena/2</link>
          <description>&#x8AAC;&#x660E;&#xFF12;</description>
          <dc:date>2020-12-27T00:00:00Z</dc:date>
          <dc:subject>security</dc:subject>
          <dc:subject>test2</dc:subject>
        </item>
        <item rdf:about="https://example.com/hatena/3">
          <title>&#x30BF;&#x30A4;&#x30C8;&#x30EB;&#xFF13;</title>
          <link>https://example.com/hatena/3</link>
          <description>&#x8AAC;&#x660E;&#xFF13;</description>
          <dc:date>2020-12-26T00:00:00Z</dc:date>
          <dc:subject>no-security</dc:subject>
          <dc:subject>test2</dc:subject>
        </item>
      </rdf:RDF>`,
  },
  {
    startUrl: 'https://www2.uccard.co.jp/',
    content: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <title>Title</title>
        </head>
        <body>
          <h1>重要なお知らせ</h1>
          <div class="contents_detail spnSection">
            <h2><span>2020年</span></h2>
            <dl class="clearfix">
              <dt>2020年12月20日</dt>
              <dd><a href="/uccard/1" target="_blank">タイトル１</a></dd>
              <dt>2020年12月19日</dt>
              <dd><a href="/uccard/2" target="_blank">タイトル２   <img alt="" src="/title2.img" /></a></dd>
            </dl>
            <h2><span>2019年</span></h2>
            <dl class="clearfix">
              <dt>2019年11月25日</dt>
              <dd><a href="/uccard/3" target="_blank">タイトル３</a></dd>
            </dl>
          </div>
        </body>
      </html>`,
  },
  {
    startUrl: 'https://example.com/hatena-1/',
    content: `<?xml version="1.0"?>
      <rss version="2.0">
        <channel>
          <title>タイトル</title>
          <link>https://example.com/</link>
          <description>説明</description>
          <lastBuildDate>Mon, 28 Dec 2020 00:00:00 +0900</lastBuildDate>
          <item>
            <title>タイトル１</title>
            <link>https://example.com/hatena-1/1</link>
            <description>説明１</description>
            <pubDate>Mon, 28 Dec 2020 00:00:00 +0900</pubDate>
            <category>test1</category>
          </item>
          <item>
            <title>タイトル２</title>
            <link>https://example.com/hatena-1/2</link>
            <description>説明２</description>
            <pubDate>Sun, 27 Dec 2020 00:00:00 +0900</pubDate>
            <category>test2</category>
          </item>
        </channel>
      </rss>`,
  },
  {
    startUrl: 'https://example.com/hatena-2/',
    content: `<?xml version="1.0"?>
      <rss version="2.0">
        <channel>
          <title>タイトル</title>
          <link>https://example.com/</link>
          <description>説明</description>
          <lastBuildDate>Mon, 28 Dec 2020 00:00:00 +0900</lastBuildDate>
          <item>
            <title>タイトル３</title>
            <link>https://example.com/hatena-2/1</link>
            <description>説明１</description>
            <pubDate>Mon, 28 Dec 2020 00:00:00 +0900</pubDate>
            <category>test1</category>
          </item>
        </channel>
      </rss>`,
  },
  {
    startUrl: 'https://example.com/qiita-1/',
    content: `<?xml version="1.0" encoding="UTF-8"?>
      <feed xml:lang="ja-JP" xmlns="http://www.w3.org/2005/Atom">
        <title>test1タグが付けられた新着記事</title>
        <description>test1タグが付けられた新着記事</description>
        <updated>2021-01-23T01:00:00+09:00</updated>
        <link>https://example.com/qiita/tags/test1</link>
        <entry>
          <id>tag:test1</id>
          <published>2021-01-23T00:00:00+09:00</published>
          <updated>2021-01-23T01:00:00+09:00</updated>
          <link rel="alternate" type="text/html" href="https://example.com/qiita-1/2" />
          <url>https://example.com/qiita-1/2</url>
          <title>タイトル２</title>
          <content type="html">内容２</content>
        </entry>
        <entry>
          <id>tag:test1</id>
          <published>2021-01-22T00:00:00+09:00</published>
          <updated>2021-01-22T01:00:00+09:00</updated>
          <link rel="alternate" type="text/html" href="https://example.com/qiita-1/1" />
          <url>https://example.com/qiita-1/1</url>
          <title>タイトル１</title>
          <content type="html">内容１</content>
        </entry>
      </feed>`,
  },
  {
    startUrl: 'https://example.com/qiita-2/',
    content: `<?xml version="1.0" encoding="UTF-8"?>
      <feed xml:lang="ja-JP" xmlns="http://www.w3.org/2005/Atom">
        <title>test2タグが付けられた新着記事</title>
        <description>test2タグが付けられた新着記事</description>
        <updated>2021-01-20T01:00:00+09:00</updated>
        <link>https://example.com/qiita/tags/test2</link>
        <entry>
          <id>tag:test2</id>
          <published>2021-01-20T00:00:00+09:00</published>
          <updated>2021-01-20T01:00:00+09:00</updated>
          <link rel="alternate" type="text/html" href="https://example.com/qiita-2/1" />
          <url>https://example.com/qiita-2/1</url>
          <title>タイトル３</title>
          <content type="html">内容３</content>
        </entry>
      </feed>`,
  },
  {
    startUrl: 'https://example.com/rss2-1/',
    content: `<?xml version="1.0"?>
      <rss version="2.0">
        <channel>
          <title>サイト１</title>
          <link>https://example.com/</link>
          <description>説明</description>
          <lastBuildDate>Mon, 28 Dec 2020 00:00:00 +0900</lastBuildDate>
          <item>
            <title>タイトル１</title>
            <link>https://example.com/rss2-1/1</link>
            <description>説明１</description>
            <pubDate>Mon, 28 Dec 2020 00:00:00 +0900</pubDate>
            <category>test1</category>
          </item>
          <item>
            <title>タイトル２</title>
            <link>https://example.com/rss2-1/2</link>
            <description>説明２</description>
            <pubDate>Sun, 27 Dec 2020 00:00:00 +0900</pubDate>
            <category>test2</category>
          </item>
        </channel>
      </rss>`,
  },
  {
    startUrl: 'https://example.com/rss2-2/',
    content: `<?xml version="1.0"?>
      <rss version="2.0">
        <channel>
          <title>サイト２</title>
          <link>https://example.com/</link>
          <description>説明</description>
          <lastBuildDate>Mon, 28 Dec 2020 00:00:00 +0900</lastBuildDate>
          <item>
            <title>タイトル３</title>
            <link>https://example.com/rss2-2/1</link>
            <description>説明１</description>
            <pubDate>Mon, 28 Dec 2020 00:00:00 +0900</pubDate>
            <category>test1</category>
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
