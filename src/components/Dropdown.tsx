import { useEffect, useRef, useState, type ReactNode } from 'react';

type DropdownProps = {
  className: string;
  button: ReactNode;
  children: ReactNode;
  closeOnSelect: boolean;
};

export default function Dropdown({
  className,
  button,
  children,
  closeOnSelect = true,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)}>{button}</div>
      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 z-10 max-h-64 w-fit overflow-y-auto rounded-md bg-gray-700"
          onClick={() => closeOnSelect && setIsOpen(false)}
        >
          <ul className="flex flex-col p-2">{children}</ul>
        </div>
      )}
    </div>
  );
}
