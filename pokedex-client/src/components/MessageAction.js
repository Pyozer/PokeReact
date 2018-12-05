import React from 'react';
import Message from './Message';

const MessageAction = ({ message = "", onAction, buttonText = "Réessayer" }) => {
    return (
        <Message>
            <div className="flex">
                <div className="flex-grow">
                    {message}
                </div>
                {onAction ? (
                    <div className="scaleEffect pointer white-text" href="#" onClick={onAction}>
                        <strong>{buttonText}</strong>
                    </div>
                ) : <></>}
            </div>
        </Message>
    );
};

export default MessageAction;