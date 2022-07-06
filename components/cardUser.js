class cardUser extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["avatar", "first_name", "last_name", "email", "id"];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (newVal !== oldVal) {
      this[attr] = newVal;
    }
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
    <div class="card-wrapper" id="card">

      <div class="user-wrapper">
        <img
          class="image"
          alt="El avatar"
          title="Avatar de chanchan"
          src="${this.avatar}"/>
        <div class="container-description">
          <h2 class="full-name">${this.first_name} ${this.last_name}</h2>
          <p class="email">${this.email}</p>
        </div>

      </div>

    </div>
    ${this.getStyles()}
    `;

    return template;
  }

  getStyles() {
    return `

    <style>
        :host{
          --color-shadow: #006ec1;
          --color-shadow-2: #009ee5;
          --color-mid: #52bcec;
          --color-light: #89d1f3;
          --color-light-2: #b5e5f9;
          cursor: pointer;
          user-select: none;
        }


        .card-wrapper{
          width: 20rem;
          height: 10rem;
          background: var(--color-shadow);
          display: flex;
          align-items: center;
          border-radius: 10px;
          transition: all .5s ease;
        }

        .card-wrapper:hover{
          transform: scale(1.02);
          box-shadow: -3px 8px 37px -3px rgba(0,0,0,0.46);
          -webkit-box-shadow: -3px 8px 37px -3px rgba(0,0,0,0.46);
          -moz-box-shadow: -3px 8px 37px -3px rgba(0,0,0,0.46);
        }

        .image{
          height: 100px;
          width: 100px;
          border-radius: 50%;
        }

        .user-wrapper {
          display: flex;
          width: 100%;
          justify-content: space-evenly;
          align-items: center;
        }

        @media(max-width: 720px){
          .card-wrapper{
            height: 8rem;
          }
        }

        @media (max-width: 350px) {
          .card-wrapper {
            max-width: 80%;
            height: 100%;
            padding: 5px 0;
          }
          .image{
            height: 4rem;
            width: 4rem;
          }

          :host{
            justify-content: center;
            display: flex;
          }
          .container-description{

          }
          .full-name{
            font-size: 18px;
            margin: 0;
          }
          .email{
            margin: 0;
            font-size: 13px;
          }
          .container-description{
            width: 65%;
          }
        }
      </style>
    `;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
    let userId = this.id
    const card = this.shadowRoot.getElementById("card");
    card.addEventListener("click", function () {
      let modal = document.getElementById('modal-user')
      modal.setAttribute('userid', `${userId}`)
      modal.setAttribute('isvisible', 'true')
    });
  }
}

customElements.define("card-user", cardUser);
