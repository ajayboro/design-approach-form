import React from "react";
import "./App.css";
import { RecoilRoot } from "recoil";
import DesignApproachForm from "./DesignApproachForm/index";

function App() {
	return (
		<RecoilRoot>
			<DesignApproachForm />
		</RecoilRoot>
	);
}

export default App;
