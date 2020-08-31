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
    return ['option', 'data', 'fitview', 'map'];
  }
  setMap(map) {
    this.map = map;
    this.draw();
  }
}

class Point extends Overlay {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true });
    shadowRoot.innerHTML = ``;
  }
  draw() {
    const list = this.data
    console.log('draw', list)
    if (list && Array.isArray(list)) {
      list.forEach((ll, i) => {
        var circleMarker = new AMap.CircleMarker({
          center: ll,
          radius: 10 + Math.random() * 10,//3D视图下，CircleMarker半径不要超过64px
          strokeColor: 'white',
          strokeWeight: 2,
          strokeOpacity: 0.5,
          fillColor: 'rgba(0,0,255,1)',
          fillOpacity: 0.5,
          zIndex: 10,
          bubble: true,
          cursor: 'pointer',
          clickable: true
        })
        circleMarker.setMap(this.map)
        this.map.setCenter(ll, 15)
      })

    }
  }

}

customElements.define('amap-points', Point);
