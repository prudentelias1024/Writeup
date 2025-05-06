import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useDarkSide() {
		
	const { user} = useSelector(state => state)
	
	const [theme, setTheme] = useState();

	let colorTheme = theme === "dark" ? "light" : "dark";

	useEffect(() => {
			if(user !== null){
				setTheme(user.displaySettings)
			}
			
			const root = window.document.documentElement;
			if(root !== undefined){
				root.classList.add(theme);
				root.classList.remove(colorTheme);
			}
		
		
	}, [user]);

	return [colorTheme, setTheme];
}