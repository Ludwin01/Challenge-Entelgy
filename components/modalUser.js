import { getUserById } from "../services/users.js";

class modalUser extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.user
  }

  static get observedAttributes() {
    return ['isvisible', 'userid']
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (newVal !== oldVal) {
      this[attr] = newVal;
      this.user = getUserById(this.userid)
      
      const sheet = new CSSStyleSheet
      if (this.isvisible=='true') {
        sheet.replaceSync( `.modal{ display: flex }`)
      } else {
        sheet.replaceSync( `.modal{ display: none }`)
      }
      this.shadowRoot.adoptedStyleSheets = [ sheet ] 
      this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
      
    }
    let button = this.shadowRoot.querySelectorAll('button.superior')
    button.forEach((item) => {
      item.addEventListener('click', () => {
        let modal = document.getElementById('modal-user')
        modal.setAttribute('isvisible', 'false')
      })
    })
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
    <div class="modal">
      <div class='modal-dialog'>

        <header>
          <h2 class="header-text">
            ${this.user.first_name}
          </h2>
          <button id="close" class="superior" >
            X
          </button>
        </header>

        <div class="modal-body">
          <img class="img-container" src="${this.user.avatar}" />
          <div>
            <h2 class="description-text"><span>Nombre: </span>${this.user.first_name }</h2>
            <p class="description-text"><span>Apellido: </span> ${this.user.last_name }</p>
            <p class="description-text"><span>Contacto: </span> ${this.user.email }</p>
          </div>
          <div class="wrapper-point">
            <div class="point"></div>
            <div class="point line"></div>
            <div class="point"></div>
          </div>
        </div>

        <footer>
          <p>${this.user.first_name }  ${this.user.last_name} | ${this.user.email}</p>
        </footer>
      </div>
      <scrip>
        function onButton () {
          console.log('Clickcito por favor funciona')
        }
      </scrip>
    </div>

      ${this.getStyle()}
    `

    return template;
  }

  getStyle() {
    return `
      <style>
        .modal{
          width: 100vw;
          height: 100vh;
          background-color: RGB(0,0,0, 0.6);
          position: fixed;
          top: 0;
          left: 0;
          display: none;
          justify-content: center;
          align-items: center;
          z-index: 1;
        }

        header{
          padding: 0.5rem 0;
          border-bottom: 1px solid RGB(255,255,255, 0.4);
          font-size: 18px;
          display: flex;
          justify-content: space-between;
        }

        .header-text{
          width: 90%;
          margin: 0;
          display: flex;
          justify-content: center;
        }

        .modal-dialog {
          width: 40%;
          height: 40vh;
          background-color: RGB(255,255,255, 0.4);
          backdrop-filter: blur(2px);
          border-radius: 20px;
          padding: 0.5rem 1rem;
        }

        img {
          padding: 2px;
          border-radius: 10px;
          border: 5px solid RGB(255,255,255, 0.4);
          width: 12rem;
          margin-left: -3rem;
          box-shadow: 70px 15px 98px -25px rgba(0,0,0,0.75);
          -webkit-box-shadow: 70px 15px 98px -25px rgba(0,0,0,0.75);
          -moz-box-shadow: 70px 15px 98px -25px rgba(0,0,0,0.75);
        }

        .modal-body{
          display: flex;
          height: 80%;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .point{
          height: 1rem;
          width: 1rem;
          background: RGB(255,255,255, 0.4);
          border-radius: 50%;
          transition: translate 1s ease-out;
          animation-duration: 1s;
          animation-name: vayven;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }

        .line{
          height: 3rem;
          background: #006ec1;
          border-radius: 10px;
          margin: 5px 0;
          animation-direction: alternate-reverse;
        }

        #close{
          border-radius: 50%;
          height: 2rem;
          width: 2rem;
          border: 1px solid RGB(255,255,255, 0.4);
          background: transparent;
          cursor: pointer;
        }

        .wrapper-point{
          margin-right: 2rem;
        }

        @keyframes vayven {
          from {
            transform: translateX(30px);
          }
        
          to {
            margin-left: 0px;
          }
        }

        footer{
          display: flex;
          justify-content: center;
          font-weight: 300;
          font-size: 15px;
        }

        .description-text{
          font-size: 22px;
          font-weight: 500;
        }

        .description-text > span{
          font-weight: 700;
        }

      </style>
    `;
  }

  connectedCallback() {
    let button = this.shadowRoot.getElementById('close')
    if (button) {
      button.addEventListener('click', clickFunction())
    }
  }
  
}

customElements.define("modal-user", modalUser);
