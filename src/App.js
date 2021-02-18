import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './App.css';
import Navbar from "./components/navbar";
import logo from "./logo.png";



firebase.initializeApp({
  apiKey: "AIzaSyC7ihYjbUa9eoauM2Axz-1h2rT_FyRPHTI",
  authDomain: "bn-km-counter.firebaseapp.com",
  projectId: "bn-km-counter",
  storageBucket: "bn-km-counter.appspot.com",
  messagingSenderId: "926742270152",
  appId: "1:926742270152:web:850b5543dfb9933197d5fd"
})



const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [whatToShow, setWhatToShow] = useState(<Running/>)
  const [user] = useAuthState(auth)
  const showRunning = () =>{
    setWhatToShow(<Running/>)
  }
  const showWalking = () => {
    setWhatToShow(<Walking/>)
  }
  const showCycling = () => {
    setWhatToShow(<Cycling/>)
  }
  const showOther = () => {
    setWhatToShow(<Other/>)
  }



  function Running() {
    const dataRef = firestore.collection('data');
    const [km, setKm ] = useState("");
    const [time, setTime ] = useState("");
    const [weather, setWeather ] = useState("");
    const [feel, setFeel ] = useState("");




    const sendMessage = async(e) => {
      e.preventDefault();
      const {uid, photoURL} = auth.currentUser;

      await dataRef.add({
        text: km,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
      setKm("")
    }
    return(
      <>

    <form onSubmit={sendMessage}>
      <input value={km} placeholder="Mennyit futottál?" onChange={(event) => setKm(event.target.value)}/>
      <input value={km} placeholder="Mennyi idő alatt?" onChange={(event) => setTime(event.target.value)}/>
      <input value={km} placeholder="Milyen volt az idő?" onChange={(event) => setWeather(event.target.value)}/>
      <input value={km} placeholder="Hogy érzed magad? " onChange={(event) => setFeel(event.target.value)}/>
      <button type="submit" disabled={!km}>Submit</button>

    </form>


  {SignOut()}
      </>
    )
  }

  function Walking () {
    return (
      <h1>Walking</h1>
    )
  }

  function Cycling () {
    return (
      <h1>Cycling</h1>
    )
  }

  function Other () {
    return (
      <h1>Other</h1>
    )
  }

  return (
    <div className="App">
      {user? <Navbar currentItem={whatToShow} other={showOther} walking={showWalking} cycling={showCycling} running={showRunning}/>: null}
      <section>
        {user ? whatToShow : <SignIn/>}
      </section>
    </div>
  );
}



function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)


  }
  return (
    <div className="signInContainer">
            <img src={logo}/>
      <h1>Company KM tracker, be fit, be kilóméter!</h1>
    <button className="buttonStyle" onClick={signInWithGoogle}>Sign in with your Google account</button>
    </div>
  )
}

function SignOut() {

  return auth.currentUser && (
    <button onClick={() => auth.signOut()}> Sign Out</button>
  )

}







function AllInformation() {
const dataRef = firestore.collection('data')
const query = dataRef.orderBy('createdAt').limit(25)
const [messages] = useCollectionData(query, {idField: 'id'});
return(
  <>
  <div>
    {messages && messages.map(msg => <DataInformation message={msg} key={msg.id}/>)}
  </div>
  </>
)

}
function DataInformation(props){
  const {text,uid} = props.message

  return <p>{text}</p>
}


export default App;
