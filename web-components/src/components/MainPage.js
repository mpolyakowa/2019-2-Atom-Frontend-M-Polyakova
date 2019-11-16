const template = document.createElement('template')
template.innerHTML = `
	<style>
		.container {
      height: 100%;
			display: block;	
		}

		.container1 {
      height: 100 vh;
      display: none; 	
    }
    
    @keyframes appear {
      from {
        background: rgba(0,0,0, 1);  
      }
    
      to {
        background: rgba(0,0,0, 0);
      }
    }
    .stor {
      position: fixed;
      height: 100vh;
      width: 100vw;
      z-index: -1;
    }

    .stor1 {
      position: fixed;
      height: 100vh;
      width: 100vw;
      z-index: 4;
    }

  </style>
    <div class="container">
      <div class="stor"></div>
		  <chat-list></chat-list>
    </div>
    
    <div class="container1">
        <div class="stor1"></div>
        <message-form></message-form>
    </div>
`
class MainPage extends HTMLElement {
    constructor() {
      super()
      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))
      this.$stor = this._shadowRoot.querySelector('.container > .stor')
      this.$stor1 = this._shadowRoot.querySelector('.container1 > .stor1') 
      this.$chat = this._shadowRoot.querySelector('.container > chat-list')._shadowRoot.querySelector('form > some-chat')._shadowRoot.querySelector('.chat')
      this.$chat.addEventListener('click', this._ClickOnChat.bind(this))
      this.$container = this._shadowRoot.querySelector('.container')
      this.$container1 = this._shadowRoot.querySelector('.container1')
      this.$back = this._shadowRoot.querySelector('.container1 > message-form')._shadowRoot.querySelector('form > .top > .back')
      this.$back.addEventListener('click', this._ClickOnBackBtn.bind(this))
      this.$top = this._shadowRoot.querySelector('.container1 > message-form')._shadowRoot.querySelector('form > .top')
    }

    _ClickOnChat() {
      this.$container.style.display = 'none'
      this.$container1.style.display = 'block'
      const start = Date.now()
      const timerId = setInterval(() => this.interval1(start), 10)
      setTimeout(() => { clearInterval(timerId)}, 500)
      this.$stor1.style.zIndex = '0'
    }

    interval1(start) {
      const timePassed = Date.now() - start
      this.draw1(timePassed)
    }
  
    draw1(timePassed) {
      const opacity = (1 - timePassed/500)
      const str = `rgba(255,255,255,${opacity})`
      this.$stor1.style.backgroundColor = str
    }

    _ClickOnBackBtn() {
      this.$container1.style.display = 'none'
      this.$container.style.display = 'block'
      this.$stor.style.zIndex = '1'
      const start = Date.now()
      const timerId = setInterval(() => this.interval(start), 10)
      setTimeout(() => { clearInterval(timerId); this.$stor.style.zIndex = '-1'}, 500)
    }

    interval(start) {
      const timePassed = Date.now() - start
      this.draw(timePassed)
    }

    draw(timePassed) {
      const opacity = (1 - timePassed/500)
      const str = `rgba(255,255,255,${opacity})`
      this.$stor.style.backgroundColor = str
    }
  }


  
  customElements.define('main-page', MainPage)