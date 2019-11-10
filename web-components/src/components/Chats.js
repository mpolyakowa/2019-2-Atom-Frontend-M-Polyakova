const template = document.createElement('template')
template.innerHTML = `
    <style>
        .form {
            display: flex;
            flex-direction: column;
            height: 100 vh;
            width: 100 vw;

        }

    </style>
    <form>
        <chat-hat></chat-hat>
        
        <some-chat> </some-chat>
        
    </form>
    <create-button></create-button>

`

class ChatList extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
   // this.$message = this._shadowRoot.querySelector('.')
  }
}

customElements.define('chat-list', ChatList)