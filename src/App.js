import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// Produit une représentation textuelle de l’état de la partie,
// chaque lettre non découverte étant représentée par un _underscore_.
// (CSS assurera de l’espacement entre les lettres pour mieux
// visualiser le tout).

// ancienne phrase statique
// const phrase = "anticonstitutionnellement"

// const usedLetters = new Set(["c","t"]);
// function setdisplay(phrase, usedLetters) {  
//   return phrase.replace(/\w/g,    (letter) => (usedLetters.has(letter) ? letter : '_')  )}

// const KDisplay = () => <p className="kdisplay">{setdisplay(phrase,usedLetters)}</p>


const Touche = ({ lettre, appui }) => (
  <button className="touche" onClick={() => appui(lettre)}>
    {lettre}
  </button>)

const Compteur = ({tentatives}) => (
  <p className="compteur">Score : {tentatives}</p>
)

/* Voici les 3 lignes du clavier*/

let Dispo1 = ["a","z","e","r","t","y","u","i","o","p"]
let Dispo2 = ["q","s","d","f","g","h","j","k","l","m"]
let Dispo3 = ["w","x","c","v","b","n"]


class Pendu extends Component {

constructor(props) {
  super(props)
  this.state = { lettrestrouvees: new Set(),guesses: 0,isLoaded: false }
  
}

componentDidMount() {
  fetch("https://random-word-api.herokuapp.com/word")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          phrase: JSON.stringify(result[0])
        });
      })
}



// This method is declared using an arrow function initializer solely
// to guarantee its binding, as we cannot use decorators just yet.
appui = (letter) => {
const trouve = this.state.lettrestrouvees.add(letter)
let point = 0
var essais = 0
console.log ("avant for",point,essais)
  for (const lettre in this.state.phrase)
    {console.log ("aprés for",point,essais,lettre)
    if (this.state.phrase[lettre]===letter) point++}
    console.log ("aprés if",point,essais)
if (point > 0) essais = this.state.guesses+2
else essais = this.state.guesses-1

// const essais = this.state.guesses+1
this.setState({ lettrestrouvees:trouve,guesses:essais })

// Protocole de test
// console.log("j'appuie sur ",this.state.lettrestrouvees)
}

xsetdisplay = (phrase, usedLetters) => {  
  return phrase.replace(/\w/g,    (letter) => (usedLetters.has(letter) ? letter : '_')  )}

// on "nettoie" le clavier en enlevant les lettres déja trouvées
componentWillUpdate() {
  let axe = this.state.lettrestrouvees;
  console.log("machin",axe,"machineine");
  for (const item of axe) {
    
    // for (const place of Dispo1) {
    for (let index = 0, len = Dispo1.length; index < len; ++index) {

      if (Dispo1[index] === item) 
      {
        Dispo1.splice(index, 1);
      }

    }

    for (let index = 0, len = Dispo2.length; index < len; ++index) {

      if (Dispo2[index] === item) 
      {
        Dispo2.splice(index, 1);
      }

    }

    for (let index = 0, len = Dispo3.length; index < len; ++index) {

      if (Dispo3[index] === item) 
      {
        Dispo3.splice(index, 1);
      }

    }

  }

 
}



    render () {
      // console.log("premier",this.state.phrase)
      if (!this.state.isLoaded) {
        return <div>Chargement…</div>;
      } else {
            const { lettrestrouvees,guesses,phrase } = this.state;
            // console.log("second",phrase)
            // xsetdisplay = (phrase, usedLetters) => {  
            //     return phrase.replace(/\w/g,    (letter) => (usedLetters.has(letter) ? letter : '_')  )}
      return (
          <div>
              <p className="kdisplay">{this.xsetdisplay(phrase,lettrestrouvees)}</p>
              <Compteur tentatives={guesses} />
              <p>1 lettre trouvé = 2 points<br/>1 mauvaise réponse = -1 point</p>
              <p className="clavier">

              {Dispo1.map(
                (letter) => (<Touche lettre={`${letter}`} appui={this.appui} />)
                )}
                  
                  <br/>

                  {Dispo2.map((letter) => (
                    <Touche lettre={`${letter}`} appui={this.appui} />
                  ))}

                  <br/>

                  {Dispo3.map((letter) => (
                    <Touche lettre={`${letter}`} appui={this.appui} />
                  ))}

              </p>
          </div>
              )
                  }
    }

}

function App() {


  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          La machine reprendra ses esprits.
        </p>
        <Pendu />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
