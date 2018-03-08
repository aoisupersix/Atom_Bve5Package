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

    //新しいエディタがインスタンス化された際のイベント処理
    this.subscriptions.add(atom.workspace.observeTextEditors(editor => {

      //もし初期化されていないViewがあれば初期化
      if(SearchStaView == null){
        SearchStaView = require('./bve-searchStaView.js');
      }
      if(this.staSearchListView == null){
        this.staSearchListView = new SearchStaView();
      }

      //文法判定
      const buffer = editor.getBuffer();
      this.setGrammar(buffer);

      //変更された際も文法を判定
      buffer.onDidChange(({changes}) => {
        this.setGrammar(buffer);
      });
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
    const editor = atom.workspace.getActiveTextEditor();
    this.setGrammar(editor.getBuffer());
  },

  //文法判定
  setGrammar(buffer) {
    const header = buffer.lineForRow(0);
    if(header.match(/BveTs\s*Map\s*2.02/gi)){
      atom.grammars.assignLanguageMode(buffer, 'source.bve-map-2.02');
    }else if(header.match(/BveTs\s*Structure\s*List/gi)){
      atom.grammars.assignLanguageMode(buffer, 'source.bve-structure');
    }else if(header.match(/BveTs\s*Sound\s*List/gi)){
      atom.grammars.assignLanguageMode(buffer, 'source.bve-sound');
    }else if(header.match(/BveTs\s*Station\s*List/gi)){
      atom.grammars.assignLanguageMode(buffer, 'source.bve-station');
    }else if(header.match(/BveTs\s*Train/gi)){
      atom.grammars.assignLanguageMode(buffer, 'source.bve-train');
    }
  }

};
