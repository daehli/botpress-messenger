import React from 'react'
import ReactDOM from 'react-dom'
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  ButtonToolbar
} from 'react-bootstrap'

import _ from 'lodash'
import Promise from 'bluebird'

const Display = (props) =>{
  return (
    <div>
      <FormControl ref={r => this.newPersistentMenuTitle = r} type="text" placeholder="Title"/>
      <FormControl ref={r => this.newPersistentMenuValue = r} type="text" placeholder="Value"/>
      <Button className='bp-button' onClick={() => this.handleAddToPersistentMenuList()}>
        Add to menu
      </Button>
    </div>
  )
}

const ShowDisplay = (props)=>{
  return (props.menu === 1 ? <Display></Display> : <DisplayNestedMenu></DisplayNestedMenu>)
}
const DisplayNestedMenu = (props) =>{
  return(
    <div>

    </div>
  )
}

export default class PersistentMenuModal extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      showDisplay:false,
      menu : null // Select a Menu

    }

    this.ChangeMenu = this.ChangeMenu.bind(this)
  }

  ChangeMenu(e) {
    e.preventDefault()
    const target = e.target
    const name = target.type === 'checkbox' ? target.checked : target.value
    this.setState({showDisplay:true})
    this.setState({menu:name})
    console.log('Menu',name)
  }
  handleClose() {
    this.setState({show:false})
  }
  handleOpen() {
    this.setState({show:false})
  }


  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg">Persistent Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <ControlLabel>Add a new item:</ControlLabel>
          <br></br>
          <ButtonToolbar>
            <Button bsStyle="primary" value="1" onClick={this.ChangeMenu}>
              Postback
            </Button>
            <Button bsStyle="primary" value="1" onClick={this.ChangeMenu}>
              URL
            </Button>
            <Button bsStyle="primary" value="2" onClick={this.ChangeMenu}>
              Nested Menu
            </Button>
          </ButtonToolbar>
          {this.state.showDisplay ? <ShowDisplay menu={this.state.menu}></ShowDisplay> : null}
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
  }
}
