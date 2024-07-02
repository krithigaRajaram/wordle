import { useState } from "react"
const useWordle =(solution)=>{
    const [turn,setTurn]=useState(0)
    const [currentGuess,setCurrentGuess] = useState('')
    const [guesses,setGuesses]= useState([...Array(6)])
    const [history,setHistory]=useState([])
    const [correct,setCorrect]=useState(false)
    const[usedkeys,setUsedkeys] =useState({})

    const formatGuess =()=>{
        let solutionArray =[...solution]
        let GuessArray=[...currentGuess].map((l)=>{
            return {key:l,color:'grey'}

        })
        //green
        GuessArray.forEach((l,i) => {
        if(solution[i]===l.key){
            GuessArray[i].color='green';
            solutionArray[i]=null

        }
        
    })
    //yellow
    GuessArray.forEach((l,i)=>{
        if(solutionArray.includes(l.key) && l.color!=='green')
            {
                GuessArray[i].color='yellow'
                solutionArray[solutionArray.indexOf(l.key)]=null
            }
    })
    return GuessArray
}

    const addNewGuess = (guess)=>{
    if( currentGuess === solution)
        {
            setCorrect(true)
        }
    setGuesses(prevGuesses => {
                let newGuesses = [...prevGuesses]
                newGuesses[turn] = guess
                return newGuesses
              })

    setHistory(prevHistory => {
            return [...prevHistory, currentGuess]
        })
    setTurn(prevTurn=>{
          return prevTurn + 1  
        })
    setUsedkeys(prevUsedKeys=>{
        let newKeys = {...prevUsedKeys}
        guess.forEach(l=>{
            const currentColor = newKeys[l.key]
            if(l.color==='green')
                {
                    newKeys[l.key]='green'
                    return
                }
                if(l.color==='yellow' && currentColor!=='green')
                    {
                        newKeys[l.key]='yellow'
                        return
                    }
                if(l.color==='grey' && currentColor!=='yellow' && currentColor!=='green')
                        {
                            newKeys[l.key]='grey'
                            return
                        }

        })
        return newKeys
    })
    setCurrentGuess('')

    }
    const handleKeyUp = ({key}) =>{
        if(key==='Enter')
        {
            if(turn>5)
                {
                    console.log("used all your guesses")
                    return
                }
            if(history.includes(currentGuess))
                {
                    console.log("Guess word repeated again")
                    return
                }
            if(currentGuess.length !== 5)
                {
                    console.log("Guess word must be 5 chars")
                    return
                }
                const guess = formatGuess()
                addNewGuess(guess)
        }
        if(key==='Backspace'){
            setCurrentGuess(prev=>prev.slice(0,-1))
            return
        }
        if(/^[A-Za-z]$/.test(key)){
            if(currentGuess.length<5)
                {
                    setCurrentGuess(prev=>prev+key)
                }
        }
    }
    return { turn,currentGuess,guesses,correct,handleKeyUp,usedkeys}

}
export default useWordle