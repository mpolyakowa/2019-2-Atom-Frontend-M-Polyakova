const template = document.createElement('template')
template.innerHTML = `
	<style>
		.container {
			display: flex;
			position: fixed;
			width: 90px;
			height: 90px;
			border: 3px #fff solid;
            border-radius: 100%;
			bottom: 50px;
			right: 50px;
			background-color: #8E24AA;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			animation: pulse 2s infinite;
		}

		.container:hover {
			animation: none;
		  }
		  
		  @-webkit-keyframes container {
			0% {
			  -webkit-box-shadow: 0 0 0 0 rgba(142, 36, 170, 0.4);
			}
			70% {
				-webkit-box-shadow: 0 0 0 20px rgba(142, 36, 170, 0);
			}
			100% {
				-webkit-box-shadow: 0 0 0 0 rgba(142, 36, 170, 0);
			}
		  }
		  @keyframes pulse {
			0% {
			  -moz-box-shadow: 0 0 0 0 rgba(142, 36, 170, 0.4);
			  box-shadow: 0 0 0 0 rgba(142, 36, 170, 0.4);
			}
			70% {
				-moz-box-shadow: 0 0 0 10px rgba(142, 36, 170, 0);
				box-shadow: 0 0 0 20px rgba(142, 36, 170, 0);
			}
			100% {
				-moz-box-shadow: 0 0 0 0 rgba(142, 36, 170, 0);
				box-shadow: 0 0 0 0 rgba(142, 36, 170, 0);
			}
		  }

		.elem {
			position: relative;
            height: 50px;   
            width: 8px;
            background-color: #fff;
            transform:rotate(45deg);
		}

	</style>
	
	<div class="container">
		<div class="elem"></div>
	</div>

`

class CreateButton extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
	// this.$btn = this.shadowRoot.querySelector('.container')
	// this.$btn.addEventListener('click', this._clickOnCreateBtn.bind(this))
  }
}

customElements.define('create-button', CreateButton)