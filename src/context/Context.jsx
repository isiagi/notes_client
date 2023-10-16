/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ModalContext = createContext();

export function ContextProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const value = {
    isModalOpen,
    setIsModalOpen,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
