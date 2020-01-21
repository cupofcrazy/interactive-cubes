/**
 * An tiny interactive cubes experiment
 * Made with zzz.dog
 */

import Zdog from 'zdog'
import gsap, { Expo } from 'gsap'

/* eslint-disable no-useless-constructor */
/** 
 * @author Balogun Tobi
*/

class Canvas {
    /**
     * @param { HTMLElement } canvas HTML Canvas Element
     * @param { Number } amount Number of objects to render. Defaults to 30
     */
    constructor(canvas, amount = 30) {
        this.pointerDown = false
        this.canvas = canvas;

        // Canvas dimensions
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        // object store
        this.objects = []

        this.illo = new Zdog.Illustration({
            element: this.canvas,
            resize: true
        })
        // If amount of shapes is greater than 30, set default to 30
        this.amount = amount > 30 ? 30 : amount
    }
    
    create() {
        for (let i = 0; i < this.amount; i++) {
            // Create new box
            const object = new Zdog.Box({
                addTo: this.illo,
                width: Math.floor(Math.random() * 70),
                height: Math.floor(Math.random() * 70),
                depth: Math.floor(Math.random() * 70),
                translate: {
                    x: this.getRandomInt(-window.innerWidth, window.innerHeight) / 2,
                    y: this.getRandomInt(-window.innerHeight, window.innerHeight) / 2,
                },
                rotate: {
                    x: Math.random(),
                    y: Math.random(),
                    z: Math.random()
                },
                stroke: false,
                color: '#C25',
                leftFace: '#EA0',
                rightFace: '#E62',
                topFace: '#EDO',
                bottomFace: '#636'
            })
            // console.log(object)
            this.objects.push(object)
        }
        
        this.render()
        this.initEvents()
        
    }
    initEvents() {
        // Mobile Detect
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

        // window.addEventListener('resize', () => this.onResize())

        if (isMobile) {
            // Touch Events (Mobile)
            window.addEventListener('touchstart', (e) => this.pointerDownHandler(e))
            window.addEventListener('touchmove', (e) => this.pointerMoveHandler(e))
            window.addEventListener('touchend', (e) => this.pointerUpHandler(e))
        } else {
            // Mouse Events (Desktop)
            window.addEventListener('mousedown', (e) => this.pointerDownHandler(e))
            window.addEventListener('mousemove', (e) => this.pointerMoveHandler(e))
            window.addEventListener('mouseup', (e) => this.pointerUpHandler(e))  
        }
    }
    onResize() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight
    }
    pointerDownHandler(e) {
        this.pointerDown = true

        const eX = e.clientX || e.targetTouches[0].clientX
        const eY = e.clientY || e.targetTouches[0].clientY
        
        const x = eX - window.innerWidth / 2
        const y = eY - window.innerHeight / 2

        this.objects.forEach(obj => {
            gsap.to(obj.translate, 1, {
                x, y,
                ease: Expo.easeOut
            })
        }) 
        this.illo.updateRenderGraph()

    }
    pointerUpHandler(e) {
        this.pointerDown = false
        if (!this.pointerDown) {
        
            this.objects.forEach((obj, index) => {
                const x = this.getRandomInt(-window.innerWidth, window.innerWidth) / 2
                const y = this.getRandomInt(-window.innerHeight, window.innerHeight) / 2

                const tl = new gsap.timeline()
                
                tl.to(obj.translate, 3, {
                    x: x,
                    y: y,
                    ease: Expo.easeOut
                }, 0)
                tl.to(obj.rotate, 3, {
                    x: Math.random() * 10,
                    y: Math.random() * 10,
                    z: Math.random() * 10,
                    ease: Expo.easeOut
                }, 0)
            })
            
            this.illo.updateRenderGraph()
        }
    }
    pointerMoveHandler(e) {
        e.preventDefault()
        if (this.pointerDown) {
            
            this.objects.forEach((obj, index) => {
                const eX = e.clientX || e.changedTouches[0].clientX
                const eY = e.clientY || e.changedTouches[0].clientY

                const x = eX - window.innerWidth / 2
                const y = eY - window.innerHeight / 2
                
                gsap.to(obj.translate, .5, {
                    x: x,
                    y: y,
                    delay: index * 0.01
                }, 0)
                gsap.to(obj.rotate, .5, {
                    x: x * 0.005,
                    y: y * 0.005,
                    delay: index * 0.01
                }, 0)
            })
        }
            
        this.illo.updateRenderGraph()
    }
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
        
    }
    render() {
        this.illo.updateRenderGraph()
        this.animate()
    }
    animate() {
        this.illo.updateRenderGraph()

        requestAnimationFrame(() => this.animate())
    }
}

export default Canvas;