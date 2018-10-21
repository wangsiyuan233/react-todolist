# todoList - React

### 预览
[【代码链接】](https://github.com/wangsiyuan233/react-todolist)
[【预览链接】](http://wangsiyuan233.cn/react-todolist/build/index.html)

----------

### 一、为什么做这个项目？

> 1. 便于学习 React 
> 2. github上类似的项目不完整的。

### 二、那么为什么做一款TodoList？

> 1. 页面简单，逻辑清晰，容易上手;
> 2. 可以参考的代码很多，新手友好型嘻嘻。

### 三、技术栈

> React + leancloud + qiniu

### 四、开发环境
> Win10

### 五、目标功能

- [√] 注册新用户
- [√] 用户登录
- [√] 创建新的待办事项
- [√] 删除待办事项
- [√] 登出功能
- [√] 邮箱被占用提示

### 六、知识点梳理

#### 【【1、注册/登录页面】】

- 第一步：删除 localStore 功能，把数据存到数据库 leancloud

- 第二步：添加登录/注册对话框-UserDialog

- 第三步：添加 UserDialog.css

- 第四步：切换登录和注册

- 第五步：添加 label，方便用户点击

- 第六步：在注册和登录表单间切换

- 第七步：将两个 form 的 input 与 state.formData 绑定

- 第八步：将 changeUserName 和 changePassword 优化成一个函数 changeFormData

- 第九步：点击注册后使用 LeanCloud API 注册

- 第十步：注册成功后，记住 user，显示 username

- 第十一步：消除「不要直接修改 state」的警告

- 第十二步：消除「需要 onChange」的警告

- 第十三步：如果注册成功就关闭 UserDialog

- 第十四步：用户进入页面时，读取上次登录的 user

- 第十五步：添加登出功能

- 第十六步：仿照注册，完成登录功能

- 第十七步：合并 onSignUp 和 onSignIn

- 第十八步：展示友好的错误信息


#### 【【2、找回密码】】

- 第一步：给 dialog 添加遮罩效果

- 第二步：添加「忘记密码了？」按钮

- 第三步：注册时需要提供邮箱，以便找回密码

- 第四步：添加重置密码表单

- 第五步：更新重置密码表单样式

- 第六步：用户点击发送时，请求 LeanCloud 的 API

- 第七步：添加返回登录按钮

 
#### 【【3、重构】】

- 第一步：将 SignUpForm 抽离成一个组件

- 第二步：然后将 SignInForm 抽离成一个组件（重要）

- 第三步：然后将忘记密码表单也抽离成一个组件

- 第四步：将 signInOrSignUp 抽离成一个组件，注意 state 和 props 的区别

#### 【【4、数据存储】】

- 第一步： 如果用户在输入框里什么都不写就敲回车，那么就拒绝用户

- 第二步：Copy and Run

- 第三步：删除测试代码

- 第四步：在 addTodo 的时候调用 TodoModel.create，调用成功后把 id 记下来，方便后面更新这个 todo，你可以在页面上测试一下，看看效果

请务必测试一下哦~

- 第五步：在 constructor 中发起请求获取所有 Todo

这样做存在两个问题：

1. 如果用户在获取 Todo 的过程中新建了一个 Todo 怎么办？

2. 实际上我们获取的 Todo 是「所有用户」创建的 Todo，而不是当前用户创建的 Todo。不行的话，你开一个隐私窗口，用另一个用户名来创建 Todo，看是不是会出 bug。

- 第六步：使用 Access Control Layer 访问控制层，让新建的 todo 只能被当前用户访问，这样就避免了之前的 bug

- 第七步：删除 todo

- 第八步：更新 todo

- 第九步：把 LeanCloud 表中的 status 全删掉，因为这些数据全都有问题

- 第十步：将 status 的默认值改为 ''

- 第十一步：我们不应该删除数据，而是将数据标记为 deleted ，万一哪天用户要看已经删除的 todo，你还可以在数据库里找到。

#### 【【5、修改 CSS】】

样式有点简陋，惭愧