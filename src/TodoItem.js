import React, { Component } from 'react';
import './TodoItem.css'

export default class TodoItem extends Component {
  render(){
    return (

      // 标记完成或者是未完成
      <div className="TodoItem">
        <input type="checkbox" checked={this.props.todo.status === 'completed'}
          onChange={this.toggle.bind(this)}/>
        <span className="title">{this.props.todo.title}</span>
        <button onClick={this.delete.bind(this)}>删除</button> // "删除"

      </div>
    )
  }
  // 标记完成或者是未完成
  toggle(e){
    this.props.onToggle(e, this.props.todo)
  }

  // "删除"
  delete(e){
    this.props.onDelete(e, this.props.todo)
  }
}
