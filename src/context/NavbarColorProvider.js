import { createContext, useContext, useState } from "react";

// Crea el contexto
const NavbarColorContext = createContext();

// Hook para usar el contexto
export const useNavbarColor = () => useContext(NavbarColorContext);

// Proveedor del contexto
export const NavbarColorProvider = ({ children }) => {
  const [navbarColor, setNavbarColor] = useState("defaultColor");

  return <NavbarColorContext.Provider value={{ navbarColor, setNavbarColor }}>{children}</NavbarColorContext.Provider>;
};
