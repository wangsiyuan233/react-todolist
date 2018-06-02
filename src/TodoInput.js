import React from 'react';
import './TodoInput.css'

function submit (props, e) {
  if (e.key === 'Enter') {
    if (e.target.value.trim() !== '') {
      props.onSubmit(e) //???
    }
  }
}
function changeTitle (props, e) {
  props.onChange(e)
}

// 搞不清楚 bind 用法的同学，请看完 MDN
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
// 尤其是示例要看懂

export default function (props) {
  return <input type="text" value={props.content}
    className="TodoInput"
    // 提示说 尝试一下 onChange 吧
    onChange={changeTitle.bind(null, props)}
    // 监听回车事件,绑定this
    onKeyPress={submit.bind(null, props)}/>
}
