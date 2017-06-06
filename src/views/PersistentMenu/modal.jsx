import React from 'react'
import ReactDOM from 'react-dom'
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  Radio
} from 'react-bootstrap'

import _ from 'lodash'
import Promise from 'bluebird'

const Display = (props) =>{
  return (
    <div>
      <br></br>
      <FormControl onChange={props.onChange} name="title" value={props.title} type="text" placeholder="Title"/>
      <FormControl onChange={props.onChange} name="value" value={props.value} type="text" placeholder="Value"/>
      <Button className='bp-button' onClick={props.add}>
        Add to menu
      </Button>
    </div>
  )
}

const ShowDisplay = (props)=>{
  return (props.type !== 'postback' ? props.type !== 'url' ? <DisplayNestedMenu></DisplayNestedMenu> : <Display add={props.add} onChange={props.onChange} title={props.title} value={props.value}></Display> : <Display add={props.add} onChange={props.onChange} title={props.title} value={props.value}></Display> )
}

const DisplayNestedMenu = (props) =>{
  return (
    <div>
      <p>Nothing for the Moment</p>
    </div>
  )
}

export default class PersistentMenuModal extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      showDisplay: this.props.item === undefined ? false : true,
      title : this.props.item === undefined ? null : this.props.item.title,
      value : this.props.item === undefined ? null : this.props.item.payload === undefined ? this.props.item.value : this.props.item.payload,
      type : this.props.item === undefined ? null : this.props.item.type,
    }

    this.ChangeMenu = this.ChangeMenu.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleAddItems = this.handleAddItems.bind(this)
    this.handleUpdateItem = this.handleUpdateItem.bind(this)
  }

  handleInputChange(e) {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name] : value
    })
  }

  handleAddItems(e) {
    e.preventDefault()
    let obj = {}
    obj.value = this.state.value
    obj.title = this.state.title
    obj.type = this.state.type
    this.props.add(obj)
    this.props.onHide()
  }

  handleUpdateItem(e) {
    e.preventDefault()
    let obj = {}
    obj.value = this.state.value
    obj.title = this.state.title
    obj.type = this.state.type
    console.log('obj',obj)
    this.props.update(obj)
    this.props.onHide()
  }

  ChangeMenu(e) {
    e.preventDefault()
    const target = e.target
    const name = target.type === 'checkbox' ? target.checked : target.value
    const value = target.value
    this.setState({showDisplay:true})
    this.setState({type:value})
    console.log('Menu',name)
  }

  render() {

    let add = this.props.update !== undefined ? this.handleUpdateItem : this.handleAddItems

    return (
      <div>
        {this.props.update}
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Persistent Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <ControlLabel>{this.props.update !== undefined ? 'Update item' : 'Add a new item:'} </ControlLabel>
            <br></br>
            <FormGroup>
              <Radio inline value="postback" checked={this.state.type === 'postback'}  onChange={this.ChangeMenu} >Postback</Radio>
              <Radio inline value="url" checked={this.state.type ==='url'}  onChange={this.ChangeMenu}>URL</Radio>
              <Radio inline value="nestedValue" checked={this.state.type === 'nestedValue'}  onChange={this.ChangeMenu}>Nested Menu</Radio>
            </FormGroup>
            {this.state.showDisplay ? <ShowDisplay  add={add} title={this.state.title} value={this.state.value} onChange={this.handleInputChange} type={this.state.type}></ShowDisplay> : null}
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    )
  }
}

// <ButtonToolbar>
//   <Button bsStyle="primary" id="postback" value="postback" onClick={this.ChangeMenu}>
//     Postback
//   </Button>
//   <Button bsStyle="primary" id="url" value="url" onClick={this.ChangeMenu}>
//     URL
//   </Button>
//   <Button bsStyle="primary" id="nestedValue" value="nestedValue" onClick={this.ChangeMenu}>
//     Nested Menu
//   </Button>
// </ButtonToolbar>
