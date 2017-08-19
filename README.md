# **language-bve5**
####   BveTrainsim5.7用構文パッケージ in Atom

![syntaxhighlighting](https://raw.githubusercontent.com/aoisupersix/Atom_Bve5Package/master/images/syntax.png)

## これは何？

AtomでBveTrainsim5.7構文のシンタックスハイライト、スニペット挿入、その他制作に役立つ機能をサポートするパッケージです。  
BveTrainsim5.7以前の構文にも一部対応しています。

## シンタックスハイライト対応ファイル一覧

以下のファイル形式に対応しています。（括弧内は各ファイルのヘッダ)

- マップ(BveTs Map 2.02)
- ストラクチャーリスト(BveTs Structure List 2.00)
- サウンドリスト(BveTs  Sound List 2.00)
- 停車場リスト(BveTs Station List 2.00)
- 他列車(BveTs Train 1.01)

各構文に関しては、[BveTrainsim公式サイト](http://bvets.net)で確認してください。

## 文法の有効化

文法を有効化することによってパッケージの機能が利用できるようになります。  
文法の判定は、読み込み/編集/保存時に各ファイルのヘッダから自動で行われますが、コマンドからも実行できます。

![grammarJudgement](https://raw.githubusercontent.com/aoisupersix/Atom_Bve5Package/master/images/grammarJudgment.gif)

文法の判定を行うには、コマンドパレットの```Language Bve:GrammarJudgement```を選択するか、メニューバーの```Packages```→```Language Bve```→```Judge Grammar```を選択してコマンドを実行してください。

自動で文法が判定されない場合、右下の```Plain Text```をクリックして、手動で文法を指定してください。

## スニペット挿入の利用

![snippet](https://raw.githubusercontent.com/aoisupersix/Atom_Bve5Package/master/images/snippet.gif)

スニペット挿入とは繰り返し入力する記述を自動で入力してくれる機能です。  
BveTrainsim5の構文を途中まで入力するとスニペットの候補が出てくるので、```TAB```を押すことで構文を自動で入力、引数の位置へとカーソルを移動してくれます。

スニペット挿入は、以下の一部構文のみ対応しています。
- ```Curve```
- ```.BeginTransition();```
- ```Track[‘track key’]```
- ```.Position(x,y);```
- ```Repeater[‘repeater key’]```
- ```.Begin(‘track key’,x,y,z,rx,ry,rz,tilt,span,interval,’structure key’);```
- ```.Begin0(‘track key’,tilt,span,interval,’structure key’);```
- ```Structure[‘structure key’]```
- ```.Load(‘filepath’);```

## 駅位置へジャンプ

マップファイル上で```Language Bve:JumpStation```コマンドを実行することにより、マップファイル内の指定した駅位置にカーソルを移動させることが出来ます。

![jumpStation](https://raw.githubusercontent.com/aoisupersix/Atom_Bve5Package/master/images/jumpStation.gif)

## サポート

バグの報告や要望はこちらへ。
<http://aoisupersix.tokyo/>
