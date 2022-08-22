import styled from 'styled-components';
type DividerProps = {
  solid: boolean;
  variant?: 'horozintal' | 'vertical';
};
export const Form = styled.form`
  padding: 14px 18px;
  border: 1px #ddd solid;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  width: 100%;
  h1 {
    font-size: 28px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  p {
    font-size: 13px;
    display: flex;
    align-items: center;
  }
`;
export const LegalText = styled.h3`
  font-size: 12px;
  display: flex;
  flex-direction: column;
  span:first-of-type {
    margin-bottom: 7px;
  }
  a {
    &:first-of-type {
      margin-right: 5px;
    }
    &:last-of-type {
      margin-left: 5px;
    }
  }
`;
export const TextLink = styled.a`
  color: #0066c0;
  font-size: 12px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: #c45500;
  }
`;
export const Divider = styled.div`
  border-top: ${(props: DividerProps) =>
    props.solid ? '1px solid rgba(0, 0, 0, 0.14)' : 'none'};
  width: 100%;
  margin: 20px 0;
  height: 30px;
  position: relative;
  h5 {
    font-size: 12px;
    padding-left: 2px;
    color: #767676;
    position: absolute;
    top: -10%;
    left: 30%;
  }

  &::after,
  &::before {
    content: '';
    display: block;
    position: absolute;
    background-color: #ddd;
    height: ${(props: DividerProps) =>
      props.variant === 'horozintal' ? '1px' : '0'};
    width: ${(props: DividerProps) =>
      props.variant === 'horozintal' ? '30%' : '0'};
    top: 0;
  }
  &::after {
    right: ${(props: DividerProps) =>
      props.variant === 'horozintal' ? '2%' : '0'};
    width: ${(props: DividerProps) =>
      props.variant === 'horozintal' ? '39%' : '0'};
  }
`;
