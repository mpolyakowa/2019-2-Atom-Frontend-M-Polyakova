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
            height: 30px;   
            width: 8px;
            background-color: #fff;
            transform:rotate(45deg);
		}

		.elem1 {
			position: relative;
            height: 10px;   
			width: 8px;
			top: 5px;
			left: 15px;
            background-color: #fff;
            transform:rotate(45deg);
		}
		.elem2 {
			position: relative;
            height: 6px;   
			width: 8px;
			right: 14px;
			bottom: 4px;
            background-color: #fff;
			transform:rotate(45deg);
		}

		.elem3 {
			position: relative;         
			bottom: 6px;
			right: 19px;
			transform:rotate(45deg);
			border: 4px solid transparent;	
			border-top: 4px solid white;
		}

	</style>
	
	<div class="container">
		<div class="elem1"></div>
		<div class="elem"></div>
		<div class="elem2"></div>
		<div class="elem3"></div>
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