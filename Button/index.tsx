import { styled } from "@mui/material/styles";
import MUIButton from "@mui/material/Button";

const StyledButton = styled(MUIButton)(
  () => `
  &.MuiButton-root {
    text-transform: none;

  }
  `,
);

export function Button({ ...args }) {
  return <StyledButton {...args} />;
}
