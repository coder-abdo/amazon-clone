import styled from 'styled-components';
type InputProps = {
  isLoading?: boolean;
};
export const TextField = styled.input`
  height: 22px;
  padding: 3px 7px;
  border: 1px solid #a6a6a6;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 1px 0 rgb(255 255 255 / 50%), 0 1px 0 rgb(0 0 0 / 7%) inset;
  &:focus {
    border-color: #e77600;
    box-shadow: 0 0 3px 2px rgb(228 121 17 / 50%);
  }
  &.error {
    border-color: #f00;
  }
`;
export const SubmitButton = styled(TextField)`
  background: linear-gradient(to bottom, #f7dfa5, #f0c14b);
  height: 28px;
  font-size: 15px;
  cursor: ${(props: InputProps) => (props.isLoading ? 'not-allowed' : 'auto')};
  &:hover {
    cursor: pointer;
  }
`;
export const LogoutButton = styled(SubmitButton)`
  text-align: center;
  font-size: 13px;
  width: 50px;
  align-self: flex-end;
`;
export const RegisterSubmitButton = styled(SubmitButton)`
  background: linear-gradient(to bottom, #fff, #eee);
  border-radius: 3px;
  border-color: #adb1b8 #a2a6ac #8d9096;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  padding: 0;
  text-align: center;
  vertical-align: middle;
  width: 340px;
  height: 29px;
  margin-top: -45px;
  transition: background 0.3s;
  &:hover {
    background: #e7e9ec;
  }
`;
