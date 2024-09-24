import { User } from "@/types/user";
import { createContext, useContext, useState } from "react";

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Context = createContext<AppContextType | undefined>(undefined);

interface AppContextProps {
  children: React.ReactNode;
}

export const AppContext = ({ children }: AppContextProps) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de um AppContext provider");
  }
  return context;
};
