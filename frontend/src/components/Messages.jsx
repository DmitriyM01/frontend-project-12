import { useSelector } from "react-redux";

const Messages = ({ currentMessages }) => {
    const { entities, ids } = currentMessages;

    return (
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
            {ids.map((id) => {
                const message = entities[id];

                return (
                    <div key={id} className="text-break mb-2">
                        <b>{message.username}</b>: {message.body}
                    </div>
                )
            })}
        </div>
    )
}

export default Messages;