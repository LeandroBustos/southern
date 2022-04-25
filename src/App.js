import React from "react";

import "./App.css";
import NasaModule from "./components/modules/nasa/Main";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>NASA Api</h1>
			</header>
			<div className="App-body">
				<NasaModule></NasaModule>
			</div>
		</div>
	);
}

export default App;
