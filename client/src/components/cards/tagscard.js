import React, { Component } from 'react'
import ContentCard from '../layouts/contentcard'
import { withRouter } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import { dateFormat } from '../../utils/constants'

class TagsCard extends Component {

  state = {

  }

  render() {
    return (
      <ContentCard fullHeight>
        <Header as='h3'>Tag Cloud</Header>
      </ContentCard>
    )
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
    //todo map redux stats to props
  }
)

export default connect(mapStateToProps)(withRouter(TagsCard));
