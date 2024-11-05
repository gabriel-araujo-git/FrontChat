import React, { useEffect, useRef } from 'react';
import './styles.css';

export const AutoResizingTextarea = ({ value, onChange, ...props }) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = '15px'; // Define uma altura inicial
            textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`; // Limita a altura máxima
        }
    }, [value]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onChange(''); // Limpa o texto após o envio
            // Aqui você pode chamar a função de envio da mensagem
        }
    };

    return (
        <div style={{ position: 'relative', height: 'auto' }}>
            <textarea
                className="message-input"
                ref={textareaRef}
                value={value}
                onChange={e => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                {...props}
            />
        </div>
    );
};
