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
        flex-direction: column;
        justify-content: flex-end;
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
    
    .form-input {
        height: 5vh;
        width: 100%;
    }
        input[type=submit] {
            visibility: collapse;
        }
    </style>
    <form>
        
        <div class="top">
            <div class="user"></div>
            <div class="online"></div>
        </div>
        <some-message></some-message>
       
        <form-input name="message-text" placeholder="Введите сообщение"></form-input>
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