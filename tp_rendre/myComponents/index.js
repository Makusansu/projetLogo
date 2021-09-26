const getBaseURL = () => {
  return new URL(".", import.meta.url);
};

//, texture text,  rapidé de l'animation
class MyLogo extends HTMLElement {
  style = `
  @import url('https://fonts.googleapis.com/css2?family=Birthstone&family=Montserrat:wght@100&family=Roboto:wght@500&display=swap');

    .switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }
    
    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    input:checked + .slider {
      background-color: #2196F3;
    }
    
    input:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }
    
    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
    
    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }
    
    .slider.round:before {
      border-radius: 50%;
    }
    #Global {
      display:flex;
   }
    
    #logo {
      font-family ='Lobster Two', cursive;
      flex:1;
      padding: 1em;
      border:ridge black 2px;
      width:40%;
      text-align: center;
      font-size:40px;
      color:yellow;
      display:inline-block;
      text-shadow: 0 1px 0 #ccc,
                   0 2px 0 #c9c9c9,
                   0 3px 0 #bbb,
                   0 4px 0 #b9b9b9,
                   0 5px 0 #aaa,
                   0 6px 1px rgba(0,0,0,.1),
                   0 0 5px rgba(0,0,0,.1),
                   0 1px 3px rgba(0,0,0,.3),
                   0 3px 5px rgba(0,0,0,.2),
                   0 5px 10px rgba(0,0,0,.25),
                   0 10px 10px rgba(0,0,0,.2),
                   0 20px 20px rgba(0,0,0,.15);
    } 

    #MyControls {
      flex:1;
      padding: 1em;
      float:left;
      width:50%;
      border: 2px ridge black;
      background-color: #383E42;
      padding: .5rem;
      display: inline-block;
      flex-direction: column;
      color: #fefee2;
    }

    .focus-in-expand {
      -webkit-animation: focus-in-expand 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
              animation: focus-in-expand 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }


  .scale-up-center{-webkit-animation:scale-up-center .4s cubic-bezier(.39,.575,.565,1.000) both;animation:scale-up-center .4s cubic-bezier(.39,.575,.565,1.000) both}
  .scale-down-center{-webkit-animation:scale-down-center .4s cubic-bezier(.25,.46,.45,.94) both;animation:scale-down-center .4s cubic-bezier(.25,.46,.45,.94) both}

@-webkit-keyframes focus-in-expand {
0% {
  letter-spacing: -0.5em;
  -webkit-filter: blur(12px);
          filter: blur(12px);
  opacity: 0;
}
100% {
  -webkit-filter: blur(0px);
          filter: blur(0px);
  opacity: 1;
}
}
@keyframes focus-in-expand {
0% {
  letter-spacing: -0.5em;
  -webkit-filter: blur(12px);
          filter: blur(12px);
  opacity: 0;
}
100% {
  -webkit-filter: blur(0px);
          filter: blur(0px);
  opacity: 1;
}
}


@-webkit-keyframes scale-down-center{0%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(.5);transform:scale(.5)}}@keyframes scale-down-center{0%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(.5);transform:scale(.5)}}


@-webkit-keyframes scale-up-center{0%{-webkit-transform:scale(.5);transform:scale(.5)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes scale-up-center{0%{-webkit-transform:scale(.5);transform:scale(.5)}100%{-webkit-transform:scale(1);transform:scale(1)}}


    `;
  html = `
    <h3>Afficher ou non les controles</h3>
    <label class="switch">
      <input id="show" type="checkbox"/>
      <span class="slider round"></span>
    </label>

    <div id="Global">
        <div id="MyControls">
        Couleur : <input type="color" id="selecteurCouleur">
        
        <br>
        
        Taille : 5 <input type="range" val=40 min=5 max=100 
                          id="selecteurTaille"> 100
        
        <br>

        <label for="anim-select">Choose an animation : </label>
        <select name="animations_choice" id="anim_choice">
            <option value="">--Please choose an option--</option>
            <option value="anim_1">Focus in expand</option>
            <option value="anim_2">Scale up</option>
            <option value="anim_3">Scale Down</option>
        </select>
        
        <br>
        
        <label for="anim-select">Changez le texte du logo : </label>
        <input type="text" id="logo_name" name="name" required
         minlength="4" maxlength="40" size="10">

        <br>
        Opacité : 0 <input type="range" id="opacite" val=1 min=0 max=100
                          id="selecteurTaille"> 1

        <br>
        <label for="font-select">Choose a font : </label>
        <select name="fonts_choice" id="fonts_choice">
        <option value="">--Please choose an option--</option>
        <option value="font_1">Birthstone</option>
        <option value="font_2">Montserrat</option>
        <option value="font_3">Roboto</option>
        </select>

        <br>
        <label for="backgorund-select">Choose a background : </label>
        <select name="backgorund_choice" id="background_choice">
        <option value="">--Please choose an option--</option>
        <option value="background_1">Pattern 1</option>
        <option value="background_2">Pattern 2</option>
        </select>
       </div>

       <div id="logo">
        <p id="text-logo">mon logo 2</p>
       </div>
    </div> 
    `;

  constructor() {
    super();
    // On crée le "shadow DOM"
    this.attachShadow({ mode: "open" });

    // récupérer les propriétés/attributs HTML
    this.couleur = this.getAttribute("couleur");
    if (!this.couleur) this.couleur = "black";

    console.log("couleur récupérée = " + this.couleur);

    this.text = this.getAttribute("text");
    this.animationClass = this.getAttribute("animation");
    this.controls = this.getAttribute("controls");
    this.size = this.getAttribute("taille");
  }

  connectedCallback() {
    // ici on instancie l'interface graphique etc.
    this.shadowRoot.innerHTML = `<style>${this.style}</style>` + this.html;

    this.logo = this.shadowRoot.querySelector("#logo");
    this.myControls = this.shadowRoot.querySelector("#MyControls");

    // affecter les valeurs des attributs à la création
    this.logo.style.color = this.couleur;
    this.logo.classList.add(this.animationClass);

    this.declareEcouteurs();

    // On modifie les URLs relatifs
    this.fixRelativeURLs();
  }

  fixRelativeURLs() {
    let images = this.shadowRoot.querySelectorAll("img");
    images.forEach((e) => {
      console.log("dans le foreach");
      let imagePath = e.getAttribute("src");
      e.src = getBaseURL() + "/" + imagePath;
    });

    this.logo.style.background = "url(" + getBaseURL() + "images/flammes.jpg)";
  }

  declareEcouteurs() {
    this.shadowRoot
      .querySelector("#selecteurCouleur")
      .addEventListener("input", (event) => {
        this.changeCouleur(event.target.value);
      });

    this.shadowRoot
      .querySelector("#selecteurTaille")
      .addEventListener("input", (event) => {
        this.changeSize(event.target.value);
      });

    this.shadowRoot
      .querySelector("#opacite")
      .addEventListener("input", (event) => {
        this.changeOpacite(event.target.value);
      });

    this.shadowRoot
      .querySelector("#anim_choice")
      .addEventListener("change", (event) => {
        this.changeAnimation(event.target.value);
      });

    this.shadowRoot
      .querySelector("#background_choice")
      .addEventListener("change", (event) => {
        this.changeBackground(event.target.value);
      });


    this.shadowRoot
      .querySelector("#fonts_choice")
      .addEventListener("change", (event) => {
        this.changeFont(event.target.value);
      });

    this.shadowRoot
      .querySelector("#logo_name")
      .addEventListener("change", (event) => {
        this.changeText(event.target.value);
      });

    this.shadowRoot.querySelector("#show").addEventListener("click", () => {
      if (
        getComputedStyle(this.shadowRoot.querySelector("#MyControls"))
          .display != "none"
      ) {
        this.shadowRoot.querySelector("#MyControls").style.display = "none";
      } else {
        this.shadowRoot.querySelector("#MyControls").style.display = "block";
      }
    });
  }

  // Fonction
  changeBackground(val) {
    if (val == "background_1") {
      this.logo.style.background =
        "url(" + getBaseURL() + "images/background2.png)";
    }
    if (val == "background_2") {
      this.logo.style.background =
        "url(" + getBaseURL() + "images/background-pattern-3.png)";
    }
  }

  changeOpacite(val) {
    console.log(this.logo.style.opacity);
    this.shadowRoot.querySelector("#text-logo").style.opacity = val / 100;
  }
  changeCouleur(val) {
    this.logo.style.color = val;
  }

  changeText(val) {
    this.logo.innerHTML = val;
  }

  changeSize(val) {
    this.logo.style.fontSize = val + "px";
  }

  changeFont(val) {
    if (val == "font_1") {
      this.shadowRoot.querySelector("#logo").style.fontFamily =
        "Birthstone , cursive";
      console.log(this.logo.style.fontFamily);
    }
    if (val == "font_2") {
      this.shadowRoot.querySelector("#logo").style.fontFamily =
        "Montserrat , sans-serif";
      console.log(this.logo.style.fontFamily);
    }
    if (val == "font_3") {
      this.shadowRoot.querySelector("#logo").style.fontFamily =
        "Roboto , sans-serif";
      console.log(this.logo.style.fontFamily);
    }
  }
  changeAnimation(val) {
    if (val == "anim_1") {
      console.log("anim_1");
      this.setAttribute("animation", "focus-in-expand");
      this.shadowRoot.querySelector("#logo").className = "focus-in-expand";
    }
    if (val == "anim_2") {
      console.log("anim_2");
      this.setAttribute("animation", "scale-up-center");
      this.shadowRoot.querySelector("#logo").className = "scale-up-center";
    }
    if (val == "anim_3") {
      console.log("anim_3");
      this.setAttribute("animation", "scale-down-center");
      this.shadowRoot.querySelector("#logo").className = "scale-down-center";
    }
  }
}
customElements.define("my-logo", MyLogo);
