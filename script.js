const keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"]
const obje = [
  {
    key: 'Q',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    id: 'Heater-1'
  },
  {
    key: 'W',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    id: 'Heater-2'
  },
  {
    key: 'E',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    id: 'Heater-3'
  },
  {
    key: 'A',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    id: 'Heater-4'
  },
  {
    key: 'S',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    id: 'Heater-6'
  },
  {
    key: 'D',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    id: 'Dsc OH!'
  },
  {
    key: 'Z',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    id: 'Kick N hat'
  },
  {
    key: 'X',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    id: 'Kick 1'

  },
  {
    key: 'C',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    id: 'Kick 2'
  }
]

const App = (props) => (
  <div id="drum-machine">
    <div id="container" className="container">
      {obje.map((unit, idx) => (
        <Pad text={unit.key} key={idx} audio={unit.sound} id={unit.id}/>
      ))}
      <div id="display" className="display"><p>Drum Sounds</p></div>
    </div>
  </div>
)

class Pad extends React.Component { 
  constructor (props){
    super(props);
    this.audio = React.createRef();
  }
  playSound = () => {
    this.audio.current.play();
    const parent = this.audio.current.parentNode
    const display = parent.parentNode
    
    display.querySelector('p').innerText = parent.id
  }
  render (){
    const { text, audio, id } = this.props;
    

    return(
      <div className = "drum-pad" onClick={this.playSound}  id={id} text={text}>
        {text}
        <audio ref={this.audio} src={audio} className="clip" id={text}/>
      </div>
    );
  }
}

document.addEventListener('keydown', (e) =>{
  const key = e.key.toUpperCase()
  const audio = document.getElementById(key)
  
  if (audio) {
    audio.currentTime = 0;
    audio.pause()
    
    const par = audio.parentNode
    
    par.classList.add('active')
    audio.play()

    audio.addEventListener('ended', () => {
      par.classList.remove('active');
    })

    const display = par.parentNode
    display.querySelector('p').innerText = par.id
  }
})

ReactDOM.render(<App />, document.getElementById('root'))