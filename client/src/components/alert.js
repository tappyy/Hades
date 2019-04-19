import React from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import styled from '@emotion/styled'
import { Icon, Button } from 'semantic-ui-react'

const StyledAlert = styled.li`
  background-color: #fff;
  border-radius: 5px;
  padding: 10px 10px 10px 48px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  color: rgba(0,0,0,0.65);
  position: relative;
  width: 330px;
  .title {
    margin-top: 0;
    display: inline-block;
    margin-bottom: 8px;
    color: rgba(0,0,0,0.85);
    font-size: 16px;
  }
  .icon {
color: #52c41a;
position: absolute;
top: 10px;
left: 14px;
font-size: 1.2em;
  }
  .case-name {
    margin-bottom: 0;
    font-size: 15px;
    margin-bottom: 5px;
  }
  .timestamp {
    font-size: 12px
  }
`

const Alert = ({ caseInfo, onDismiss, history }) => {
  setTimeout(() => {
    onDismiss()
  }, (5 * 1000))

  const goToCase = (caseId) => {
    history.push(`/cases/${caseId}`)
  }

  return (
    <StyledAlert>
      <Icon name='find' />
      <h4 className="title">Match Found</h4>
      <p className='case-name'>{caseInfo.name}</p>
      <p className='timestamp'>{moment(caseInfo.last_hit).format('Do MMMM YYYY, HH:mm')}</p>
      <Button size='mini' color='green' onClick={() => goToCase(caseInfo._id)}>View Case</Button>
    </StyledAlert>
  )
}

export default withRouter(Alert)
