import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
// import Document from '.../models/documents.js'
// import mongoose from 'mongoose';
// mongoose.connect(require('../config/database').url);
// mongoose.Promise = global.Promise;

class DocPortalComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      currentDocs: [{name: 'doc1', id: 1}, {name: 'doc2', id: 2}, {name: 'doc3', id: 3}],
      newDoc: '',
      sharedDoc: '',
      search: '',
      searchList:[]
    }
    this.handleNewDoc = this.handleNewDoc.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSharedDoc = this.handleSharedDoc.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentDidMount(){
    // Document.find({}).exec()
    //   .then((response) => {
    //     console.log('response from didMount', response)
    //     this.setState({currentDocs: response})
    //   })
  }

  handleNewDoc(e){
    e.preventDefault();
    this.setState({newDoc: e.target.value})
  }

  handleSharedDoc(e){
    e.preventDefault();
    this.setState({sharedDoc: e.target.value})
  }

  handleCreate(e){
    e.preventDefault();
    const newState = this.state.currentDocs;
    const newDocsState = newState.concat({name: this.state.newDoc, id: this.state.currentDocs.length + 1})
    this.setState({currentDocs: newDocsState, newDoc: ''})
    // const newDocument = new Document({
    //   name: this.state.newDoc,
    //   body: '',
    //   owner: ''
    // })
    // newDocument.save((err) => {
    //   console.log('Error creating Document', err)
    // })
  }

  handleAdd(e){
    e.preventDefault();
    // const newState = this.state.currentDocs;
    // Document.find({id: this.state.sharedDoc}).exec()
    //   .then(response => {
    //     console.log('response HA', response)
    //     const newDocsState = newState.concat({name: this.state.sharedDoc, id: this.state.currentDocs.length + 1})
    //     this.setState({currentDocs: newDocsState, sharedDoc: ''})
    //   })
  }

  handleSearch(e){
    e.preventDefault()
    this.setState({search: e.target.value})
    const currDocs = this.state.currentDocs;
    const filteredDocs = currDocs.filter((item) => {
      if(item.name.startsWith(e.target.value)){
        return true
      }
      return false
    })
    this.setState({searchList: filteredDocs})
  }

  render() {
    return (
      <div>
        <h1 style ={{textAlign: 'center'}}> Dom Docs Portal </h1>
          <input
            type="text"
            value={this.state.search}
            placeholder="Search for Docs"
            onChange={this.handleSearch}/>
        <form onSubmit={this.handleCreate}>
          <input
            type="text"
            value={this.state.newDoc}
            placeholder="New Document Title"
            onChange={this.handleNewDoc}/>
            <input type="submit" value="Create component" onClick={this.handleCreate}/>
        </form>
        <div style={{height: '200px', width: '100%', border: '2px solid black'}}>
          <h3>My Documents</h3>
            {this.state.search === '' ? this.state.currentDocs.map((doc) => (<div><Link to={`/doc/${doc.id}`}>{' '+doc.name}</Link></div>))
          :this.state.searchList.map((doc) => (<div><Link to={`/doc/${doc.id}`}>{' '+doc.name}</Link></div>))}
        </div>
        <form onSubmit={this.handleAdd}>
          <input
            type="text"
            value={this.state.sharedDoc}
            placeholder="Paste a doc ID"
            onChange={this.handleSharedDoc}/>
            <input type="submit" value="Add Shared Document" onClick={this.handleAdd}/>
        </form>
      </div>
    );
  }
};

export default DocPortalComponent;
