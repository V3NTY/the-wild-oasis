import styled from "styled-components";
import Button from "./Button";

const StyledConfirmCancel = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmCancel({ onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmCancel>
      <p>Unsaved changes, are you sure you want to abort?</p>
      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Go back
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Abort
        </Button>
      </div>
    </StyledConfirmCancel>
  );
}

export default ConfirmCancel;
