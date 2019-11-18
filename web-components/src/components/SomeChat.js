const template = document.createElement('template')
template.innerHTML = `
    <style>
      .ChatList {
        width: 100 vw;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        overflow: auto;
        border-bottom: 1px grey solid;
      }

      .chat {
        height: 90px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        left: 20px;
        right: 20px;
        cursor: pointer;
      }

      .chat:hover {
        background-color: rgba(0,0,0,0.16);
      }

      .avatar {
        background-color: grey;
        width: 70px;
        height: 70px;
        border: 3px #fff solid;
        border-radius: 100%;
      }

      .container {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin-left: 20px;
      }

      .name {
        color: black;
        font-size: 18px;
      }

      .lastMessage {
        color: grey;
      }

      .container2 {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 5%;
        margin-left: 10px;
        margin-bottom: 5px;
      }

      .time {
        align-self: center;
        
      }

      .mark-left {
        width: 2px;
        height: 8px;
        transform:rotate(-45deg);
        background-color: #8E24AA;
      }

      .mark-right {
        margin-left: 6px;
        left: 6px;
        width: 2px;
        height: 16px;
        transform:rotate(45deg);
        background-color: #8E24AA;
      }

      .mark-left2 {
        width: 2px;
        height: 8px;
        transform:rotate(-45deg);
        background-color: #8E24AA;
      }

      .mark-right2 {
        margin-left: 6px;
        width: 2px;
        height: 16px;
        transform:rotate(45deg);
        background-color: #8E24AA;
      }

      .mark {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: baseline;
      }


    </style>

    <div class="ChatList"></div>
`

class SomeChat extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))
    this.$chats = this._shadowRoot.querySelector('.ChatList')
    // this.$chat = this._shadowRoot.querySelector('.chat')
    // this.$chat.dispatchEvent(new CustomEvent("clickOnChat"))
  }

  connectedCallback() {
    const storage = localStorage.getItem('messages')
    if (storage) {
      const messages = JSON.parse(storage)
      const len = messages.length
      this.buildChat("User", messages[len-1].text, messages[len-1].time)
    } else {
      this.buildChat("User", "", "")
    }
  }

  buildChat(name, text, time) {
    const Chat = document.createElement('div')
    Chat.setAttribute('class', 'chat')
    const Avatar = document.createElement('div')
    Avatar.setAttribute('class', 'avatar')
    Chat.appendChild(Avatar)
    const Container = document.createElement('div')
    Container.setAttribute('class', 'container')
    const Name = document.createElement('div')
    Name.setAttribute('class', "name")
    Name.innerHTML = name
    const Mes = document.createElement('div')
    Mes.setAttribute('class', 'lastMessage')
    Mes.innerHTML = text
    Container.appendChild(Name)
    Container.appendChild(Mes)
    Chat.appendChild(Container)
    const Container2 = document.createElement('div')
    Container2.setAttribute('class', 'container2')
    const MarkLeft = document.createElement('div')
    MarkLeft.setAttribute('class', 'mark-left')
    const MarkRight = document.createElement('div')
    MarkRight.setAttribute('class', 'mark-right')
    const Mark = document.createElement('div')
    Mark.setAttribute('class', 'mark')
    Mark.appendChild(MarkLeft)
    Mark.appendChild(MarkRight)
    const MarkLeft2 = document.createElement('div')
    MarkLeft2.setAttribute('class', 'mark-left2')
    const MarkRight2 = document.createElement('div')
    MarkRight2.setAttribute('class', 'mark-right2')
    Mark.appendChild(MarkLeft2)
    Mark.appendChild(MarkRight2)
    const Time = document.createElement('div')
    Time.setAttribute('class', 'time')
    Time.innerHTML = time
    Container2.appendChild(Time)
    Container2.appendChild(Mark)
    Chat.appendChild(Container2)
    this.$chats.appendChild(Chat)
  }
}

customElements.define('some-chat', SomeChat)