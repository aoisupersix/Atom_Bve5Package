{SelectListView, $, $$} = require 'atom-space-pen-views'
{match} = require 'fuzzaldrin'

module.exports =
class BveSearchListView extends SelectListView
  panel: null
  callback: null
  isVisible: null

  initialize: (@listOfItems) ->
    super
    @setItems(@listOfItems)
    @isVisible = false

  show: ->
    @panel ?= atom.workspace.addModalPanel(item: this)
    @panel.show()
    @isVisible = true

    @storeFocusedElement()

    if @previouslyFocusedElement[0] and @previouslyFocusedElement[0] isnt document.body
      @eventElement = @previouslyFocusedElement[0]
    else
      @eventElement = atom.views.getView(atom.workspace)

    @setItems(@items)

    @focusFilterEditor()  # これで入力フォームにフォーカスする。

  hide: ->
    @panel?.hide()
    @isVisible = false

  addItem: (item) ->
    @items ?= []
    @items.push
      name: item    # ここの'name'が、getFilterKey()で返すキーになる

    @setItems @items

  clearItems: (item) ->
    @items ?= []
    @items = []
    @setItems @items

  getFilterKey: ->  # これがないとviewForItem()が動かない
    'name'

  clearText: ->
    @filterEditorView.setText('')

  setCallback: (callback) ->
    @callback = callback

  focus: ->
    @focusFilterEditor()

  getElement: ->
    @element

  cancel: ->
    # キャンセル時(ESCキー)の処理
    @hide()

  confirmed: ({name}) ->
    # 決定時(Enterキーなど)の処理
    @clearText()
    @callback?(name)
    @hide()

  viewForItem: ({name}) ->
    filterQuery = @getFilterQuery()  # 入力欄に入っているテキスト
    matches = match(name, filterQuery)

    $$ ->
      highlighter = (command, matches, offsetIndex) =>
        lastIndex = 0
        matchedChars = [] # Build up a set of matched chars to be more semantic

        for matchIndex in matches
          matchIndex -= offsetIndex
          continue if matchIndex < 0 # If marking up the basename, omit command matches
          unmatched = command.substring(lastIndex, matchIndex)
          if unmatched
            @span matchedChars.join(''), class: 'character-match' if matchedChars.length
            matchedChars = []
            @text unmatched
          matchedChars.push(command[matchIndex])
          lastIndex = matchIndex + 1

        @span matchedChars.join(''), class: 'character-match' if matchedChars.length

        # Remaining characters are plain text
        @text command.substring(lastIndex)

      @li class: 'event', 'data-event-name': name, =>
        @span title: name, -> highlighter(name, matches, 0)
