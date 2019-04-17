import React, { Component } from 'react'
import ContentCard from '../layouts/contentcard'
import { withRouter } from 'react-router-dom'
import PageHeader from '../viewcaseheader';
import { colors } from '../../common/styles'
import { Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import { dateFormat } from '../../utils/constants'
import InfoHeaderContainer from '../infoheadercontainer'
import InfoHeaderItem from '../infoheaderitem'

class ViewPageCard extends Component {

  state = {
    isLoading: false,
    pageDetails: {},
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const { id: pageId } = params
    if (pageId) {
      this.getPage(pageId)
    }
  }

  getPage = (pageId) => {
    this.setState({ isLoading: true })
    axios.get(process.env.REACT_APP_API_URL + `/pages/${pageId}`)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data)
          this.setState({ pageDetails: response.data, isLoading: false })
        }
      }).catch(error => {
        console.error(error)
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { pageDetails } = this.state
    const pageInfo = pageDetails._source ? pageDetails._source : {}

    return (
      <ContentCard fullHeight>
        <PageHeader
          title='View Page'
          subtitle={`Examine result with more context`}
          iconName='newspaper outline'
          iconColor={colors.nav.search}
        />
        <InfoHeaderContainer>
          <InfoHeaderItem header='URL' info={pageInfo.page_url} icon='globe' />
          <InfoHeaderItem header='Title' info={pageInfo.page_title} icon='file' />
          <InfoHeaderItem header='Tags' tags={pageInfo.tags} icon='tags' />
          <InfoHeaderItem header='Date Found' info={moment(pageInfo.timestamp).format(dateFormat)} icon='clock outline' />
        </InfoHeaderContainer>
        <Header as='h3'>Page Content</Header>
        <p>{pageInfo.body_content}</p>
      </ContentCard>
    )
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
)

export default connect(mapStateToProps)(withRouter(ViewPageCard));
