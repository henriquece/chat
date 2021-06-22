import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import colors from '../../../constants/colors'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoaderAnimation = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${colors.white};
  border-top: 3px solid ${colors.gray.medium};
  border-radius: 50%;
  animation: ${css`
    ${spin} 1s linear infinite
  `};
  -webkit-animation: ${css`
    ${spin} 1s linear infinite
  `};
`

interface LoaderProps {
  loading: boolean
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  if (loading) {
    return (
      <LoaderWrapper>
        <LoaderAnimation />
      </LoaderWrapper>
    )
  }
  return null
}

export default Loader
