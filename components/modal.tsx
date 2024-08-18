import React from 'react';
import { Popover } from '@headlessui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export const RetroModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => (
  <Popover
    className={`fixed inset-0 bg-mapOverlay ${isOpen ? 'block' : 'hidden'}`}
    role='dialog'
    aria-modal='true'
    aria-labelledby='modal-title'
  >
    <div className='absolute inset-0 bg-retroGreen border-4 border-retroBrown p-6 rounded-retro shadow-retro flex items-center justify-center'>
      <div className='relative bg-retroYellow border-4 border-retroBrown p-6 rounded-retro shadow-retro'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-retroBrown focus:outline-none'
          aria-label='Close modal'
        >
          X
        </button>
        <div id='modal-title' className='sr-only'>
          {title}
        </div>
        {children}
      </div>
    </div>
  </Popover>
);
