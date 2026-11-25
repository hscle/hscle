export const THEME_KEY = "hscle:theme";

/** Runs before the page paints so a saved light/dark choice never flashes. */
export const themeScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
