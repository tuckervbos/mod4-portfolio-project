import { useModal } from "../../context/Modal";

function OpenModalButton({
	modalComponent, // component to render inside modal
	buttonText, // text of the button that opens the modal
	onButtonClick, // optional: cbfunc that will be called once button that opens modal is clicked
	onModalClose, // optional: cbfunc that'll be called once modal is closed
}) {
	const { setModalContent, setOnModalClose } = useModal();

	const onClick = () => {
		if (onModalClose) setOnModalClose(onModalClose);
		setModalContent(modalComponent);
		if (typeof onButtonClick === "function") onButtonClick();
	};

	return <button onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;
