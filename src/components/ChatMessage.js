import { FaUser } from "react-icons/fa";
import "./ChatMessage.css";

export default function ChatMessage({ message, currentUser }) {
  const { text, user } = message;
  const isCurrentUser = user.id === currentUser.id;

  return (
    <div className={`message ${isCurrentUser ? "sent" : "received"}`}>
      {!isCurrentUser && <FaUser className="message-icon" />}
      <div className="message-content">
        {!isCurrentUser && (
          <span
            className={`message-sender ${isCurrentUser ? "current-user" : ""}`}
          >
            {user.name}
          </span>
        )}
        <p className="message-text">{text}</p>
      </div>
    </div>
  );
}
