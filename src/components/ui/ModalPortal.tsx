import { createPortal } from "react-dom";

export default function ModalPortal({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window === "undefined") return null;

  const rootNode = document.getElementById("portal") as HTMLElement;

  return createPortal(children, rootNode);
}
