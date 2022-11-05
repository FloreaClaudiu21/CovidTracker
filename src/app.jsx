import { useEffect, useState } from "react";
import { GET_COUNTRIES } from "./helper";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Home from "./home";
import Country from "./country";

const App = () => {
	const [countries, setCountries] = useState([]);
	useEffect(() => {
		GET_COUNTRIES().then((v) => setCountries(v));
		return;
	}, []);
	return (
		<Router>
			<Routes>
				<Route
					index
					element={<Home countries={countries} />}
				/>
				<Route
					path="*"
					element={<Navigate to="/" />}
				/>
				<Route
					path="/:id"
					element={<Country countries={countries} />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
