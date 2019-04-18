import React from 'react'
import { Icon } from 'semantic-ui-react'
import { toast_icons } from '../utils/constants'
import styled from '@emotion/styled'

const ToastWrapper = styled.li`
    display: flex;
    padding: 10px;
    margin-bottom: 16px;
    border-radius: 4px;
    color: rgba(0,0,0,0.65);
    .toast-icon{
      margin-right: 20px;
    }
    .toast-content{
      margin: 0;
      padding-right: 40px;
      flex-grow: 1;
    }
    &.info {
      background-color: #e6f7ff;
      border: 1px solid #91d5ff;
      .toast-icon {
        color: #1890ff;
      }
    }
    &.success {
      background-color: #f6ffed;
      border: 1px solid #b7eb8f;
      .toast-icon {
        color: #52c41a;
      }
    }
    &.warning {
      background-color: #fffbe6;
      border: 1px solid #ffe58f;
      .toast-icon {
        color: #faad14;
      }
    }
    &.error {
      background-color: #fff1f0;
      border: 1px solid #ffa39e;
      .toast-icon {
        color: #f5222d;
      }
    }
    .toast-dismiss{
      cursor: pointer;
      margin: 0;
      color: rgba(0,0,0,0.65);
    }
`

const Toast = ({ id, message, type, duration, onDismiss }) => {
  setTimeout(() => {
    onDismiss()
  }, (duration * 1000))
  return (
    <ToastWrapper className={`toast ${type}`}>
      <p className={`toast-content`}><Icon className={`toast-icon`} name={toast_icons[type]} />{message}</p>
      <Icon name='close' className={`toast-dismiss`} onClick={onDismiss} />
    </ToastWrapper>
  )
}

export default Toast

