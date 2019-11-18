const template = document.createElement('template')
template.innerHTML = `
    <style>
        .hat {
            width: 100%;
            height: 12vh;
            background-color: #8E24AA;
            display: flex;
            flex-direction: raw;
            justify-content: flex-start;
            align-items: center;
        }
        #box {
            opacity: 0;
        }
        
        .container {
          
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .btn {
            left: 20px;
            position: relative;
            height: 30px;
            
            cursor: pointer;
            bottom: 5px;
        } 
        .btn > span,
        .btn > span::before,
        .btn > span::after {
            
            position: absolute;
            background-color: white;
            width: 100%;
            height: 2px;
        }

        .btn > span::before {
            content: '';
            top: -8px;
          }
          .btn > span::after {
            content: '';
            top: 8px;
          }

        .list {
            visibility: hidden;
            background-color: rgba(210, 36, 170);
            display:flex;
            justify-content: space-evently;
            top: 10vh;
            position: absolute;
            flex-direction: column;
            
            left: 0;
        }

        .list > li {
            padding: 10px;
        }

        .Name {
            margin-left: 50px;
            color: white;
            
          
        }
        
        .search {
            border: 0;
            height: 60px; 
            width: 60px;
            background: #8E24AA;
            cursor: pointer;
            margin-right: 10px;
        }

        .circle {
            position: relative;
            width: 20px;
            border: 3px #fff solid;
            border-radius: 100%;
            margin-top: 10px;
            margin-left: 6px;
            content: '';
            height: 20px;
            display: block;
            
        }
 
        .handle {
            position: relative;
            height: 16px;   
            width: 4px;
            left: 30px;
            bottom: 7px;
            background-color: #fff;
            transform:rotate(-45deg);  
        }

        .searchInput {
          flex-grow: 1;
          visibility: hidden;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          margin-left: 10px;
        }

        input {
            
            height: 30px;
            font-size: 20px;
            display: block;
        }

       
    </style>
    <div class="hat">
            <div class="container">
            <input type="checkbox" id="box">
            <label class="btn" for="box">
            <span></span>
            </label>
            <ul class="list">
            <li>Create new chat</li>
            <li>Settings</li>
            </ul>
            </div>
       
        <div class="Name"><h1>Messenger</h1></div>
        <div class="searchInput"> <input type="text" value=""> </div>
        <button class="search"> 
            <div class="circle"> </div>
            <div class="handle"> </div>
        </button>
    </div>

`

class Hat extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$message = this._shadowRoot.querySelector('.hat')
    this.$search = this._shadowRoot.querySelector('.search')
    this.$input = this._shadowRoot.querySelector('.searchInput')
    this.$text = this._shadowRoot.querySelector('.searchInput > input')
    this.$search.addEventListener('click', this._Click.bind(this))
    this.$burger = this._shadowRoot.querySelector('.btn')
    this.$burger.addEventListener('click', this._ClickONBurger.bind(this))
    this.$list = this._shadowRoot.querySelector('.list')
    this.$text.addEventListener('keypress', this._onKeyPress.bind(this))
    this.$text.addEventListener('onchange', this._onChange)

  }

  _Click() {
    if (this.$input.style.visibility === "visible") {
      this.$input.style.visibility = "hidden"
    } else {
      this.$input.style.visibility = "visible"
    }
  }

  _ClickONBurger() {
    if (this.$list.style.visibility === "visible") {
      this.$list.style.visibility = "hidden"
    } else {
      this.$list.style.visibility = "visible"
    }
  }

  _onKeyPress (event) {
    if (event.keyCode === 13) {
      this.$text.value = ''
    }
  }

}


customElements.define('chat-hat', Hat)