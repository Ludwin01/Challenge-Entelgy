import { getUserById } from "../services/users.js";

class modalUser extends HTMLElement {
  // costructor
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.user;
  }
  // Observo los atributos que acepta mi componente
  static get observedAttributes() {
    return ["isvisible", "userid"];
  }

  // ejecuto cada vez que cambian los atributos para ejecutar los metodos correspondientes
  attributeChangedCallback(attr, oldVal, newVal) {
    // Lo que debo hacer cuando cambia el atributo userid
    if (attr == "userid") {
      // seteando el usuario ya encontrado
      this.user = !!getUserById(newVal) && getUserById(newVal);
    }
    // Lo que debo hacer cuando cambia el atributo isvisible
    if (attr == "isvisible") {
      // seteando el valor de isvisible
      this.isvisible = newVal;
      if (this.isvisible == "true") {
        // ejecuto el siguiente método cuando es visible
        this._showModal();
      } else {
        // ejecuto el siguiente método cuando no es visible
        this._hideModal();
      }
    }
  }

  // Declarando mi template que será la maqueta para mi componente
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
    <div class="modal">
      <div class='modal-dialog'>

        <header>
          <h2 class="header-text"></h2>
          <button id="close" class="superior" >
            X
          </button>
        </header>

        <div class="modal-body">
          <img class="img-container" />
          <div>
            <div class="description-cont">
              <p class="description-paragraph">Nombre: </p>
              <h2 class="description-text"></h2>
            </div>
            <div class="description-cont">
              <p class="description-paragraph">Apellido: </p>
              <p class="description-text lastname"></p>
            </div>
            <div class="description-cont">
              <p class="description-paragraph">Email: </p>
              <p class="description-text email"></p>
            </div>
          </div>
          <div class="wrapper-point">
            <div class="point"></div>
            <div class="point line"></div>
            <div class="point"></div>
          </div>
        </div>

        <footer></footer>
      </div>
    </div>
      ${this.getStyle()}
    `;
    // retorno mi template ya concatenado con sus estilos correspondientes
    return template;
  }
  // declaro los estilos con sus mediaQuery
  getStyle() {
    return `
      <style>
        .modal{
          width: 100vw;
          height: 100%;
          background-color: RGB(0,0,0, 0.6);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
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
          background-color: RGB(255,255,255, 0.4);
          backdrop-filter: blur(2px);
          border-radius: 20px;
          padding: 0.5rem 1rem;
          transition: width .5s ease;
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
            transform: translateX(20px);
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

        .description-paragraph{
          margin: 0;
          font-size: 22px;
          font-weight: 700:
        }

        .description-cont{
          display: flex;
          align-items: center;
          line-height: 0;
          flex-wrap: wrap;
        }

        @media (max-width: 1300px) {
          .modal-body{
            justify-content: center;
            margin-top: 1rem;
            flex-direction: column;
          }
          .wrapper-point{
            transform: rotate(90deg);
            margin-right: 0;
          }
          
        }

        @media (max-width: 950px) {
          
          .modal-dialog{
            width: 70%;
          }
        }

        @media (max-width: 460px) {
          .img-container{
            width: auto;
          }
          .description-paragraph, .description-text{
            font-size: 18px;
          }
          .point{
            height: 0.5rem;
            width: 0.5rem;
          }
          .line{
            height: 2rem;
            width: 0.5rem;
          }
          footer{
            font-size: 10px;
          }
          img{
            margin-left: 0;
          }
        }

      </style>
    `;
  }
  // Ejecuta cuando el componente ya esta listo en el dom
  connectedCallback() {
    // Renderizando el componente
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));

    // Ubicando los lugares para agregar el contenido dinámico
    this._modal = this.shadowRoot.querySelector("div.modal");
    this.headerModal = this.shadowRoot.querySelector("h2.header-text");
    this.imgModal = this.shadowRoot.querySelector("img.img-container");
    this.nameModal = this.shadowRoot.querySelector("h2.description-text");
    this.lastName = this.shadowRoot.querySelector("p.lastname");
    this.email = this.shadowRoot.querySelector("p.email");
    this.footer = this.shadowRoot.querySelector("footer");

    // Boton para ocultar modal
    this.shadowRoot
      .querySelector("button.superior")
      ?.addEventListener("click", this._hideModal());
    // seteando isvisible a falso cada vez que cierro modal
    let button = this.shadowRoot.querySelectorAll("button.superior");
    button.forEach((item) => {
      item.addEventListener("click", () => {
        let modal = document.getElementById("modal-user");
        modal.setAttribute("isvisible", "false");
      });
    });
  }

  // Método que debe ejecutar cuando el isvisible es true
  _showModal() {
    // Agregando data en cada contenedor que declaramos anteriormente
    this._modal.style.display = "flex";
    this.headerModal.textContent = `${this.user.first_name}`;
    this.imgModal.setAttribute("src", `${this.user.avatar}`);
    this.imgModal.setAttribute(
      "alt",
      `${this.user.first_name} ${this.user.last_name}`
    );
    this.imgModal.setAttribute("title", `${this.user.first_name}`);
    this.nameModal.textContent = `${this.user.first_name}`;
    this.lastName.textContent = `${this.user.last_name}`;
    this.email.textContent = `${this.user.email}`;
    this.footer.textContent = `
    ${this.user?.first_name} ${this.user?.last_name} | ${this.user?.email}
  `;
  }
  // Método al ocultar modal
  _hideModal() {
    this._modal.style.display = "none";
  }
}

// Defino como se invocará mi componente modal
customElements.define("modal-user", modalUser);
