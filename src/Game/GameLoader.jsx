/** @format */

import { useState, useEffect, useRef } from 'react';
import './GameLoader.css';

import Unity, { UnityContext } from 'react-unity-webgl';

function GameLoader() {
	const [isLoaded, setLoaded] = useState(false);
	const loadingBar = useRef(null);
	const unityContext = new UnityContext({
		loaderUrl: '../Build/WebBuilds.loader.js',
		dataUrl: '../Build/WebBuilds.data.unityweb',
		frameworkUrl: '../Build/WebBuilds.framework.js.unityweb',
		codeUrl: '../Build/WebBuilds.wasm.unityweb',
	});

	unityContext.on('progress', (progression) => {
		loadingBar.current.style.width = 100 * progression + '%';
	});
	useEffect(() => {
		const element = document.getElementById('unity-game');
		if (isLoaded) element.classList.remove('hide');
	}, [isLoaded]);
	unityContext.on('loaded', () => {
		setLoaded(true);
	});

	return (
		<>
			<div className='container'>
				{isLoaded === false && (
					<div className='loading-overlay'>
						<h1>
							<span className='let1'>l</span>
							<span className='let2'>o</span>
							<span className='let3'>a</span>
							<span className='let4'>d</span>
							<span className='let5'>i</span>
							<span className='let6'>n</span>
							<span className='let7'>g</span>
						</h1>

						<div id='loading-bar-container'>
							<div ref={loadingBar} id='loading-bar'></div>
						</div>
					</div>
				)}
				<>
					<div id='unity-game' className='unity'>
						<Unity className='unity-con' unityContext={unityContext} />
					</div>
				</>
			</div>
		</>
	);
}

export default GameLoader;
