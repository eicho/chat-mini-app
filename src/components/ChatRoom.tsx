import { FormEvent, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { DocumentData, Query } from "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import firebase from "../firebase";
import ChatMessage from "./ChatMessage";
import "./ChatRoom.css";
import { UserType } from "src/types/user";

const firestore = firebase.firestore();

interface ChatRoomProps {
  user: UserType;
}

export default function ChatRoom({ user }: ChatRoomProps) {
  const dummy = useRef<HTMLSpanElement>(null);

  const messagesRef = firestore.collection("messages");
  const query = messagesRef
    .orderBy("createdAt")
    .limit(25) as unknown as Query<DocumentData>;

  const [messages] = useCollectionData<DocumentData>(query, {
    initialValue: [],
  });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValue.trim() !== "") {
      const message = {
        id: uuidv4(),
        text: formValue,
        createdAt: new Date(),
        user: user,
      };

      await messagesRef.add(message);
      setFormValue("");
      dummy.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <main className="chat-container">
        {messages?.map((message) => {
          return (
            <ChatMessage
              key={message.id}
              message={message}
              currentUser={user}
            />
          );
        })}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage} className="chat-form">
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type a message"
          className="chat-input"
        />
        <button type="submit" disabled={!formValue} className="btn send-btn">
          Send
        </button>
      </form>
    </>
  );
}
