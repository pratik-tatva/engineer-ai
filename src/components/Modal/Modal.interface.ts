export interface ModalProps {
	isOpen: boolean;
	children: JSX.Element;
	onClose: () => void;
}
