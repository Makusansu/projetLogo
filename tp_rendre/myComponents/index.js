const getBaseURL = () => {
	return new URL('.', import.meta.url);
};

class MyLogo extends HTMLElement {
    style = `
    @import url('https://fonts.googleapis.com/css2?family=Grey+Qo&display=swap');

    #logo {
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
    <div id="logo" >mon logo 2
    <!-- <img src="./images/flammes.jpg" width=200> -->
    </div>
        <br>
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
    `;

    constructor() {
        super();
        // On crée le "shadow DOM"
        this.attachShadow({ mode: "open" });

        // récupérer les propriétés/attributs HTML
        this.couleur = this.getAttribute("couleur");
        if(!this.couleur) this.couleur = "black";

        console.log("couleur récupérée = " + this.couleur);

        this.text = this.getAttribute("text");
        this.animationClass = this.getAttribute("animation");
        this.controls = this.getAttribute("controls");
        this.size = this.getAttribute("taille");
    }

    connectedCallback() {
        // ici on instancie l'interface graphique etc.
        this.shadowRoot.innerHTML = `<style>${this.style}</style>`
            + this.html;

        this.logo = this.shadowRoot.querySelector("#logo");
        // affecter les valeurs des attributs à la création
        this.logo.style.color = this.couleur;
        this.logo.classList.add(this.animationClass);
        this.declareEcouteurs();

        // On modifie les URLs relatifs
        this.fixRelativeURLs();
    }

    fixRelativeURLs() {
        let images = this.shadowRoot.querySelectorAll('img');
        images.forEach((e) => {
          console.log("dans le foreach")
          let imagePath = e.getAttribute('src');
            e.src = getBaseURL() + '/' + imagePath;
        });
    
        //console.log(getBaseURL() +  "images/flammes.jpg")
        this.logo.style.background = "url(" + getBaseURL() + "images/flammes.jpg)";
      }

    declareEcouteurs() {
        this.shadowRoot.querySelector("#selecteurCouleur")
            .addEventListener("input", (event) => {
                this.changeCouleur(event.target.value);
            });

        this.shadowRoot.querySelector("#selecteurTaille")
            .addEventListener("input", (event) => {
                this.changeSize(event.target.value);
            });

        this.shadowRoot
            .querySelector("select")
            .addEventListener("change", (event) => {
              this.changeAnimation(event.target.value);
            });

        this.shadowRoot.querySelector("#logo_name")
            .addEventListener("change", (event) => {
              this.changeText(event.target.value);
            });
    }

    // Fonction
    changeCouleur(val) {
        this.logo.style.color = val;
    }

    changeText(val){
      this.logo.innerHTML = val;
    }

    changeSize(val) {
        this.logo.style.fontSize = val + "px";
    }

    changeAnimation(val) {
      if (val == "anim_1") {
        console.log("anim_1");
        this.setAttribute("animation","focus-in-expand")
        this.shadowRoot
        .querySelector("#logo").className = "focus-in-expand"; 
        
      }
      if (val == "anim_2") {
        console.log("anim_2");
        this.setAttribute("animation","scale-up-center")
        this.shadowRoot
        .querySelector("#logo").className = "scale-up-center";
  
      }
      if (val == "anim_3") {
          console.log("anim_3");
          this.setAttribute("animation","scale-down-center")
          this.shadowRoot
          .querySelector("#logo").className = "scale-down-center";
    
        }
    }
}

customElements.define("my-logo", MyLogo);
