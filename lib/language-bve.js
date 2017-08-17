'use babel';

import BveSearchListView from './bve-searchListView.coffee';
import LanguageBveView from './language-bve-view';
import SearchStaView from './bve-searchStaView.js';
import { CompositeDisposable } from 'atom';

export default {

  escapeListener: null, //Eseキーの判定
  languageBveView: null,
  modalPanel: null,
  languageBveSearchView: null,  //駅名検索ビュー
  searchPanel: null,  //駅名検索パネル
  subscriptions: null,

  activate(state) {
    this.languageBveView = new LanguageBveView(state.languageBveViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageBveView.getElement(),
      visible: false
    });
    this.staSearchListView = new SearchStaView(state.languageBveViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // コマンド登録
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-bve:toggle': () => this.toggle(),
      'language-bve:GrammarJudgment': () => this.grammarJudgment(),
      'language-bve:JumpStation': () => this.openSearchStaPanel()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace',{
    }));

    this.subscriptions.add(atom.workspace.observeTextEditors(editor => {
      //新しいエディタがインスタンス化された際
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
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageBveView.destroy();
  },

  serialize() {
    return {
      languageBveViewState: this.languageBveView.serialize()
    };
  },

  //有効化無効化?
  toggle() {
    console.log('LanguageBve was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
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
