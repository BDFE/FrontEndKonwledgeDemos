class Overlay extends HTMLElement {
  constructor() {
    super();
  }
  attributeChangedCallback(name, oldVal, newVal) {

    // 属性添加、移除、更新或替换。解析器创建元素时，或者升级时，也会调用它来获取初始值。
    // Note: 仅 observedAttributes 属性中列出的特性才会收到此回调。
  }
  adoptedCallback() {
    // 自定义元素被移入新的 document（例如，有人调用了 document.adoptNode(el)）
  }
  connectedCallback() {

    this.initAttributes();
    // 元素每次插入到 DOM 时都会调用。用于运行安装代码，例如获取资源或渲染。一般来说，您应将工作延迟至合适时机执行
  }
  disconnectedCallback() {
    // 元素每次从 DOM 中移除时都会调用。用于运行清理代码（例如移除事件侦听器等）
  }
  initAttributes() {
    const attrs = this.getAttributeNames()
    for (let name of attrs) {
      const v = this.getAttribute(name);
      if (v) {
        const o = JSON.parse(v);
        this[name] = o;
      }
    }
  }
  static get observedAttributes() {
    return ['option', 'path', 'data', 'fitview', 'map'];
  }
  setMap(map) {

    this.map = map;
    this.draw();
  }
}

class Point extends Overlay {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true });
    shadowRoot.innerHTML = `
          <style>
            :host([area]) {
              grid-area: var(--area);
            }
          </style>
          `;
  }

  draw() {
    const list = this.data
    console.log('draw', list)
    if (list && Array.isArray(list)) {
      list.map(ll => {
        var opts = {
          position: new BMap.Point(ll[0], ll[1]),    // 指定文本标注所在的地理位置
          size: new BMap.Size(130, 30)
        }
        var label = new BMap.Label("我是web component <bmap-points/>", opts);  // 创建文本标注对象
        label.setStyle({
          color: "red",
          height: "20px",
          width: "120px",
        });
        this.map.addOverlay(label);
      })
    }
  }

}

customElements.define('bmap-points', Point);
