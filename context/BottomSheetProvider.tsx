import BottomSheet from "@/components/ui/BottomSheet";
import { createContext, ReactNode, useContext, useState } from "react";

interface BottomSheetContextType {
  isOpen: boolean;
  open: (content: ReactNode) => void;
  close: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export function useBottomSheet() {
  const ctx = useContext(BottomSheetContext);
  if (!ctx) throw new Error("useBottomSheet must be used inside provider");
  return ctx;
}

interface ProviderProps {
  children: ReactNode;
}

export default function BottomSheetProvider({ children }: ProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);

  const open = (node: ReactNode) => {
    setContent(node);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <BottomSheetContext.Provider value={{ isOpen, open, close }}>
      {children}

      {isOpen && <BottomSheet onClose={close}>{content}</BottomSheet>}
    </BottomSheetContext.Provider>
  );
}
