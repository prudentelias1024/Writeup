import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useDarkSide() {
	const {darkMode, lightMode, user} = useSelector(state => state)


	const [theme, setTheme] = useState(localStorage.theme);
	const colorTheme = lightMode === true ? "light" : "dark";

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove(colorTheme);
		root.classList.add(theme);

		
	}, [theme, colorTheme]);

	return [colorTheme, setTheme];
}