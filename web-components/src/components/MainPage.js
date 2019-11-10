const template = document.createElement('template')
template.innerHTML = `
	<style>
		.container {
			display: block;	
		}

		.container1 {
			display: none; 	
		}

	</style>
	
	<div class="container">
		<chat-list></chat-list>
    </div>
    
    <div class="container1">
        <message-form></message-form>
    </div>

`
class MainPage extends HTMLElement {
    constructor() {
      super()
      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))
      this.$chat = this._shadowRoot.querySelector('.container > chat-list')._shadowRoot.querySelector('form > some-chat')._shadowRoot.querySelector('.chat')
      this.$chat.addEventListener('click', this._ClickOnChat.bind(this))
      this.$container = this._shadowRoot.querySelector('.container')
      this.$container1 = this._shadowRoot.querySelector('.container1')

    }

    _ClickOnChat() {
      this.$container.style.display = 'none'
      this.$container1.style.display = 'block'
    }

    
    
  }
  
  customElements.define('main-page', MainPage)