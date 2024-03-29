import { createContext, useState } from 'react'

const MessageContext = createContext()

function MessageProviderWrapper(props) {

    const [showMessage, setShowMessage] = useState({
        show: false,
        title: 'Mensaje',
        text: 'Texto del mensaje'
    })

    return (

        <MessageContext.Provider value={{ setShowMessage, showMessage }}>
            {props.children}
        </MessageContext.Provider>
    )
}

export { MessageContext, MessageProviderWrapper }