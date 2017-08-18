'use babel'

import BveSearchListView from './bve-searchListView.coffee';

export default class SearchStaView extends BveSearchListView{
  constructor() {
    super();
    super.setCallback(this.jump);
  }

  show(editor){
    var staList = this.updateStaList(editor);
    super.clearItems();
    for(var i=0; i<staList.length; i++){
      super.addItem(staList[i]);
    }
    super.show();
  }

  //駅名を配列にして取得
  updateStaList(editor){
    var text = editor.getText();
    var reg = /\s*Station\s*\[\'(.+)\'\]\.\s*Put\s*\(/gi;
    var staList = [];
    //駅名部分をキャプチャする
    while((m = reg.exec(text)) != null){
      staList.push(m[1]);
    }
    console.log(staList);
    return staList;
  }

  //駅名の行にジャンプ(コールバック)
  jump(name){
    console.log("jump to " + name);
    var editor = atom.workspace.getActiveTextEditor();
    var reg = new RegExp('\\s*Station\\s*\\\[\\\'' + name + '\\\'\\\]\\\.\\s*Put\\\(','g');
    editor.scan(reg, undefined, function(obj) {
      editor.setCursorBufferPosition(obj.range.start);
      return console.log(obj.range);
    });
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
