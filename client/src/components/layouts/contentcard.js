import React from 'react'
import styled from '@emotion/styled'
import { colors } from '../../common/styles'

const Card = styled.div`
    background-color: ${colors.content.white};
    border: 1px solid ${colors.content.border};
    border-radius: 8px;
    padding: 16px;
    height: ${props =>
    props.fullHeight ? '100%' : 'auto'};
  `

const ContentCard = ({ fullHeight, children }) => {
  return (
    <Card fullHeight>
      {children}
    </Card>
  )
}

export default ContentCard