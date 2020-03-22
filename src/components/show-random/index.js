import GifCover from '../gif-cover'

export default class ShowRandom extends HTMLElement{

    constructor(){
        super();
        this.key = '36WkImlmDhIJ7ocqDqeUbz6mUAUuoJjY'
        this.url = 'https://api.giphy.com/v1/gifs/random';
        this.shadowObj = this.attachShadow({mode:'open'});
    
        this.registerOtherComponents();
        this.render();
    }

    registerOtherComponents(){
        if(typeof customElements.get('gif-cover') === 'undefined'){
            customElements.define('gif-cover',GifCover);
        }
    }

    connectedCallback(){
        this.handleRandom();

        this.shadowObj.querySelector('button')
        .addEventListener('click', (e) => {
            this.handleRandom();
        })
    }

    render(){
        this.shadowObj.innerHTML = this.getTemplate();
    }

    getTemplate(){
        return `
        <div class="show-random__container">
            <div class="show-random__images"></div>
            <button class="show-random__button">Get Another Random Image</button>
        </div>
        ${this.getStyle()}
        `
    }

    getStyle(){
        return `
        <style>
        
        :host{
            display:block;
        }
        .show-random__container{
            text-align:center;
        }
        .show-random__images{
            display:flex;
            padding:10px;
            flex-wrap:wrap;
            box-sizing:border-box;
            justify-content:space-evenly;
        }
        .show-random__button{
            margin:10px;
            border:none;
            font-size:18px;
            color:#5f5f5f;
            cursor:pointer;
            padding:10px;
        }
        gif-cover{
            flex-basis:10%;
            padding:5px;
        }
        </style>
        `
    }

    handleRandom(){
        fetch(`${this.url}?api_key=${this.key}`)
        .then(response => response.json())
        .then((jsonResponse) => {
            this.handleTrendingData(jsonResponse.data);
        })
    }
    handleTrendingData(data){
        this.shadowObj.querySelector('.show-random__images')
        .innerHTML = `
        <gif-cover url=${data.image_url}></gif-cover>
        `
    }
}