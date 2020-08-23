class BMAP extends HTMLElement {
  constructor() {
    super();
    this.mapProperties = ['id', 'key', 'version', 'zoom', 'center'];
    const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true });
    shadowRoot.innerHTML = `<div id=map-container> <slot>默认插槽</slot> 
    </div>
    <style id=inlinestyles></style>
       `;
    this.initDomStyle()
    this.initProperties();
    this.initMap();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    // 属性添加、移除、更新或替换。解析器创建元素时，或者升级时，也会调用它来获取初始值。
  }
  adoptedCallback() {
    // 自定义元素被移入新的 document（例如，有人调用了 document.adoptNode(el)）
  }
  connectedCallback() {
    // 元素每次插入到 DOM 时都会调用。用于运行安装代码，例如获取资源或渲染。一般来说，您应将工作延迟至合适时机执行
    // this.addEventListener("mapclick", function (e) {
    //   
    // });
  }
  disconnectedCallback() {
    // 元素每次从 DOM 中移除时都会调用。用于运行清理代码（例如移除事件侦听器等）
  }
  initDomStyle() {
    const myStyles = `
      #map-container {
        width:100%;
        height:100%;
        background:#ff0;
      }
      // body{
      //   margin:0px;
      // }
    `;
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(myStyles);
    const styleTag = this.shadowRoot.getElementById('inlinestyles');
    if (myStyles && styleTag) {
      styleTag.innerHTML = myStyles;
    }
  }

  initProperties() {
    this.version = '2.0'
    this.key = '899df86dd010c849dd479892c63c7baa'
    this.option = {
      zoom: "4.7",
      viewMode: "'3D'",
      pitch: "0",
      center: "[116.39405699999998, 39.925664]",
      center: "[106.346291, 37.100257]",
      showLabel: "false",
      mapStyle: "'amap://styles/grey'",
    }

    Object.keys(this.option).map(k => {
      let v = this.attributes[k];
      if (v) {
        // this.option[k] = v;
      }

    })
  }
  static get observedAttributes() {
    return this.mapProperties;
  }

  async initMap() {
    await this.loadJs();

    this.mapContainer = this.shadowRoot.getElementById('map-container');
    this.mapContainer.addEventListener('click', () => {
      
      this.dispatchEvent(new CustomEvent('click', {
        bubbles: true,
        composed: true,
        detail: "click"
      }));
      this.dispatchEvent(new CustomEvent('mapclick', {
        bubbles: true,
        composed: true,
        detail: "mapclick"
      }));
    })
 

    let map = this.map = new BMap.Map(this.mapContainer);
    var point = new BMap.Point(116.404, 39.915); // 创建点坐标
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom();
    this.shadowRoot.dispatchEvent(new CustomEvent('loaded', {
      bubbles: true,
      composed: true,
      detail: "composed"
    }));
    this.map.addEventListener("mousemove", (e) => {
      
      this.shadowRoot.dispatchEvent(new CustomEvent('mapmousemove', {
        bubbles: true,
        composed: true,
        detail: "composed"
      }));
    })
  }
  async loadJs() {

    return new Promise((resolve, reject) => {
      try {
        window.onBMapJsLoad = function () {

          resolve();
        }
        // var url = `https://webapi.amap.com/maps?v=${this.version}&key=${this.key}&callback=onBMapJsLoad`;
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//api.map.baidu.com/api?v=2.0&ak=wydmYg51LXqtUDpwkBkQj13C0KepuWrx&callback=onBMapJsLoad";
        // script.src = `http://api.map.baidu.com/api?v=${this.version}&ak=wydmYg51LXqtUDpwkBkQj13C0KepuWrx&callback=onMapJsLoad`
        this.shadowRoot.appendChild(script);
      } catch (error) {
        reject();
      }
    })
  }
  attributeChangedCallback(name, oldVal, newVal) {
    // removes last semicolon

  }
}
customElements.define('b-map', BMAP);
