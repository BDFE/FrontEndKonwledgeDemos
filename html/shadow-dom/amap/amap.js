class Overlay extends HTMLElement {
  constructor() {
    super();
  }
  attributeChangedCallback(name, oldVal, newVal) {
    // 属性添加、移除、更新或替换。解析器创建元素时，或者升级时，也会调用它来获取初始值。
    // Note: 仅 observedAttributes 属性中列出的特性才会收到此回调。

    // removes last semicolon
    // newVal = newVal.replace(/;([\s]+)?$/, '');
    // if (newVal.includes(';')) {
    //   this.setMediaQueries(name, newVal);
    // } else {
    //   this.style.setProperty(`--${name}`, newVal);
    // }
  }
  adoptedCallback() {
    // 自定义元素被移入新的 document（例如，有人调用了 document.adoptNode(el)）
  }
  connectedCallback() {
    // 元素每次插入到 DOM 时都会调用。用于运行安装代码，例如获取资源或渲染。一般来说，您应将工作延迟至合适时机执行
  }
  disconnectedCallback() {
    // 元素每次从 DOM 中移除时都会调用。用于运行清理代码（例如移除事件侦听器等）
  }
  static get observedAttributes() {
    return ['option', 'path', 'center'];
  }

}

class AMAP extends HTMLElement {
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
    console.log('attributeChangedCallback')
  }
  adoptedCallback() {
    console.log('adoptedCallback')
    // 自定义元素被移入新的 document（例如，有人调用了 document.adoptNode(el)）
  }
  connectedCallback() {
    // 元素每次插入到 DOM 时都会调用。用于运行安装代码，例如获取资源或渲染。一般来说，您应将工作延迟至合适时机执行
    console.log('connectedCallback')

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
    // this.version = '1.4.15'
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
      console.log('opt', k, v)
    })
  }
  static get observedAttributes() {
    return this.mapProperties;
  }
  async initMap() {
    await this.loadJs();
    console.log('loaded')
    this.mapContainer = this.shadowRoot.getElementById('map-container');
    this.mapContainer.addEventListener('click', () => {
      console.log('click')
    })
    document.body.addEventListener('click', () => {
      console.log('doc click')
    })
    this.map = new AMap.Map(this.mapContainer, {
      zoom: 10,
      viewMode: '2D',
      pitch: 0,
      center: [106.346291, 37.100257],
      // showLabel: false,
      // mapStyle: 'amap://styles/grey',
    });
  }
  async loadJs() {
    console.log('load')
    return new Promise((resolve, reject) => {
      try {
        window.onMapJsLoad = function () {
          console.log('jsapi donwloaded')
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

class Point extends Overlay {
  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>
        :host([area]) {
          grid-area: var(--area);
        }
        :host([row]) {
          grid-row: var(--row);
        }
        :host([column]) {
          grid-column: var(--column);
        }
        </style>
        <slot></slot>`;
  }

  // static get observedAttributes() {
  //   return ['area', 'row', 'column'];
  // }

  attributeChangedCallback(name, oldVal, newVal) {
    // removes last semicolon
    console.log('cb', name, oldVal, newVal)
  }
}
customElements.define('map-point', Point);
