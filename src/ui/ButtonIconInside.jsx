import styled from "styled-components";

function ButtonIconInside({ children }) {
  const ButtonInside = styled.button`
    position: absolute;
    background: none;
    border: none;
    z-index: 50;
    padding: 0.6rem;
    border-radius: var(--border-radius-sm);
    transition: all 0.2s;
    right: 35%;
    & svg {
      width: 2.2rem;
      height: 2.2rem;
      color: var(--color-brand-600);
    }
  `;

  return <ButtonInside>{children}</ButtonInside>;
}

export default ButtonIconInside;
