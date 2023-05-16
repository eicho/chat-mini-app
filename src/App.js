import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [user, setUser] = useState(null);
  const handleSignIn = (name) => {
    setUser({ id: uuidv4(), name });
  };

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <header className="header">
        <h1 className="logo">
          <i className="fab fa-facebook-messenger"></i>
          <span>Chat App</span>
        </h1>
        {user && <SignOut onSignOut={handleSignOut} />}
      </header>

      <section>
        {user ? <ChatRoom user={user} /> : <SignIn onSignIn={handleSignIn} />}
      </section>
    </div>
  );
}

function SignIn({ onSignIn }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
      onSignIn(name);
    }
  };

  return (
    <form className="sign-in" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button type="submit" className="btn">
        Sign in
      </button>
    </form>
  );
}

function SignOut({ onSignOut }) {
  return (
    <button className="btn sign-out" onClick={onSignOut}>
      Sign Out
    </button>
  );
}

export default App;
