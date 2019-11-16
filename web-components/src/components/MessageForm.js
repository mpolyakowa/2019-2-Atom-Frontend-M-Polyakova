const template = document.createElement('template')
template.innerHTML = `
    <style>
    form {
        display: flex;
        flex-direction: column;
        height: 100 vh;
        width: 100%;
    }
    
    .top {
        width: 100%;
        height: 10vh;
        background-color: #8E24AA;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .container {
      display: flex;
      flex-direction: column;
      margin-left: 15px;
    }

    .big_container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
    }

    .user {
        text-align: center;
        color: white;
    }

    .online {
        text-align: center;
        font-weight: lighter;
        color: grey;
    }

    .avatar {
      background-color: grey;
      width: 70px;
      height: 70px;
      border: 3px #fff solid;
      border-radius: 100%;
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
      top: 3px;
      display: block;
      
  }

  .handle {
      position: relative;
      height: 16px;   
      width: 4px;
      left: 30px;
      bottom: 4px;
      background-color: #fff;
      transform:rotate(-45deg);  
  }

  .back {
    height: 60px; 
    width: 60px;  
    cursor: pointer;
  }

  .back_top {
    position: relative;
    height: 20px;
    width: 3px;
    background-color: #fff;
    transform:rotate(45deg);
    left: 25px;
    top: 15px;
  }

  .back_bottom {
    position: relative;
    height: 20px;
    width: 3px;
    background-color: #fff;
    transform:rotate(-45deg);
    left: 25px;
    bottom: 17px;
  }

  .back_middle {
    position: relative;
    height: 25px;
    width: 3px;
    background-color: #fff;
    transform:rotate(90deg);
    left: 31px;
    bottom: 1px;
  }

  .settings {
    height: 60px; 
    width: 60px; 
    cursor: pointer;
  }

  .settings_top {
    position: relative;
    width: 5px;
    border: 1px #fff solid;
    border-radius: 100%;
    content: '';
    height: 5px;
    display: block;
    background: #fff;
    left: 27px;
    top: 16px;
    margin-bottom: 4px;
  }

  .clip {
    position: relative;
    height: 20px; 
    width: 30px;
  }

 

    
    .form-input {
        height: 10vh;
        width: 100%;
    }
        input[type=submit] {
            visibility: collapse;
        }
    </style>
    <form>
        
        <div class="top">
            <div class="back">
              <div class="back_top"> </div>
              <div class="back_middle"> </div>
              <div class="back_bottom"> </div>
            </div>
            <div class="big_container">
              <div class="avatar"> </div>
              <div class="container">
                <div class="user"> </div>
                <div class="online"> </div>
              </div>
            </div>
            <div class="search"> 
              <div class="circle"> </div>
              <div class="handle"> </div>
            </div>
            <div class="settings">
              <div class="settings_top"></div>
              <div class="settings_top"></div>
              <div class="settings_top"></div>
            </div>
        </div>
        <some-message></some-message>
        <div class="input_container">
        <form-input name="message-text" placeholder="Введите сообщение"> </form-input>
        </div>
    </form>
`

class MessageForm extends HTMLElement {
  constructor () {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$form = this._shadowRoot.querySelector('form')
    this.$input = this._shadowRoot.querySelector('form-input')
    this.$message = this._shadowRoot.querySelector('some-message')
    this.$user = this._shadowRoot.querySelector('.user')
    this.$user.innerHTML = "User"
    this.$online = this._shadowRoot.querySelector('.online')
    this.$online.innerHTML = "online"
    this.$form.addEventListener('submit', this._onSubmit.bind(this))
    this.$form.addEventListener('keypress', this._onKeyPress.bind(this))
  }

  _onSubmit (event) {
    event.preventDefault()
    this.$message.setMessage(this.$input.value)
    this.$input.setAttribute('value', '')
  }

  _onKeyPress (event) {
    if (event.keyCode === 13 && this.$input.value !== '') {
      this.$form.dispatchEvent(new Event('submit'))
    }
  }
}

customElements.define('message-form', MessageForm)