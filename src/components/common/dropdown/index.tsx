import React, { useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FiChevronDown } from 'react-icons/fi';

interface Props {
	children: React.ReactNode;
	headerName: string;
	wrapperClassName: string;
}

export const Dropdown = ({ wrapperClassName, headerName, children }: Props) => {
	const [isOpen, setIsOpen] = useState(false);

	const wrapperRef = useRef<HTMLDivElement>(null);

	const toggle = () => setIsOpen((prev) => !prev);

	// close dropdown if clicked outside.
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside, true);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside, true);
		};
	}, [setIsOpen]);

	return (
		<div ref={wrapperRef} className="relative">
			<button
				onClick={toggle}
				className={twMerge('relative flex items-center justify-between gap-x-2', wrapperClassName)}
			>
				{headerName} <FiChevronDown className={twMerge(' transition-all duration-200', isOpen && 'rotate-180')} />
			</button>
			<div
				className={twMerge(
					'absolute top-full right-0 w-full hidden rounded-lg border border-gray-200',
					isOpen && 'flex'
				)}
			>
				{children}
			</div>
		</div>
	);
};
