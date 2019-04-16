import React, { Component } from 'react'
import styled from '@emotion/styled'
import ContentCard from '../layouts/contentcard'
import { withRouter } from 'react-router-dom'
import PageHeader from '../pageheader';
import { colors } from '../../common/styles'
import { Table, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'

class ViewCaseCard extends Component {

  state = {

  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const { id } = params

    //todo: get case details and all related hits for this case
    console.log(id)
  }

  render() {
    return (
      <ContentCard fullHeight>
        This is a view case page
      </ContentCard>
    )
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
)

export default connect(mapStateToProps)(withRouter(ViewCaseCard));
