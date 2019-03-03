import React, { Component } from 'react'
import ContentCard from '../layouts/contentcard'
import { withRouter } from 'react-router-dom'
import PageHeader from '../pageheader';
import { colors } from '../../common/styles'

class CasesCard extends Component {

  gotoAddAlert() {
    this.props.history.push('/cases/add')
  }

  render() {

    return (
      <ContentCard fullHeight>
        <PageHeader
          title='Cases'
          subtitle='Add and manage case monitoring'
          iconName='briefcase'
          iconColor={colors.nav.cases}
          buttonText='Add New Case'
          buttonIcon='add'
          buttonAction={this.gotoAddAlert.bind(this)}
        />
        {/* //todo table showing active and inactive case monitoring */}
        <h3>Active Cases</h3>
        <h3>Inactive Cases</h3>
      </ContentCard>
    )
  }
}

export default withRouter(CasesCard)
