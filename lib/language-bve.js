'use babel';

import LanguageBveView from './language-bve-view';
import { CompositeDisposable } from 'atom';

export default {

  languageBveView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageBveView = new LanguageBveView(state.languageBveViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageBveView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-bve:toggle': () => this.toggle()
    }));

    this.subscriptions.add(atom.workspace.observeTextEditors(editor => {
      //新しいエディタがインスタンス化された際
      if(editor.getCursorBufferPosition().row == 0){
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
      editor.onDidChange(event => {
        //編集した際
        if(editor.getCursorBufferPosition().row == 0){
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
      })
      editor.onDidSave(event => {
        //保存した際(なぜか文法がPlainになってしまうので。)
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

  toggle() {
    console.log('LanguageBve was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
