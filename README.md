[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/License.md)

language-bve5
===
BveTrainsim5.7用構文パッケージ in Atom

![syntaxhighlighting](https://raw.githubusercontent.com/aoisupersix/Atom_Bve5Package/master/images/syntax.png)

## これは何？

AtomでBveTrainsim5.7構文のシンタックスハイライト、スニペット挿入、その他制作に役立つ機能をサポートするパッケージです。  
BveTrainsim5.7以前の構文にも一部対応しています。

## インストール

Atomの設定画面から```language-bve5```と検索してインストールするか、```apm install language-bve5```を実行してください。

---

## シンタックスハイライト対応ファイル一覧

以下のファイル形式に対応しています。（括弧内は各ファイルのヘッダ)

- マップ(BveTs Map 2.02)
- ストラクチャーリスト(BveTs Structure List 2.00)
- サウンドリスト(BveTs  Sound List 2.00)
- 停車場リスト(BveTs Station List 2.00)
- 他列車(BveTs Train 1.01)

各構文に関しては、[BveTrainsim公式サイト](http://bvets.net)で確認してください。

---

## 文法の有効化

文法を有効化することによってパッケージの機能が利用できるようになります。  
文法の判定は、読み込み/編集時に各ファイルのヘッダから自動で行われますが、コマンドからも実行できます。

![grammarJudgment](https://raw.githubusercontent.com/aoisupersix/Atom_Bve5Package/master/images/grammarJudgment.gif)

文法の判定を行うには、コマンドパレットの```Language Bve:GrammarJudgment```を選択するか、メニューバーの```Packages```→```Language Bve```→```Judge Grammar```を選択してコマンドを実行してください。

自動で文法が判定されない場合、右下の```Plain Text```をクリックして、手動で文法を指定してください。

---

## スニペット挿入の利用

スニペット挿入とは繰り返し入力する記述を自動で入力してくれる機能です。  
BveTrainsim5の構文を途中まで入力するとスニペットの候補が出てくるので、```TAB```を押すことで構文を自動で入力、引数の位置へとカーソルを移動してくれます。

![snippet](https://raw.githubusercontent.com/aoisupersix/Atom_Bve5Package/master/images/snippet.gif)

このパッケージではマップファイルのほぼ全ての構文のスニペット挿入をサポートしています。

---

## 駅位置へジャンプ

マップファイル上で```Language Bve:JumpStation```コマンドを実行することにより、マップファイル内の指定した駅位置にカーソルを移動させることが出来ます。

![jumpStation](https://raw.githubusercontent.com/aoisupersix/Atom_Bve5Package/master/images/jumpStation.gif)

---

### ライセンス

>The MIT Lisense (MIT)
>
>Copyright (c) 2016 aoisupersix

* **ライセンス全文:** [LICENSE.md](https://github.com/aoisupersix/Atom_Bve5Package/blob/master/LICENSE.md)

## サポート

バグの報告や要望はIssue、もしくはこちらへ。
<http://aoisupersix.tokyo/>
