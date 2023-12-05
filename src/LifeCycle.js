import React, { useEffect, useState } from 'react';

export default function LifeCycle() {
	const UnmountTest = () => {
		useEffect(() => {
			console.log('mount');

			return () => {
				console.log('unmount');
			};
		}, []);
		return <div>unmountTest Component</div>;
	};

	const [isVisible, setIsVisible] = useState(false);
	const toggle = () => {
		setIsVisible(!isVisible);
	};

	return (
		<div style={{ padding: 20, margin: 20 }}>
			<button onClick={toggle}>ON/OFF</button>
			{isVisible && <UnmountTest />}
		</div>
	);
}
