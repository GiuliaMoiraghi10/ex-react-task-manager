import { createPortal } from 'react-dom'

export default function Modal({ title, content, show, onClose, onConfirm, confirmText = 'Conferma' }) {

    if (!show) return null

    // con createPortal rendo la modale indipendente dal flusso di rendering
    return createPortal(
        <div className='modal-overlay'>
            <div className='modal'>
                <h2>{title}</h2>
                {content}
                <div className='modal-button'>
                    <button onClick={onClose}>Annulla</button>
                    <button onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body
    )
}