const template = document.createElement('template')
template.innerHTML = `
    <style>
    .input_container {
      position: fixed;
      width: 100%;
      display: flex;
      height: 10vh;
      flex-direction: row;
      justify-content: flex-start;
    }

    input {
      position: fixed;
      bottom: 0;
      outline: none;
      width: calc(100% - 30px);
      height: 30px;
      border-top: 1px solid rgba(25, 25, 25, 0.32);
    }

    .clip {
      position: fixed;
      height: 34px; 
      width: 30px;
      bottom: 0;
      outline: none;
      left: calc(100% - 30px);
      display: inline-block;
      background-color: #fff;
      border-top: 1px solid rgba(25, 25, 25, 0.32);
    }
    
    :host {
      display: inline-block;

    }

    </style>
    <input type="text">
    <canvas class="clip"></canvas>
    
`

class FormInput extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))

    this.$input = this.shadowRoot.querySelector('input')

    this.$clip = this._shadowRoot.querySelector('.clip')
    this.drawClip()
  }

  drawClip() {
    const ctx = this.$clip.getContext('2d')
    ctx.width = '300px'
    ctx.height = '200px'
    ctx.lineWidth = 10
    ctx.strokeStyle = '#777'
    ctx.beginPath()
    ctx.moveTo(100, 90)
    ctx.lineTo(200, 90)
    ctx.arc(200, 77.5, 12.5, -0.5*Math.PI, 0.5*Math.PI)
    ctx.moveTo(200, 65)
    ctx.lineTo(50, 65)
    ctx.arc(50, 90, 25, 0.5*Math.PI, 1.5*Math.PI)
    ctx.moveTo(50, 115)
    ctx.lineTo(180, 115)
    ctx.stroke()
    ctx.closePath()
    ctx.strokeStyle = '#fff'
    ctx.beginPath()
    ctx.moveTo(200, 85)
    ctx.lineTo(200, 70)
    ctx.moveTo(50, 110)
    ctx.lineTo(50, 70)
    ctx.stroke()
  }

  static get observedAttributes() {
    return ['name', 'value', 'placeholder', 'disabled']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') {
      this.$input.value = newValue
    } else {
      this.$input.setAttribute(name, newValue)
    }
  }

  get value() {
    return this.$input.value
  }
}

customElements.define('form-input', FormInput)