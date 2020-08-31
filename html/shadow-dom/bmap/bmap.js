class BMAP extends HTMLElement {
  constructor() {
    super();
    this.mapProperties = ['id', 'key', 'version', 'zoom', 'center'];
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `<div id=map-container> 
    </div>
    // <style id=inlinestyles>
    // </style>
    <slot ></slot> 
       `;
    this.initDomStyle()
    this.initProperties();
    this.initMap();
  }

  adoptedCallback() {
    // 自定义元素被移入新的 document（例如，有人调用了 document.adoptNode(el)）
  }
  connectedCallback() {
    // 元素每次插入到 DOM 时都会调用。用于运行安装代码，例如获取资源或渲染。一般来说，您应将工作延迟至合适时机执行
    // this.addEventListener("mapclick", function (e) {
    //   
    // });
    this.setSlotAttributes()
  }
  disconnectedCallback() {
    // 元素每次从 DOM 中移除时都会调用。用于运行清理代码（例如移除事件侦听器等）
  }
  static get observedAttributes() {
    return ['option', 'pitch', 'zoom', 'center', 'border', 'background'];
  }
  attributeChangedCallback(name, oldVal, newVal) {
    // 属性添加、移除、更新或替换。解析器创建元素时，或者升级时，也会调用它来获取初始值。

  }

  initDomStyle() {
    const myStyles = `
      #map-container {
        width:100%;
        height:100%;
        box-sizing:border-box;
        background: var(--background, #000);
        border: var(--border, 10px solid #000);
      }
      // :host([background]) {
      // }
      // :host([border]) {
      //   border: var(--border, 10px solid #f00);
      // }
    `;
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(myStyles);
    const styleTag = this.shadowRoot.getElementById('inlinestyles');
    if (myStyles && styleTag) {
      styleTag.innerHTML = myStyles;
    }
  }
  setSlotAttributes() {
    let tabs = [];
    let children = this.shadowRoot.children;
    // 
    setTimeout(() => {
      const sel = this.querySelectorAll('bmap-points');

      //  children.map(el => {
      //   el.setAttribute('map', this.map)
      // })
    }, 1000)
    // for (let elem of children) {
    //   if (elem.getAttribute('part')) {
    //     tabs.push(elem);
    //   }
    // }
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
    const self = this;
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

    setTimeout(() => {
      self.setChildrenMap(map);
    }, 1000)
    var point = new BMap.Point(116.404, 39.915); // 创建点坐标
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom();
    this.shadowRoot.dispatchEvent(new CustomEvent('mapload', {
      bubbles: true,
      composed: true,
      detail: {
        map: map,
      }
    }));


    this.map.addEventListener("mousemove", (e) => {
      this.shadowRoot.dispatchEvent(new CustomEvent('mapmousemove', {
        bubbles: true,
        composed: true,
        detail: "composed"
      }));
    })
  }




  setChildrenMap(map) {
    // let node = this.shadowRoot.querySelector(`#bmap-${attrName}`);
    const slot = this.shadowRoot.querySelector('slot');
    const layers = this.querySelectorAll('bmap-points')
    console.log('root', slot, layers);
    Array.from(layers).map(l => {
      l.setMap(map)
    })

    // root.data.text = { name: 'son' }
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
customElements.define('baidu-map', BMAP);
