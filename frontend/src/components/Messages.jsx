import { useSelector } from "react-redux";

const Messages = ({ currentMessages }) => {
    // const messages = useSelector((state) => {
    //     return state.messagesReducer
    // })

    // const currentMessages = {
    //     entities: {},
    //     ids: []
    // };
    // console.log(messages.entities)

    // messages.ids.forEach((id) => {
    //     if (messages.entities[id].channelId.id === currentChannel.id) {
    //         currentMessages.ids = [...currentMessages.ids, id];
    //         currentMessages.entities[id] = messages.entities[id]
    //     }
    // })

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