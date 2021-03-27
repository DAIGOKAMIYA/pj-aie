# アイエステ×ジェイヘアメイク

## Getting Started
#### Node.js のインストール。
nodenvかnodebrewを使うのがお勧めですが、難しそうなら直接公式サイトからもダウンロードできます。（推奨版の方を）  
https://nodejs.org/ja/

#### ターミナルでプロジェクトのディレクトリに移動
    cd ij

#### パッケージインストール（初回のみ）
    npm install

#### gulp起動(コーディング開始)
    npx gulp
#### gulp停止
    Ctrl+C

#### 画像圧縮だけしたいとき
    npx gulp img

---


## コーディングルール
#### HTML関連
- XDデータでfont-familyが'Source Han Sans JP'と'Calvaux'となっているところ以外のテキストは画像でコーディングしてください。また、テキスト画像は必ず２倍か３倍の大きさで書き出してください。
- ヘッダーやフッター等の共通部分を管理するために、EJSを使用しています。  
 https://ejs.co
- HTMLのファイル名は、ディレクトリ名をアンダースコア（_）で繋いで命名してください。  
（例）/feature/j-hm-about/staylistdebutページ → feature_j-hm-about_staylistdebut.html  
（例）/application/outlineページ → application_outline.html  
- 下記の該当箇所に、タイトル、bodyタグにつけるclass名をそれぞれ入れてください。  
<% title = ""; %>  
<% body_class = ""; %>  

#### SCSS・CSS関連
- font-sizeはremで指定(1rem = 10px)
- ページごとに、scss/partials/object/pageディレクトリにscssファイルを作成してコーディングをしてください。scssファイルを作成したら、style.scssで@importするのも忘れずに。  
（例）TOPページ：scss/partials/object/page/_home.scss  
（例）「学校の特色」ページ：scss/partials/object/page/feature/_feature.scss  
（例）「からきめ制度」ページ：scss/partials/object/page/feature/_karakime.scss  
- SCSSのディレクトリ構成はFLOCSSを基にして作っています。  
　https://github.com/hiloki/flocss

#### クラス名の付け方
①か②をおすすめしますが、他の人のコードに影響が出なければ何でもOKです。
- ①ページ名をプレフィックスとしてつける。  
 （例）トップページ：.home-about, .home-column等  
 （例）「学校の特色」ページ：.feature-  
 （例）「からきめ制度」ページ：.karakime-  

- ②bodyタグにページ固有のクラスつけ、それ以外のクラスは自由に命名する。この場合スタイルの指定は以下の様にする。  
 （例）トップページのABOUTセクションのh2にスタイルをつける場合  
 `<body class="home"><section class="about"><h2>タイトル</h2></section></body>`  
 `.home .about h2 {}` ←bodyタグに付けたクラス(.home)の子孫としてスタイルを指定。  

- `<h2 class="title"></h2>`のようなクラス名の場合、`.title`に単独でスタイルを指定するのは禁止です。別の場所でも`.title`が使われていた場合、それに影響してしまうからです。  pタグやh2タグなどにスタイルを指定するときも同じです。  
 NG： `.title {}`  
 NG： `p {}`  
 OK： `.about__title .title {}`  
 OK： `.about__title h2 {}`  

#### 画像関連
- 画像を保存するフォルダはディレクトリ毎に分ける  
 （例）TOP画像：/img/home  
 （例）ディレクトリＡのみで使用する画像：/img/ディレクトリ名Ａ  
   
  
#### 統合サイトについて
- ページ自体は1ページだが、ディレクトリ階層のパスの命名が2種類（/j-hm、/aie）存在。  
- ファイル名は「/aie」に統一すること。


#### アップロード等の流れ
- ❶それぞれがローカル環境で作業を進め、各々のリモートブランチにプッシュ（各自のタイミングで随時）
- ❷東江さんがブランチからmainにマージ（3日に1回）※東江さん以外はやらない　
- ❸マージしたら、東江さんがFTPアップード（3日に1回）※東江さん以外はやらない　

#### ヘッダーやフッター等の共通部分について
- ■ヘッダー及びフッダー  
 共通パーツとして呼び出し（各自で作成する必要なし） 
 
 - ■ヘアメイク/エステの帯タイトル  
 東江さんに作成したソースコードを自分のソースコードにコピーして転用  
 （テキストは、それぞれのページの文章へ変更する）
 
 - ■共通メインビジュアル＋パンくず  
  東江さんに作成したソースコードを自分のソースコードにコピーして転用  
 （テキストは、それぞれのページの文章へ変更する）

---

## gitを使った開発の流れ
※gitの概念と基本的な用語は理解していることを前提として説明しています。
1. gitのインストール・初期設定  
    https://backlog.com/ja/git-tutorial/intro/05/  
    https://backlog.com/ja/git-tutorial/intro/06/  
1. 自分のPCにソースコード一式をダウンロードする(clone)  
    `git clone %gitのパス%`  
1. 自分が作業するブランチ(branch)を作成する  
    `git branch %ブランチ名%`  
1. 作成したブランチに移動(checkout)する  
    `git checkout %ブランチ名%`  
1. 開発を進める  
1. ある程度開発が進んだら、作業内容(working tree)をcommitして、リモートリポジトリ(origin)にpushする。  
    `git add %変更したファイル名%`　（全ファイルまとめてaddしたいときは、`git add .`）  
    `git commit -m "コミットメッセージ"`  
    `git push (-u) origin %ブランチ名%` (１回目のpushのときは"-u"オプションをつける)  
1. 開発を続ける  

#### リモートリポジトリのmain(master)ブランチに変更があった場合
1. 自分のブランチで作業しているものがあれば、とりあえずcommitしておく。（pushは不要）  
1. リモートリポジトリの内容を取得(fetch)  
    `git fetch origin`
1. 自分のブランチにリモートリポジトリのmainブランチの変更を取り込む  
    `git merge --no-ff origin/main`
1. そのまま作業を続ける（ブランチを切り替えたり、新たに作成する必要はありません）  
