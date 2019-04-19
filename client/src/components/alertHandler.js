import React from 'react'
import { connect } from 'react-redux'
import { dismissAlert } from '../actions/alertActions'
import Alert from './alert'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'

const Container = styled.ul`
    position: absolute;
    top: 87px;
    right: 24px;
    list-style: none;
    z-index: 9999;
    margin: 0;
    padding: 0;
`

const AlertHandler = ({ alerts, dismissAlert }) => {
  return (
    <TransitionGroup
      component={Container}
    >
      {alerts.map(alert => (
        <CSSTransition
          key={alert._id}
          timeout={1000}
          classNames={{
            enter: 'animated',
            enterActive: 'fadeInRight',
            exit: 'animated',
            exitActive: 'fadeOutRight',
          }}>
          <Alert caseInfo={alert} onDismiss={() => dismissAlert(alert._id)} />
        </CSSTransition>))}
    </TransitionGroup>
  )
}

const mapStateToProps = state => ({
  alerts: state.alerts
})

export default connect(mapStateToProps, { dismissAlert })(AlertHandler)
