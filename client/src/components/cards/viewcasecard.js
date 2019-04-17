import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'
import ContentCard from '../layouts/contentcard'
import { withRouter, Link } from 'react-router-dom'
import ViewCaseHeader from '../viewcaseheader';
import { colors } from '../../common/styles'
import { Table, Segment, Grid, Header, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import Tag from '../tag'
import KeywordTag from '../keywordtag'
import { dateFormat } from '../../utils/constants'
import InfoHeaderContainer from '../infoheadercontainer'
import InfoHeaderItem from '../infoheaderitem'

const StyledSegment = styled(Segment)`
  margin: 0 !important;
  padding: 0 !important;
  `

class ViewCaseCard extends Component {

  state = {
    isLoading: false,
    caseDetails: {},
    optionsOpen: false
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    const { id: caseId } = params
    if (caseId) {
      this.getCase(caseId)
    }
  }

  toggleOptions = () => {
    this.setState({ optionsOpen: !this.state.optionsOpen })
  }

  getCase = (caseId) => {
    this.setState({ isLoading: true })
    axios.get(process.env.REACT_APP_API_URL + `/cases/${caseId}`)
      .then(response => {
        if (response.status === 200) {
          this.setState({ caseDetails: response.data, isLoading: false })
        }
      }).catch(error => {
        console.error(error)
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { isLoading, caseDetails } = this.state

    const keywordCriteria = caseDetails.criteria ? caseDetails.criteria.filter(criteria => criteria.rule === 'keyword').map(criteria => criteria.term) : []
    const [tagCriteria] = caseDetails.criteria ? caseDetails.criteria.filter(criteria => criteria.rule === 'tags').map(criteria => criteria.tags.map(tag => tag)) : []

    const tableResults = caseDetails.hitsInfo && caseDetails.hitsInfo.length > 0 ? caseDetails.hitsInfo.map(result =>
      <Table.Row key={result.id} verticalAlign='top'>
        <Table.Cell><Link to={`/pages/${result.id}`}>
          {result.page_url}
        </Link></Table.Cell>
        <Table.Cell>{result.snippet}</Table.Cell>
        <Table.Cell>{result.tags ? result.tags.map(tag => <Tag key={tag} tagName={tag} />) : null}</Table.Cell>
        <Table.Cell>{moment(result.timestamp).format(dateFormat)}</Table.Cell>
      </Table.Row>
    )
      :
      <Table.Row>
        <Table.Cell textAlign='center' colSpan={4}>No hits found.</Table.Cell>
      </Table.Row>

    return (
      <ContentCard fullHeight>
        <ViewCaseHeader
          title={`Case: ${caseDetails.name}`}
          subtitle={`${caseDetails.description}`}
          iconColor={colors.nav.cases}
          buttonAction={this.toggleOptions}
        />
        <InfoHeaderContainer>
          <InfoHeaderItem header='Keywords' keywords={keywordCriteria} icon='tags' />
          <InfoHeaderItem header='Tags' tags={tagCriteria} icon='tags' />
          <InfoHeaderItem header='Hits' info={caseDetails.hits} icon='globe' />
          <InfoHeaderItem header='Last Hit' info={caseDetails.last_hit ? moment(caseDetails.last_hit).format(dateFormat) : 'Not hit'} icon='clock' />
          <InfoHeaderItem header='Status' info={caseDetails.active ? 'Active' : 'Inactive'} active icon='tags' />
          <InfoHeaderItem header='Date Created' info={moment(caseDetails.date_created).format(dateFormat)} icon='clock outline' />
        </InfoHeaderContainer>
        <Grid padded='vertically'>
          <Grid.Row>
            <Grid.Column width={16}>
              <StyledSegment basic loading={isLoading}>
                <Header as='h3'>Matches</Header>
                <Table padded='very' striped >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={3}>URL</Table.HeaderCell>
                      <Table.HeaderCell width={8}>Content</Table.HeaderCell>
                      <Table.HeaderCell width={2}>Tags</Table.HeaderCell>
                      <Table.HeaderCell width={3}>Date Found</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {tableResults}
                  </Table.Body>
                </Table>
              </StyledSegment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
