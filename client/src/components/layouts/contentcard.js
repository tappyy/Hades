import React from 'react'
import styled from '@emotion/styled'
import { colors } from '../../common/styles'

const Card = styled.div`
    background-color: ${colors.content.white};
    border: 1px solid ${colors.content.border};
    border-radius: 8px;
    padding: 16px;
  `

const ContentCard = ({ children }) => {
  return (
    <Card>
      {children}
    </Card>
  )
}

export default ContentCard