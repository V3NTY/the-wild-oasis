import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import ConfirmCancel from "./ConfirmCancel";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// UTWORZENIE CONTEXTU
const ModalContext = createContext();

// MAIN PARENT COMPONENt WITH CONTEXT PROVIDER & STATE
function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");

  const closeConfirm = () => {
    if (confirm("All unsaved changes will be lost, are you sure?")) close();
  };
  const open = setOpenName;

  // DOSTARCZENIE POWYZSZYCH FUNKCJI DO KONTEKSTU
  return (
    <ModalContext.Provider value={{ openName, open, close, closeConfirm }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  // ZACIĄGNIĘCIE FUNKCJI Z KONTEKSTU
  const { open } = useContext(ModalContext);

  // W związku z tym, że children, który jest buttonem, nie ma dostępu do funkcji setOpenName, z racji, że należy ona do jego parenta, tworzymy klon childrena za pomocą funkcji cloneElement a następnie przypisujemy do niej props od parenta
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Confirm({ children, changes }) {
  const { close } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  if (changes) {
    return (
      <ConfirmCancel onCloseModal={close} onConfirm={ref}>
        {children}
      </ConfirmCancel>
    );
  }
}

function Window({ children, name }) {
  //ZACIGNIĘCIE Z KONTEKSTU
  const { openName, close, open, closeConfirm } = useContext(ModalContext);

  const ref = useOutsideClick(closeConfirm);

  // const confirmCancel = useOutsideClick(open("unsaved"));

  // WARUNEK, ŻE WYŚWIETLANA ZAWARTOŚC MA BYĆ ZALEŻNA OD PROPSA NAME

  //GUARD CLAUSE
  if (name !== openName) return null;

  // React portal pozwala na użycie komponentu w miejscu innym, niż zdefiniowane w dokumencie, działa podobnie do position: absolute, jednak w celach reusability jest lepszym rozwiązaniem, gdyż przypisane style nie są wtedy zależne od parenta, tj nie mogą zostać nadpisane.
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

// Przypisanie funkcji pod komponent
Modal.Open = Open;
Modal.Window = Window;
Modal.Confirm = Confirm;
export default Modal;
