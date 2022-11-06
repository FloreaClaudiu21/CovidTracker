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
import Loading from "./loading";

const App = () => {
	const [loading, setLoading] = useState(true);
	const [countries, setCountries] = useState([]);
	useEffect(() => {
		GET_COUNTRIES().then((v) => {
			const sorted_list = v.sort(function (a, b) {
				let ca = a.data.Country.charCodeAt(0);
				let cb = b.data.Country.charCodeAt(0);
				//////////////////////////////////////
				if (ca > cb) return 1;
				if (ca < cb) return -1;
				return 0;
			});
			setLoading(false);
			setCountries(sorted_list);
		});
		return;
	}, []);
	if (loading) return <Loading />;
	return (
		<Router>
			<Routes>
				<Route
					index
					element={<Home countries={countries} />}
				/>
				<Route
					path="/:id"
					element={<Country countries={countries} />}
				/>
				<Route
					path="*"
					element={<Navigate to="/" />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
