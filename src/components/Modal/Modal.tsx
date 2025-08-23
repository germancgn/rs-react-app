'use client';

import React, { useEffect, useRef } from 'react';
import ReactPortal from '../Portal/ReactPortal';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
};

function Modal({ children, isOpen, handleClose }: ModalProps) {
  if (!isOpen) return null;
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) =>
      e.key === 'Escape' ? handleClose() : null;
    document.body.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscape);
    };
  }, [handleClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <div className="modal">
        <div ref={contentRef} className="modal-content custom-scrollbar">
          {children}
        </div>
      </div>
    </ReactPortal>
  );
}
export default Modal;
