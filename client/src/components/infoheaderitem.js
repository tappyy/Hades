import React from 'react'
import styled from '@emotion/styled'
import { Icon } from 'semantic-ui-react'
import Tag from './tag'
import KeywordTag from './keywordtag'

const Container = styled.div`
display: flex;
flex-direction: column;
`

const HeaderContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
margin-bottom: 10px;
`

const InfoHeader = styled.p`
text-transform: uppercase;
font-size: 0.8rem;
color: #aaa;
padding: 0;
margin: 0;
align-self: center;
`

const InfoValue = styled.p`
color: ${props =>
    props.active ? 'green' : props.inactive ? 'red' : 'black'
  };
`

const InfoHeaderItem = ({ header, info, icon, emphasis, tags, keywords, active, inactive }) => (
  <Container>
    <HeaderContainer>
      <InfoHeader><span><Icon name={icon}></Icon></span>{header}</InfoHeader>
    </HeaderContainer>
    {info &&
      <InfoValue inactive={inactive} active={active} emphasis={emphasis}>{info}</InfoValue>
    }
    {tags &&
      tags.map((tagItem, index) => <Tag key={index} tagName={tagItem} />)
    }
    {keywords &&
      keywords.map((keywordItem, index) => <KeywordTag key={index} tagName={keywordItem} />)
    }
  </Container>
)

export default InfoHeaderItem