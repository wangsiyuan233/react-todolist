import React, { Component } from 'react';
import 'normalize.css'
import './reset.css'
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {getCurrentUser, signOut, TodoModel} from './leanCloud'

//方法在父组件定义，通过props传给需要的子组件进行调用传参，最后返回到父组件上执行函数，存储数据、改变state和重新render。
//方法需要bind(this)，不然方法内部的this指向会不正确。
// bind 不仅可以绑定 this，还可以绑定第一个参数

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      // 用户进入页面时，读取上次登录的 user
      user: getCurrentUser() || {},
      newTodo: '',
      todoList: []
    }
    let user = getCurrentUser()
    if (user) {
      TodoModel.getByUser(user, (todos) => {
        // 消除「不要直接修改 state」的警告
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        // 把此时此刻的状态添加到 todoList
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
    }
  }
  render() {
    //只展示没有被删除的todo
    let todos = this.state.todoList
      .filter((item)=> !item.deleted)
      .map((item,index)=>{
      return ( // 为什么这里要加个括号？这是动手题3 🐸
        <li key={index} > // key是啥 ???
          <TodoItem todo={item}
            onToggle={this.toggle.bind(this)}
            // "删除"
            onDelete={this.delete.bind(this)}/>
        </li>
      )
    })

    return (
      <div className="App">

      // 注册成功后，记住 user，显示 username
      // 添加登出功能
        <h1>
          {this.state.user.username||'我'}的待办
          {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button> : null}
        </h1>


        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo}
             // 提示说 尝试一下 onChange 吧
            onChange={this.changeTitle.bind(this)}
            //App 传一个函数给 TodoInput
            onSubmit={this.addTodo.bind(this)} />
        </div>

        // 为了更新样式
        <ol className="todoList">
          {todos}
        </ol>
        // 如果注册成功就关闭 UserDialog
        {this.state.user.id ?
          null :
          <UserDialog
            onSignUp={this.onSignUpOrSignIn.bind(this)}
            onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
      </div>
      //仿照注册，完成登录功能
    )
  }

  // 里面的 signOut() 是调用的 src/leanCloud.js 里的方法
  // 外层的是定义的父组件里的方法。
  signOut(){
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }

  // 合并 onSignUp 和 onSignIn
  onSignUpOrSignIn(user){
    // 消除「不要直接修改 state」的警告
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
  }

  //componentDidUpdate 会在组件更新之后调用。如果我们默认「组件更新」等价于「数据更新」，那么就可以把 localStore.save('todoList', this.state.todoList) 写在这个钩子里。
  componentDidUpdate(){}

  //标记完成或者是未完成
  toggle(e, todo){
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    TodoModel.update(todo, () => {
      this.setState(this.state)
    }, (error) => {
      todo.status = oldStatus
      this.setState(this.state)
    })
  }

  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }

  //App 传一个函数给 TodoInput
  addTodo(event){
    let newTodo = {
      title: event.target.value,
      status: '',
      deleted: false
    }
    TodoModel.create(newTodo, (id) => {
      newTodo.id = id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
    }, (error) => {
      console.log(error)
    })
  }

  // "删除"
  delete(event, todo){
    TodoModel.destroy(todo.id, () => {
      todo.deleted = true
      this.setState(this.state)
    })
  }
}

export default App;
