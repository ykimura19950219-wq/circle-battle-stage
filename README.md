# CIRCLE BATTLE STAGE LP

学生エンジニア団体向けハッカソン「CIRCLE BATTLE STAGE」の案内ページです。

- 公開URL：https://ykimura19950219-wq.github.io/circle-battle-stage/
- 配信：GitHub Pages（`main` ブランチ）
- 主催：Local STAGE Project（株式会社ローカルイノベーション）

## ファイル構成

```
index.html        ページ本体（普通のHTML）
css/style.css     :rootのトークンと全ルール
js/main.js        追従CTA・ナビの現在地（aria-current）・GA4の読み込み判定とCTA計測
images/           ページで使う画像
  lsp-logo.png                    Local STAGE Projectのロゴ（ナビでは白抜きで表示）
  hero-bg.webp                    ヒーローの背景（AI作成のイメージ写真）
  gallery-circle-meet-stage.jpg   主催者紹介の写真（CIRCLE MEET STAGE）
  gallery-meet-stage.webp         主催者紹介の写真（MEET STAGE）
ogp.png           SNS共有用の画像（1200×630）
favicon.svg       ファビコン
README.md         このファイル
```

ビルドの作業はありません。ファイルを直してpushすると、GitHub Pagesにそのまま反映されます。外部のCDNやフォントは読み込んでいません（GA4は測定IDを設定したときだけ読み込みます）。

## 編集方法

### 文言を直す
`index.html` の該当箇所を直接書き換えます。見た目は `css/style.css` のクラスで決まっているので、HTMLに `style=""` を書かないでください。

### 確認のしかた
ローカルで表示を確かめるときは、リポジトリのフォルダで次を実行し、ブラウザで http://localhost:8000 を開きます。

```bash
python3 -m http.server 8000
```

### 参戦団体を追加する
1. 団体のロゴ画像を `images/teams/` に置きます（例：`images/teams/abc-circle.png`）。
   - 表示枠は横4：縦3で、はみ出した部分は切り取られます。ロゴは4：3の余白つき画像にしておくと欠けません。
   - 幅700px前後に書き出しておくと、スマホでもきれいに表示されます。
2. `index.html` の `<section id="teams">` の中にある、次の1行を探します。

   ```html
   <p class="t-body t-body--muted">決定次第、順次公開します。</p>
   ```

3. 最初の団体を載せるときは、この1行を次のブロックに置き換えます。2団体目からは `<figure>`〜`</figure>` を1つずつ足します。

   ```html
   <div class="c-photo-grid">
     <figure class="c-photo">
       <img src="images/teams/abc-circle.png" width="700" height="525" alt="ABCサークルのロゴ" loading="lazy">
       <figcaption>ABCサークル（〇〇大学）</figcaption>
     </figure>
   </div>
   ```

   - `width` と `height` には、画像ファイルの実際の幅と高さを書きます（読み込み中に表示がずれないようにするため）。
   - `alt` には「〇〇のロゴ」と書きます。
4. ローカルで表示を確認してからpushします。

協賛企業も同じ形で、同じセクションに追加できます。見出しを分けたい場合は、`<h3>` を足す前に相談してください（スタイルの追加が必要です）。

## デザイントークン

すべての値は `:root` のトークンで管理しています。**CSSに色・余白・文字サイズを直書きしないでください。** インラインの `style=""` も使いません。

### 色（段階スケール）

| トークン | 値 | 用途・注意 |
|---|---|---|
| `--navy-900` | #0C2540 | ナビ・暗いセクションの背景、見出しの文字 |
| `--navy-800` | #143C64 | 暗いセクションの背景、ステップの丸数字 |
| `--navy-700` | #1D4C7C | ナビの下線 |
| `--navy-100` | #E4ECF4 | 暗い背景の上の補足文、ピルの背景 |
| `--teal-700` | #1F6F88 | CTAの背景、強調文字、英字小見出し、フォーカス枠（白との比 5.69:1） |
| `--teal-500` | #3CA0BE | **装飾専用。白背景の文字には使わない（3.0:1）** |
| `--teal-400` | #63B8D1 | CTAの枠線 |
| `--teal-200` | #B7E2EC | 暗い背景の上のアクセント文字・フォーカス枠 |
| `--orange-800` / `--orange-100` | #9A3412 / #FFEDD5 | 【要確認】の表示（6.38:1） |
| `--white` `--gray-50` `--gray-200` `--gray-600` `--gray-700` `--ink` | — | 背景・罫線・補足文・本文 |

### 色（意味ベース）
意味ベースのトークンは、必ず段階スケールのトークンを経由して定義します。

| トークン | 参照先 | 用途 |
|---|---|---|
| `--color-bg` / `--color-surface-alt` | white / gray-50 | ページ背景／交互の帯 |
| `--color-text` / `--color-text-muted` | ink / gray-600 | 本文／補足文 |
| `--color-border` | gray-200 | 罫線 |
| `--color-primary` / `--color-primary-strong` | navy-800 / navy-900 | 見出し・丸数字 |
| `--color-accent` | teal-500 | 装飾（見出しの下線） |
| `--color-accent-strong` | teal-700 | 強調文字・英字小見出し・リンク |
| `--color-on-dark` / `-muted` / `-accent` | white / navy-100 / teal-200 | 暗い背景の上の文字 |
| `--color-cta-bg` / `-border` / `-text` | teal-700 / teal-400 / white | エントリーボタン |
| `--color-focus` | teal-700（暗い背景では teal-200） | フォーカス枠 |
| `--color-tbd-text` / `--color-tbd-bg` | orange-800 / orange-100 | 【要確認】の表示 |
| `--color-overlay` | navy-900 の80% | ヒーロー写真に重ねる帯 |
| `--color-sticky-bg` | navy-900 の95% | スマホの追従CTAの背景 |

### 主要な色のコントラスト比（WCAG）

| 組み合わせ | 比率 |
|---|---|
| CTA：白文字 × teal-700 | 5.69:1 |
| 強調・英字小見出し：teal-700 × 白 | 5.69:1 |
| 強調・英字小見出し：teal-700 × gray-50 | 5.36:1 |
| 本文：ink × 白 | 16.50:1 |
| 補足文：gray-600 × 白 / × gray-50 | 5.92:1 / 5.57:1 |
| ナビ：白 × navy-900 | 15.51:1 |
| 暗い背景の補足文：navy-100 × navy-800 | 9.46:1 |
| 暗い背景のアクセント：teal-200 × navy-800 | 8.12:1 |
| 【要確認】：orange-800 × orange-100 | 6.38:1 |
| 参考：teal-500 × 白（文字に使わない） | 3.02:1 |

### 文字・余白など

| 種類 | トークン |
|---|---|
| 書体 | `--font-sans`（見出し・本文共通） |
| 文字サイズ | `--text-2xs`(12) `--text-xs`(14) `--text-sm`(16) `--text-md`(18) `--text-lg`(22) `--text-xl`(28) `--text-2xl`(36) `--text-4xl`(64) |
| 行間 | `--leading-tight`(1.15) `--leading-snug`(1.35) `--leading-normal`(1.6、bodyの既定値) |
| 字間 | `--tracking-tight` `--tracking-wide` `--tracking-wider` |
| 余白 | `--space-1`(4)〜`--space-8`(64) |
| 角丸 | `--radius-sm`(8) `--radius-lg`(20) `--radius-full` |
| 影 | `--shadow-md` `--shadow-lg` |
| 動き | `--ease-out` `--dur-fast` |
| レイアウト | `--container-md`(720) `--container-lg`(1080) `--section-y`（PC 64／スマホ 48） `--header-h` `--tap-min`(44) |
| 線 | `--border-thin`(1) `--border-thick`(2) `--focus-ring`(3) `--focus-offset`(2) |

### コンポーネント専用トークン
`--nav-logo-h` `--footer-logo-h` `--hero-bg-opacity` `--btn-icon-size` `--sticky-cta-h` `--section-head-rule-w` `--section-head-rule-h` `--steps-badge` `--steps-line` `--def-table-label-w` `--photo-ratio`

## コンポーネント

クラス名の接頭辞は次のとおりです。

| 接頭辞 | 意味 |
|---|---|
| `l-` | レイアウト |
| `c-` | コンポーネント |
| `t-` | 文字の書式 |
| `u-` | ユーティリティ |
| `is-` | 状態 |

| クラス | 内容 | バリエーション・状態 |
|---|---|---|
| `l-page` `l-container` `l-section` `l-stack` | ページ・幅・セクション・縦積み | `l-section--alt`（灰色の帯）`l-section--dark`（紺の帯）`l-stack--center` |
| `c-skip-link` | 「本文へスキップ」 | フォーカス時だけ表示 |
| `c-nav` | 固定ナビ（`__inner` `__brand` `__links` `__link` `__cta`） | `__link--entry`（375px未満で非表示）、`aria-current="true"`（現在地の下線） |
| `c-btn` | ボタン | `--primary` `--sm` `--block`、`:hover` `:focus-visible` `:active`、`__icon`（別タブアイコン） |
| `c-entry-block` | ボタン＋締切＋注記のまとまり（`__deadline` `__note`） | `data-hides-sticky` を付けると、表示中は追従CTAを隠す |
| `c-pill` | 小さなラベル | `--outline` |
| `c-hero` | ファーストビュー（`__bg` `__overlay` `__inner` `__title` `__catch` `__event` `__sub` `__tags` `__entry` `__note`） | — |
| `c-section-head` | 英字の小見出し＋H2＋下線（`__kicker` `__title`） | 常に左揃え |
| `c-def-table` | 項目名と内容の表（`__row`、`dt`/`dd`） | `--stack-sm`（480px未満で縦並び） |
| `c-steps` | 丸数字のステップ（`__item` `__num` `__body` `__title` `__text`） | — |
| `c-stats` / `c-stat` | 大きな数字（`<dl>`。`__label`=dt、`__value`=dd） | スマホでも2列 |
| `c-photo-grid` / `c-photo` | 写真カードとキャプション | — |
| `c-closing` | 締めのブロック（`__title` `__sub`） | — |
| `c-footer` | フッター（`__inner` `__logo` `__note`） | — |
| `c-sticky-cta` | スマホの追従CTA | `is-visible`（JSで制御。JSが動かないときは常時表示） |
| `c-tbd` | 【要確認】の表示 | — |
| `t-lead` `t-body` `t-em` | リード文・本文・強調 | `t-body--muted` `t-body--small` |
| `u-keep` `u-visually-hidden` | 単語途中で改行しない／読み上げ専用 | — |

## ブレークポイント

| 幅 | 主な変化 |
|---|---|
| 767px以下 | スマホ表示。ナビのCTAを隠す、追従CTAを出す、見出しを一段小さく、写真を1列、数字を2列 |
| 479px以下 | `c-def-table--stack-sm` を縦並びに |
| 374px以下 | ナビの「エントリー」リンクを隠す（追従CTAで代わりにする） |

## アクセシビリティ
- すべての文字はWCAG AA（4.5:1）以上
- `:focus-visible` の枠を全体に定義（暗い背景では色を切り替え）
- `prefers-reduced-motion` でスムーススクロールとアニメーションを止める
- スマホでは `scroll-padding-bottom` で、フォーカスした要素が追従CTAに隠れないようにする
- 別タブで開くリンクには、アイコンと読み上げ専用の「（新しいタブで開きます）」を付ける

## アクセス計測（GA4）

- 測定IDは `js/main.js` 内の `GA_MEASUREMENT_ID` に設定します（現在は空＝**計測コードを読み込まない**状態）
  - `G-` から始まるIDを入れたときだけ、gtag.js を読み込みます
- エントリーCTAには `data-cta-location` を付けています。クリックすると `cta_click` イベントを送り、パラメータ `cta_location` で押された場所がわかります

| `data-cta-location` | 場所 |
|---|---|
| `nav` | ナビ右端のボタン（PCのみ） |
| `hero` | ファーストビュー |
| `outline` | 開催概要の直後 |
| `closing` | 締めのセクション |
| `sticky` | スマホの追従CTA |

GA4の管理画面で、`cta_location` をカスタムディメンション（イベントスコープ）として登録すると、レポートで場所ごとに集計できます。

### 配布経路ごとのURL

| 配布経路 | URL |
|---|---|
| DM | https://ykimura19950219-wq.github.io/circle-battle-stage/?utm_source=dm&utm_campaign=cbs2026 |
| Discord | https://ykimura19950219-wq.github.io/circle-battle-stage/?utm_source=discord&utm_campaign=cbs2026 |
| X | https://ykimura19950219-wq.github.io/circle-battle-stage/?utm_source=x&utm_campaign=cbs2026 |
| メール | https://ykimura19950219-wq.github.io/circle-battle-stage/?utm_source=mail&utm_campaign=cbs2026 |
