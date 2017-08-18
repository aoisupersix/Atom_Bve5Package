'use babel';

import { CompositeDisposable } from 'atom';
SearchStaView = null;

export default {

  staSearchListView: null,  //駅名検索ビュー
  subscriptions: null,

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // コマンド登録
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-bve:GrammarJudgment': () => this.grammarJudgment(),
      'language-bve:JumpStation': () => this.openSearchStaPanel()
    }));

    this.subscriptions.add(atom.workspace.observeTextEditors(editor => {
      console.log("New Editor Instanced.");
      //新しいエディタがインスタンス化された際
      //もし初期化されていなかったら初期化
      if(SearchStaView == null){
        SearchStaView = require('./bve-searchStaView.js');
      }
      if(this.staSearchListView == null){
        this.staSearchListView = new SearchStaView();
      }
      if(editor.getCursorBufferPosition().row == 0){
        this.setGrammar(editor);
      }
      editor.onDidChange(event => {
        //編集した際
        if(editor.getCursorBufferPosition().row == 0){
          this.setGrammar(editor);
        }
      })
      editor.onDidSave(event => {
        //保存した際(なぜか文法がPlainになってしまうので。)
        this.setGrammar(editor);
      })
    }));
  },

  deactivate() {
    this.staSearchListView.destroy();
    this.staSearchListView = null;
    this.subscriptions.dispose();
  },

  //状態を保存しておく
  serialize() {
  },

  //駅名検索パネルを表示
  openSearchStaPanel(){
    if(this.staSearchListView.isVisible){
      this.staSearchListView.hide();
    }else{
      this.staSearchListView.show(atom.workspace.getActiveTextEditor());
    };
  },

  //文法判定コマンド
  grammarJudgment() {
    this.setGrammar(atom.workspace.getActiveTextEditor());
  },

  //文法判定
  setGrammar(editor) {
    var header = editor.lineTextForBufferRow(0);
    if(header.match(/BveTs\s*Map\s*2.02/gi)){
      editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-map-2.02'));
    }else if(header.match(/BveTs\s*Structure\s*List/gi)){
      editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-structure'));
    }else if(header.match(/BveTs\s*Sound\s*List/gi)){
      editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-sound'));
    }else if(header.match(/BveTs\s*Station\s*List/gi)){
      editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-station'));
    }else if(header.match(/BveTs\s*Train/gi)){
      editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-train'));
    }
  }

};
