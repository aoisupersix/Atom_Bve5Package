'use babel'

import BveSearchListView from './bve-searchListView.coffee';

export default class SearchCommentView extends BveSearchListView{
  constructor(serializedState) {
    super();
    super.setCallback(this.jump);
  }

  show(editor){
    var commentList = this.updateCommentList(editor);
    super.clearItems();
    for(var i=0; i<commentList.length; i++){
      super.addItem(commentList[i]);
    }
    super.show();
  }

  //駅名を配列にして取得
  updateCommentList(editor){
    var text = editor.getText();
    var reg = /(?:\/\/|#)(.+)/gi;
    var commentList = [];
    //駅名部分をキャプチャする
    while((m = reg.exec(text)) != null){
      commentList.push(m[1]);
    }
    console.log(commentList);
    return commentList;
  }

  //駅名の行にジャンプ(コールバック)
  jump(name){
    console.log("jump to " + name);
    var editor = atom.workspace.getActiveTextEditor();
    var reg = new RegExp('#' + name + '\\s*$','g');
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
