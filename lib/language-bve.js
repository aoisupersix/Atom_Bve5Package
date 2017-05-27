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

    atom.workspace.observeTextEditors(editor => {
      editor.onDidSave(event => {
        var header = editor.lineTextForBufferRow(0);
        if(header.match(/BveTs\s*Map\s*2.02/)){
          editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-map-2.02'));
        }else if(header.match(/BveTs\s*Structure\s*List/)){
          editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-structure'));
        }else if(header.match(/BveTs\s*Sound\s*List/)){
          editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-sound'));
        }else if(header.match(/BveTs\s*Station\s*List/)){
          editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-station'));
        }else if(header.match(/BveTs\s*Train/)){
          editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-train'));
        }
      });
    });

    atom.workspace.onDidOpen(editor => {
      editor = atom.workspace.getActiveTextEditor();
      var header = editor.lineTextForBufferRow(0);
      if(header.match(/BveTs\s*Map\s*2.02/)){
        editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-map-2.02'));
      }else if(header.match(/BveTs\s*Structure\s*List/)){
        editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-structure'));
      }else if(header.match(/BveTs\s*Sound\s*List/)){
        editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-sound'));
      }else if(header.match(/BveTs\s*Station\s*List/)){
        editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-station'));
      }else if(header.match(/BveTs\s*Train/)){
        editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-train'));
      }
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-bve:toggle': () => this.toggle()
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