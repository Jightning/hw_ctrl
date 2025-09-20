import React from 'react';

interface CardProps {
	children: React.ReactNode;
	onMouseEnter?: () => void,
	onMouseLeave?: () => void,
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void,
	className?: string;
}

const Card = ({ children, onMouseEnter, onMouseLeave, onClick, className = '' }: CardProps) => {
	return (
		<div className={`bg-background-sub rounded-lg shadow-sm border border-slate-200 ${className}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
			{children}
		</div>
	);
};

export default Card;
