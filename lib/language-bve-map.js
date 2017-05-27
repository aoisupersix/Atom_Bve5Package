'use babel';

import LanguageBveMapView from './language-bve-map-view';
import { CompositeDisposable } from 'atom';

export default {

  languageBveMapView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageBveMapView = new LanguageBveMapView(state.languageBveMapViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageBveMapView.getElement(),
      visible: false
    });

    atom.workspace.observeTextEditors(editor => {
      editor.onDidSave(event => {
        if(editor.lineTextForBufferRow(0).match(/BveTs\s*Map\s*2.02/)){
          editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-map-2.02'));
        }else if(editor.lineTextForBufferRow(0).match(/BveTs\s*Structure\s*List\s2.00/)){
          editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-structure-2.00'));
        }
      });
    });

    atom.workspace.onDidOpen(editor => {
      editor = atom.workspace.getActiveTextEditor();
      if(editor.lineTextForBufferRow(0).match(/BveTs\s*Map\s*2.02/)){
        editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-map-2.02'));
      }else if(editor.lineTextForBufferRow(0).match(/BveTs\s*Structure\s*List\s2.00/)){
        editor.setGrammar(atom.grammars.grammarForScopeName('source.bve-structure-2.00'));
      }
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-bve-map:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageBveMapView.destroy();
  },

  serialize() {
    return {
      languageBveMapViewState: this.languageBveMapView.serialize()
    };
  },

  toggle() {
    console.log('LanguageBveMap was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
