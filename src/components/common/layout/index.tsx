import React from 'react';

interface Props {
	children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
	return (
		<>
			<header></header>
			<main>{children}</main>
			<footer></footer>
		</>
	);
};
