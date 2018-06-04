
// 将 localStorage 的操作封装一下
// localStorage是本地储存
// 但是我们后面就用不到localStorage了
// 因为要引用 leanCloud的了 悲伤的故事
export function save(key, value){
  return window.localStorage.setItem(key, JSON.stringify(value))
}

export function load(key){
  return JSON.parse(window.localStorage.getItem(key))
}
