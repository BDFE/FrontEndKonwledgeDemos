class AMAP extends HTMLElement {
  constructor() {
    super();
    this.attributeNames = ['key', 'viewMode', 'pitch', 'version', 'mapStyle', 'option', 'zoom', 'center'];
    const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true });
    shadowRoot.innerHTML = `<div id=map-container> <slot>默认插槽</slot> 
    </div>
    <style id=inlinestyles></style>
       `;
  }
  attributeChangedCallback(name, oldVal, newVal) {
    // 属性添加、移除、更新或替换。解析器创建元素时，或者升级时，也会调用它来获取初始值。
  }
  adoptedCallback() {
    // 自定义元素被移入新的 document（例如，有人调用了 document.adoptNode(el)）
  }
  connectedCallback() {
    // 元素每次插入到 DOM 时都会调用。用于运行安装代码，例如获取资源或渲染。一般来说，您应将工作延迟至合适时机执行
    this.initDomStyle()
    this.initAttributes();
    this.initMap();
  }
  disconnectedCallback() {
    // 元素每次从 DOM 中移除时都会调用。用于运行清理代码（例如移除事件侦听器等）
  }
  initDomStyle() {
    const myStyles = `
      #map-container {
        width:100%;
        height:100%;
      }
    `;
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(myStyles);
    const styleTag = this.shadowRoot.getElementById('inlinestyles');
    if (myStyles && styleTag) {
      styleTag.innerHTML = myStyles;
    }
  }

  initAttributes() {
    // const attrs = this.getAttributeNames()
    for (let name of this.attributeNames) {
      const v = this.getAttribute(name);
      if (v) {
        const o = JSON.parse(v);
        this[name] = o;
      }
    }
  }

  static get observedAttributes() {
    return this.attributeNames;
  }
  async initMap() {
    await this.loadJs();
    this.mapContainer = this.shadowRoot.getElementById('map-container');
    console.log('option',)
    const opt = {
      zoom: 16,
      viewMode: '2D',
      pitch: 0,
      center: [106.346291, 37.100257],
      showLabel: false,
      mapStyle: 'amap://styles/grey',
    }
    this.attributeNames.map(k => {
      if (this[k]) {
        opt[k] = this[k];
      }
    })
    this.map = new AMap.Map(this.mapContainer, opt);
    this.setChildrenMap(this.map)
  }
  setChildrenMap(map) {
    // const slot = this.shadowRoot.querySelector('slot');
    const layers = this.querySelectorAll('amap-points')
    Array.from(layers).map(l => {
      l.setMap(map)
    })
  }
  async loadJs() {

    return new Promise((resolve, reject) => {
      try {
        window.onMapJsLoad = function () {
          resolve();
        }
        var url = `https://webapi.amap.com/maps?v=${this.version}&key=${this.key}&callback=onMapJsLoad`;
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        this.shadowRoot.appendChild(jsapi);
      } catch (error) {
        reject();
      }
    })
  }
  attributeChangedCallback(name, oldVal, newVal) {
    // removes last semicolon

  }
}
customElements.define('a-map', AMAP);
