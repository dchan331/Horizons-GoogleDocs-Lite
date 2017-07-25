import axios from 'axios';
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Routes from '../routes';
import { Editor, EditorState, Modifier, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import  {
  styleMap,
  getBlockStyle,
  BLOCK_TYPES,
  BlockStyleControls,
  INLINE_STYLES,
  InlineStyleControls
} from './DocComponentStyles';
// const socket = require('socket.io-client')('http://localhost:3000');

<<<<<<< HEAD
function formatDate(olddate) {
  const date = new Date(olddate)
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  let minute = '00'
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minuteTemp = date.getMinutes()
  if(String(minuteTemp).length === 1){
    minute = '0'+String(minuteTemp)
  }else{
    minute = minuteTemp
  }

  return day + ' ' + monthNames[monthIndex] + ' ' + year + ' : ' + hour +':'+minute;
}

class RichEditorExample extends React.Component {
=======

class DocComponent extends React.Component {
>>>>>>> e8d703301e6bc27a940bf8134d13921fa952dd3e
  constructor (props) {
    super(props);
    this.state = {
      socket: this.props.socket,
      editorState: EditorState.createEmpty(),
      currentDocument: '',
      docName: '',
      history: [],
      showHist: false,
    };
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.handleTextUpdate = this.handleTextUpdate.bind(this);
    this.handleShowHist = this.handleShowHist.bind(this);
    this.handleHideHist = this.handleHideHist.bind(this);
    this.renderPast = this.renderPast.bind(this);
  }

  _handleKeyCommand (command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
  }

  _onTab (e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType (blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle (inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  _toggleColor (toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(styleMap)
      .reduce((contentState, color) => {
        if (!color.startsWith('FONT'))
        { return Modifier.removeInlineStyle(contentState, selection, color); }
        else
        { return contentState; }
      }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }

    this.onChange(nextEditorState);
  }

  componentDidMount() {
<<<<<<< HEAD
=======
    ////
    console.log('socket', socket)
    socket.on('hi', () => {
      console.log('RECEIVED HI2');

    });
    this.state.socket.emit('typing', ' I fucking work')

    this.state.socket.on('typing', (msg) => {
      console.log('msg', msg)
    })
    ////
>>>>>>> e8d703301e6bc27a940bf8134d13921fa952dd3e
    this.setState({currentDocument: this.props.id.match.params.doc_id});
    axios.get('http://localhost:3000/document')
    .then(response => {
      response.data.forEach((doc) => {
        if(doc._id === this.state.currentDocument){
          this.setState({docName: doc.name});
          const parsedBody = doc.body ? JSON.parse(doc.body) : JSON.parse('{}');
          const finalBody = convertFromRaw(parsedBody);
          this.setState({editorState: EditorState.createWithContent(finalBody)})
          this.setState({history: doc.history});
        }
      });
    });
  }

  handleTextUpdate(){
    axios.get('http://localhost:3000/document')
    .then(response => {
      return response.data;
    })
    .then(response2 => {
      response2.forEach((doc) => {
        if(this.state.currentDocument === this.props.id.match.params.doc_id){
          const newBody = convertToRaw(this.state.editorState.getCurrentContent());
          axios.post('http://localhost:3000/document/update',{
            id: this.props.id.match.params.doc_id,
            body: JSON.stringify(newBody),
            history: this.state.history,
          })
          .catch((err) => {
            console.log('error', err);
          });
        }
      });
    });
  }

  handleShowHist(){
    // console.log('hist', this.state.history[0].date)
    this.setState({showHist: true})
  }

  handleHideHist(){
    // console.log('hist', this.state.history)
    this.setState({showHist: false})
  }

  renderPast(past){
    // console.log('past', past);
    const parsedBody = JSON.parse(past)
    const finalBody = convertFromRaw(parsedBody);
    this.setState({editorState: EditorState.createWithContent(finalBody)})
  }



  render() {
    const {editorState} = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className="RichEditor-root">
        <Link to={'/dashboard'}><button>Back to Portal</button></Link>
        <h4>Name: {this.state.docName}</h4>
        <h5>ID: {this.state.currentDocument}</h5>
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
          editorState={editorState}
          toggleColor={this._toggleColor.bind(this)}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder="Tell a story..."
            ref="editor"
            spellCheck={true}
          />
        </div>
        {!this.state.showHist ?
          <button onClick={this.handleShowHist}>View History</button> :
          <div>
            {this.state.history.map((past) => (<div><button onClick={() => this.renderPast(past.content)}>{formatDate(past.date)}</button></div>))}
            <button onClick={this.handleHideHist}>Hide History</button>
          </div>
      }

        <button onClick={this.handleTextUpdate}>Save</button>
      </div>
    );
  }
}

export default DocComponent;



// RaisedButton:
// onMouseDown={(e) => {this.toggleInlineStyle(e, style)}};
// ...
// e.preventDefault()


// in react component for button:
// backgroundColor={this.state.editorState.getCurrentINlineStyle().has(style) ? colorToggled : colorUntoggled}
