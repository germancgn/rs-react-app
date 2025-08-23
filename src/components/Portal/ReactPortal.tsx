import { ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ReactPortalProps = {
  children: ReactNode;
  wrapperId: string;
};

export default function ReactPortal({ children, wrapperId }: ReactPortalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLDivElement | null>(
    null
  );

  useLayoutEffect(() => {
    let wrapper = document.getElementById(wrapperId);
    let wasCreated = false;
    if (!wrapper) {
      wasCreated = true;
      wrapper = document.createElement('div');
      wrapper.setAttribute('id', wrapperId);
      document.body.appendChild(wrapper);
    }
    setWrapperElement(wrapper as HTMLDivElement);

    return () => {
      if (wasCreated && wrapper.parentNode) {
        wrapper.parentNode.removeChild(wrapper);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}
