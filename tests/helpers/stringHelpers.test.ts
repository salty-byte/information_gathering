import {
  decodeEntityReferences,
  regExpOr,
} from '../../src/helpers/stringHelpers';

describe('stringHelpers test', () => {
  describe('decodeEntityReferences test', () => {
    test('returns the decoded string', async () => {
      const r1 = decodeEntityReferences('abc&#x30b5;&#x30f3;&#x30d7;&#x30eb;');
      expect(r1).toBe('abcサンプル');

      const r2 = decodeEntityReferences('!"#$%&\'(&#x6f22;-&#x5b57;)&#xgh@;');
      expect(r2).toBe('!"#$%&\'(漢-字)&#xgh@;');
    });
  });

  describe('regExpOr test', () => {
    const xmlText = `
      <title>title</title>
      <link>https://example.com</link>
      <description>test</description>
      <item>item</item>`;

    test('returns the suitable value', async () => {
      const r1 = regExpOr(xmlText, /<title>([\s\S]+?)<\/title>/);
      expect(r1).toBe('<title>title</title>');

      const r2 = regExpOr(xmlText, /<item>([\s\S]+?)<\/item>/, 1, 'dummy');
      expect(r2).toBe('item');

      const r3 = regExpOr('abca!cabc!bc12abc3!c4!', /c[^!]+?!/g, 3);
      expect(r3).toBe('c4!');
    });

    test('returns specified value or empty when there is no suitable', async () => {
      const exp = /<name>([\s\S]+?)<\/name>/;
      const r1 = regExpOr(xmlText, exp);
      expect(r1).toBe('');

      const r2 = regExpOr(xmlText, exp, 0, 'not suitable');
      expect(r2).toBe('not suitable');
    });

    test('returns specified or empty when specified index is out of range', async () => {
      const exp = /<title>([\s\S]+?)<\/title>/;
      const r1 = regExpOr(xmlText, exp, 2);
      expect(r1).toBe('');

      const r2 = regExpOr(xmlText, exp, 2, 'not suitable');
      expect(r2).toBe('not suitable');
    });
  });
});
