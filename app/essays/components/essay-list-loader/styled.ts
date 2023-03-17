import styled, { keyframes, css } from "styled-components"

const shimmerMetadata = keyframes`
  0% {
    background-position: -800px 0;
  }
  50% {
    background-position: 450px 0;
  }
  100% {
    background-position: 800px 0;
  }
`

const shimmerTitle = keyframes`
  0% {
    background-position: -800px 0;
  }
  50% {
    background-position: 390px 0;
  }
  100% {
    background-position: 800px 0;
  }
`

const shimmerDesc = keyframes`
  0% {
    background-position: -800px 0;
  }
  50% {
    background-position: 330px 0;
  }
  100% {
    background-position: 800px 0;
  }
`

const CssAnimatedBg = css`
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.75rem;
  animation-duration: 1500ms;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  background-color: ${(p) => p.theme.colors.gray400};
  background: linear-gradient(
    130deg,
    rgba(${(p) => p.theme.colors.triplets.tertiary}, 0.15) 5%,
    rgba(${(p) => p.theme.colors.triplets.tertiary}, 0.25) 25%,
    rgba(${(p) => p.theme.colors.triplets.tertiary}, 0.15) 40%
  );
  background-size: 800px 104px;
  position: relative;
`

export const StyledAnimation = styled.div`
  margin-block-end: 3rem;
`

export const StyledBgMask = styled.div`
  background-color: ${(p) => p.theme.colors.gray400};
  position: absolute;
`

export const StyledMetadataAnim = styled.div`
  animation-name: ${shimmerMetadata};
  width: 100px;
  height: 12px;

  ${CssAnimatedBg}
`

export const StyledTitleAnim = styled.div`
  animation-name: ${shimmerTitle};
  height: 30px;

  ${CssAnimatedBg}
`

export const StyledDescAnim = styled.div`
  animation-name: ${shimmerDesc};
  height: 20px;

  ${CssAnimatedBg}
`
