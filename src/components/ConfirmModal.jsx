import Modal from './Modal';
import Button from './Button';

export default function ConfirmModal({ title, message, confirmLabel = 'Delete', onConfirm, onClose }) {
  return (
    <Modal title={title} onClose={onClose}>
      <p className="mb-5 text-sm text-slate-300">{message}</p>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button
          variant="danger"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}