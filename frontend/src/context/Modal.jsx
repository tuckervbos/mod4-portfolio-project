import { useRef, useState, useContext, createContext } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = createContext();

export function ModalProvider({ children }) {
	const modalRef = useRef();
	const [modalContent, setModalContent] = useState(null);
	const [onModalClose, setOnModalClose] = useState(null);

	const closeModal = () => {
		setModalContent(null); // clear modal contents
		// if callback function truthy, call callback function and reset it to null:
		if (typeof onModalClose === "function") {
			setOnModalClose(null);
			onModalClose();
		}
	};

	const contextValue = {
		modalRef, // reference to modal div
		modalContent, // react component to render inside modal
		setModalContent, // func to set react component to render inside modal
		setOnModalClose, // func to set callback func to be called when modal is closing
		closeModal, // func to close modal
	};

	return (
		<>
			<ModalContext.Provider value={contextValue}>
				{children}
			</ModalContext.Provider>
			<div ref={modalRef} />
		</>
	);
}

export function Modal() {
	const { modalRef, modalContent, closeModal } = useContext(ModalContext);
	// if no div referenced by modelRef or modalContent is not truthy, render nothing:
	if (!modalRef || !modalRef.current || !modalContent) return null;
	// render this component to the div referenced by modalRef
	return ReactDOM.createPortal(
		<div id="modal">
			<div id="modal-background" onClick={closeModal} />
			<div id="modal-content">{modalContent}</div>
		</div>,
		modalRef.current
	);
}

export const useModal = () => useContext(ModalContext);
