//const Hello = (props) => {
    
// Tässä viety muuttujat suoraan alkuu, joten niitä voidaan käyttää komponenttisunktion sisällä suoraan
const Hello = ({ name, age }) => {
    //Määritellään propsit muuttujiin, jotta niitä on helppo käyttää
    //const name = props.name
    //const age = props.age

    //DESTRUKTUROINNIN avulla kerätään olion oliomuuttujien arvot suoraan omiin yksittäisiin muuttujiin
    //const { name, age } = props
    // Ylempänä viedään tämä vielä pidemmälle suoraan komponenttifunktioon

    // Vaihtoehtoinen tapa määritellä yhden lauseen funktio
    const bornYear = () => new Date().getFullYear() - age

    // Pidempi olisi;
    //const bornYear = () => {
    //    return new Date().getFullYear() - age
    //  }

    return (
      <div>
        <p>
          Hello {props.name}, you are {props.age} years old
        </p>
      </div>
    )
  }
  
  const App = () => {
    const nimi = 'Pekka'
    const ika = 10
  
    return (
      <div>
        <h1>Greetings</h1>
        <Hello name="Maya" age={26 + 10} />
        <Hello name={nimi} age={ika} />
      </div>
    )
  }