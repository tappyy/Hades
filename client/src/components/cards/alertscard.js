import React, { Component } from 'react'
import ContentCard from '../layouts/contentcard'
import { withRouter } from 'react-router-dom'
import PageHeader from '../pageheader';

class AlertsCard extends Component {

  gotoAddAlert() {
    this.props.history.push('/alerts/add')
  }

  render() {

    return (
      <ContentCard fullHeight>
        <PageHeader
          title='Alerts'
          subtitle='Add and manage keyword alerts'
          iconName='warning sign'
          buttonText='Add New Alert'
          buttonIcon='add'
          buttonAction={this.gotoAddAlert.bind(this)}
        />
        {/* //todo table showing active and inactive alert monitoring */}
      </ContentCard>
    )
  }
}

export default withRouter(AlertsCard)
