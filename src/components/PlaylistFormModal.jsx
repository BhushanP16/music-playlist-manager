import { useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';

export default function PlaylistFormModal({ title, submitLabel, initialName = '', onSubmit, onClose }) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = onSubmit(name); // returns error text or null
    if (message) setError(message);
    else onClose();
  };

  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Playlist name"
          placeholder="e.g. Road Trip"
          value={name}
          maxLength={40}
          autoFocus
          error={error}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
        />
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit">{submitLabel}</Button>
        </div>
      </form>
    </Modal>
  );
}