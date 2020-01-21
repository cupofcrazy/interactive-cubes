import Canvas from '../components/Canvas'
import { TimelineMax, Expo } from 'gsap'


export default class {
    constructor({ target }) {
        this.canvas = null
        
    }
    init() {

        this.canvas = new Canvas(document.querySelector('canvas'), 30)
        this.canvas.create()
        
        
    }
    initCanvas() {
        
    }

    initEvents() {
        
    }
    
}