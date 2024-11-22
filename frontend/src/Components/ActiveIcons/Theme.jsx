import { useLayoutEffect } from "react";
import { useTheme } from '../Hook/ThemeContext'; // Adjust path as needed

// Icon
import ThemeIcon from "../../asset/ThemeIcon";

export default function Theme() {
  const { theme, setTheme } = useTheme();

  useLayoutEffect(() => {
    document.querySelector("body").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="cursor-pointer" onClick={() => {setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))}}>
      <ThemeIcon theme={theme} fillColor="var(--white)" />
    </div>
  );
}
