import SearchContainer from '../search-container'
import ShowTrending from '../show-trending'
import ShowRandom from '../show-random'
import CustomHeader from '../custom-header'

export default class MyApp extends HTMLElement {
  constructor() {
 
    // We are not even going to touch this.
    super();
    this.showSection = 1;
    // lets create our shadow root
    this.shadowObj = this.attachShadow({mode: 'open'});
    this.registerOtherComponents();
    this.handleURL();
    this.render();
  }
  registerOtherComponents(){
    if (typeof customElements.get('search-container') === 'undefined') {      customElements.define('search-container', SearchContainer);
    }
    if (typeof customElements.get('show-trending') === 'undefined') {      customElements.define('show-trending', ShowTrending);
    }
    if (typeof customElements.get('show-random') === 'undefined') {      customElements.define('show-random', ShowRandom);
    }
    if (typeof customElements.get('custom-header') === 'undefined') {      customElements.define('custom-header', CustomHeader);
    }
}

  render() {
    this.shadowObj.innerHTML = this.getTemplate();
  }

  connectedCallback(){
    this.shadowObj.querySelector('custom-header')
    .addEventListener('custom-header-clicked', (e) => {
      let newShownSection = e.detail.data;
      if(newShownSection !== this.showSection){
        this.showSection = newShownSection;
        this.reRenderAppSection();
      }
    })
  }

  getTemplate() {
    return `
      <custom-header></custom-header>
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

  reRenderAppSection(){
    this.shadowObj.querySelector('.app-section').innerHTML = this.getSection(this.showSection)
  }

  handleURL(){
    switch(window.location.hash){
      case '#search':
        this.showSection = 1;
        break;
      case '#trending':
        this.showSection = 2;
        break;
      case '#random':
        this.showSection = 3;
        break;
      default:
        this.showSection = 1;
        break;
    }
    this.render();
  }


}
