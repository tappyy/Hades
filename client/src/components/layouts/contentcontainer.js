import React from 'react'
import styled from '@emotion/styled'
import { colors } from '../../common/styles'

const ContentContainer = ({ children }) => {

  const Container = styled.div`
    background-color: ${colors.content.background};
    flex-grow: 1;
    padding: 16px;
  `

  return (
    <Container>
      {children}
    </Container>
  )
}

export default ContentContainer