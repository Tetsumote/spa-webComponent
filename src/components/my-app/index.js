import SearchContainer from '../search-container'
import ShowTrending from '../show-trending'
import ShowRandom from '../show-random'

export default class MyApp extends HTMLElement {
  constructor() {

    // We are not even going to touch this.
    super();
    this.showSection = 1;
    // lets create our shadow root
    this.shadowObj = this.attachShadow({mode: 'open'});
    this.registerOtherComponents();
    this.render();
  }
  registerOtherComponents(){
    if (typeof customElements.get('search-container') === 'undefined') {      customElements.define('search-container', SearchContainer);
    }
    if (typeof customElements.get('show-trending') === 'undefined') {      customElements.define('show-trending', ShowTrending);
    }
    if (typeof customElements.get('show-random') === 'undefined') {      customElements.define('show-random', ShowRandom);
    }
}

  render() {
    this.shadowObj.innerHTML = this.getTemplate();
  }

  getTemplate() {
    return `
      <div class="app-section">
      ${this.getSection(this.showSection)}
      </div>
      ${this.getStyle()}
    `;
  }

  getSection(section){
    switch(section){
      case 1:
        return `
        <search-container></search-container>
        `;
      case 2:
        return `
        <show-trending></show-trending>
        `;
      case 3:
        return `
        <show-random></show-random>
        `
    }
  }

  getStyle() {
    return `
      <style>
        :host {
          display: block;
        }
      </style>
    `;
  }
}
