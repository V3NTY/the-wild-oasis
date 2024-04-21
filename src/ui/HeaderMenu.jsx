import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import DarkModeToogle from "./DarkModeToogle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
      <li>
        <DarkModeToogle />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
