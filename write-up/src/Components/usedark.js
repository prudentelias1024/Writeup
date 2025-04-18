import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useDarkSide() {
	const {darkMode, lightMode, user} = useSelector(state => state)

	const userSettings = user == null ? 'light' : user.displaySettings
	console.log(userSettings)
	const [theme, setTheme] = useState(userSettings);
	const colorTheme = darkMode === true ? "light" : "dark";

	useEffect(() => {
		const root = window.document.documentElement;
		if(root !== undefined){

			root.classList.remove(colorTheme);
			root.classList.add(theme);
		}

		
	}, [theme, colorTheme]);

	return [colorTheme, setTheme];
}