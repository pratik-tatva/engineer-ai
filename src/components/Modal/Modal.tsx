import React from 'react';

// Third-Party-Components
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

// Icons
import CloseIcon from '@material-ui/icons/Close';

// Styles
import { useModalStyles } from './Modal.styles';

// Interfaces
import type { ModalProps } from './Modal.interface';

export default function CustomModal({
	isOpen,
	children,
	onClose,
}: ModalProps): JSX.Element {
	// Styles
	const classes = useModalStyles();

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			className={classes.modal}
			open={isOpen}
			onClose={onClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={isOpen}>
				<div className={classes.modalContainer}>
					<Button
						data-testid="modal-close-button"
						className={classes.modalCloseButton}
						onClick={onClose}
					>
						<CloseIcon />
					</Button>
					{children}
				</div>
			</Fade>
		</Modal>
	);
}
