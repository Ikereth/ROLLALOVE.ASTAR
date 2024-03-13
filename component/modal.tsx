import React, { useState } from "react";
import styles from "../styles/Modal.module.css";

interface MessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSendMessage: (message: string) => void;
    name: string;
}

const Modal: React.FC<MessageModalProps> = ({
    isOpen,
    onClose,
    onSendMessage,
    name,
}) => {
    const [message, setMessage] = useState<string>("");
    if (!isOpen) return null;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSendMessage(message);
        setMessage("");
        onClose();
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={`Escribele un mensaje bonito a ${name}  😉`}
                        required
                    ></textarea>
                    <button type="submit">Enviar Mensaje</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
