# unnecessary-tools

もしかするといらないかもしれないツールの類

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 機能

* ランダム文字列生成
  - [nanoid](https://github.com/ai/nanoid)を生成
  - [UUID](https://datatracker.ietf.org/doc/html/rfc4122) (V4)を生成
* 日付のフォーマット、計算
  - [dayjs](https://day.js.org)
* CSVをJSONやHTMLテーブルに変換
  - [papaparse](https://www.papaparse.com/)
  - [gridjs](https://gridjs.io/)
* Quoted Printable 形式のテキストのエンコード/デコード
  - [quoted-printable](https://www.npmjs.com/package/quoted-printable)
* 分かち書き
  - [tiny-segmenter](http://chasen.org/~taku/software/TinySegmenter/)
* 複数行テキストを Elm 言語の文字列リテラルに変換する
* Amazon.co.jp の商品URLからパラメーターを除外して最小表記にする

## Development

```sh
# Start development server at http://localhost:3000
$ pnpm run dev

# Build the site
$ pnpm run build

# Export as static HTML
$ npx next export
```

## License

このリポジトリーに含まれるコードは、次の例外を除いてすべて CC0 1.0 ライセンスです。

- [Tiny Segmenter](http://chasen.org/~taku/software/TinySegmenter/) BSD 3-Clause LICENSE
  * <https://opensource.org/license/bsd-3-clause/>