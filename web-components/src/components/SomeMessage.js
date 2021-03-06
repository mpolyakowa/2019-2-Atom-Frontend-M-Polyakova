const template = document.createElement('template')
template.innerHTML = `
    <style>
        .message {
            margin: 10px;
            min-width: 10%;
            max-width: 20%;
            padding: 8px;
            min-height: 40px;
            color: rgba(0, 0, 0, 0.87);
            background-color: rgba(210, 36, 170, 0.17);
            align-self: flex-end;
            word-wrap: break-word;
        }

        @keyframes appear {
          from {
            background-color: rgba(210, 36, 170, 0);  
          }
        
          to {
            background-color: rgba(210, 36, 170, 0.17);
          }
        }

        .result {
            margin-bottom: 15px;
            background-color: rgba(0,0,0,0.08);  
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            min-height: 87vh;
            overflow: auto;
            
        }
        .time {
            color: black;
            width: calc(100% - 4px);
            text-align: right;
        }

        }
    </style>
   
        <div class="result"></div>
    
`

class SomeMessage extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$message = this._shadowRoot.querySelector('.result')
  }

  connectedCallback() {
    const localS = localStorage.getItem('messages')
    if (localS) {
      const messages = JSON.parse(localS)
      for (let i = 0; i < messages.length; i += 1) {
        this.drawMessage(messages[i].text, messages[i].time)
      }
    }
  }

  drawMessage(text, time) {
    const Mess = document.createElement('div')
    const Time = document.createElement('div')
    Mess.setAttribute('class', 'message')
    Time.setAttribute('class', 'time')
    Mess.innerHTML = text
    Time.innerHTML = time
    Mess.appendChild(Time)
    Mess.style.animationName = 'appear'
    Mess.style.animationDuration = '1s'
    this.$message.appendChild(Mess)

  }

  setMessage(val) {
    const date = new Date()
    const hour = date.getHours()
    const min = date.getMinutes()
    this.drawMessage(val, `${hour}:${min}`)
    const mes = {
      author: 'author',
      text: val,
      time: `${hour}:${min}`,
    }
    let tmp = []
    if (localStorage.getItem('messages')) {
      tmp = JSON.parse(localStorage.getItem('messages'))
    }
    tmp.push(mes)
    localStorage.setItem('messages', JSON.stringify(tmp))
    window.scrollTo(0,this._shadowRoot.querySelector('.result').scrollHeight)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.$input.setAttribute(name, newValue)
  }
}

customElements.define('some-message', SomeMessage)