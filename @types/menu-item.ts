/**
 * 菜单项
 */
class MenuItem {
  id: number
  key: number | string
  parentId: number
  icon: string
  url: string
  html: string
  type: string
  name: string
  title: string
  visible: number
  children: MenuItem[] = []
  isLeaf: boolean = true
  __path: string = ""
  extra: object

  constructor(
    id: number,
    parentId: number,
    name: string,
    url: string,
    html: string,
    icon: string,
    type: string,
    visible: number,
    extra: object
  ) {
    this.id = id
    this.key = id + ''
    this.parentId = parentId
    this.icon = icon
    // this.parent = null
    this.name = name
    this.title = name
    this.type = type
    this.visible = visible
    this.url = url
    this.html = html
    this.extra = extra
  }

  addChild(child: MenuItem) {
    this.children.push(child)
    this.isLeaf = false
  }
}

export default MenuItem
