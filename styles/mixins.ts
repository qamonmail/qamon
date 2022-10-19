import { css } from "styled-components";
import { px2rem } from "../common/lib";

export const input = () => css`
  flex: 1;
  border: ${px2rem(1)} solid var(--border-color) !important;
  border-radius: ${px2rem(5)} !important;
  padding: ${px2rem(10)};
  font-size: ${px2rem(16)};
  font-weight: 400;
  max-width: ${px2rem(800)};

  ::placeholder {
    color: var(--active-color);
    opacity: .3;
  }

  &[data-error="true"] {
    border-width: ${px2rem(2)} !important;
    border-color: var(--red-color) !important;
  }

  @media (min-width: 992px) {
    font-size: ${px2rem(18)};
    font-weight: 400;
    padding: ${px2rem(12)} ${px2rem(20)};
    border-radius: ${px2rem(10)} !important;
  }
`;

export const formContainer = () => css`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(10)};
  margin: 0;

  @media (min-width: 992px) {
    margin: ${px2rem(18)} 0 ${px2rem(30)};
  }
`;

export const formItem = () => css`
  display: flex;
  flex-direction: column;

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const formButtons = () => css`
  display: flex;
  flex-direction: row;
  max-width: ${px2rem(800)};
  gap: ${px2rem(10)};
  justify-content: flex-end;
  margin-top: ${px2rem(10)};

  @media (min-width: 992px) {
    margin-top: ${px2rem(20)};
  }
`;

export const errorMessage = () => css`
  & > strong {
    color: var(--red-color);
    font-size: ${px2rem(12)};
    font-weight: 500;
    margin-top: ${px2rem(20)};

    @media (min-width: 992px) {
      margin-top: 0;
      margin-left: ${px2rem(20)};
    }
  }
`;

export const messageBlocks = () => {
  let style = "";

  for (let i = 0; i <= 200; ++i) {
    style += `
      &:nth-of-type(${i + 1}) {
        padding-left: ${px2rem(i * 12)};
      }
    `;
  }

  return css`${style}`;
};

export const mobileMessageBlocks = () => {
  let style = "";

  for (let i = 0; i <= 200; ++i) {
    style += `
      &:nth-of-type(${i + 1}) {
        padding-left: ${px2rem(i * 6)};
      }
    `;
  }

  return css`${style}`;
};

export const tableContainer = () => css`
  max-height: calc(100vh - ${px2rem(300)});
  overflow-x: hidden;
  overflow-y: auto;
`;
