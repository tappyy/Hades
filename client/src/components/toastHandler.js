import React from 'react'
import { connect } from 'react-redux'
import { removeToast } from '../actions/toastActions'
import Toast from './toast'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'

const Container = styled.ul`
    bottom: 24px;
    position: absolute;
    right: 24px;
    list-style: none;
    z-index: 9999;
    margin: 0;
    padding: 0;
`

const ToastHandler = ({ toasts, removeToast }) => {
  return (
    <TransitionGroup
      component={Container}
    >
      {toasts.map(toast => (
        <CSSTransition
          key={toast.id}
          timeout={1000}
          classNames={{
            enter: 'animated',
            enterActive: 'fadeInRight',
            exit: 'animated',
            exitActive: 'fadeOutRight',
          }}>
          <Toast {...toast} onDismiss={() => removeToast(toast.id)} />
        </CSSTransition>))}
    </TransitionGroup>
  )
}

const mapStateToProps = state => ({
  toasts: state.toasts
})

export default connect(mapStateToProps, { removeToast })(ToastHandler)
