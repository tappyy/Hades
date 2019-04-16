import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'
import ContentCard from '../layouts/contentcard'
import { withRouter } from 'react-router-dom'
import ViewCaseHeader from '../viewcaseheader';
import { colors } from '../../common/styles'
import { Table, Segment, Grid, Header, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import Tag from '../tag'
import KeywordTag from '../keywordtag'
import { dateFormat } from '../../utils/constants'

const StyledSegment = styled(Segment)`
  margin: 0 !important;
  padding: 0 !important;
  `

const TableRow = styled(Table.Row)`
  :hover{
    cursor: pointer;
  }
  `
const ListTitle = styled.p`
  display: inline-block;
  width: 20%;
  margin-right: 24px; 
  text-align: right;
  font-weight: bold; 
  vertical-align:top;
  `

const ListItem = styled.div`
  display: inline-block
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
          console.log(response.data)
          this.setState({ caseDetails: response.data, isLoading: false })
        }
      }).catch(error => {
        console.error(error)
        this.setState({ isLoading: false })
      })
  }

  gotoViewResult = (resultId) => {
    this.props.history.push(`/results/${resultId}`)
  }

  render() {
    const { isLoading, caseDetails } = this.state

    const keywordCriteria = caseDetails.criteria ? caseDetails.criteria.filter(criteria => criteria.rule === 'keyword').map(criteria => criteria.term) : []
    const [tagCriteria] = caseDetails.criteria ? caseDetails.criteria.filter(criteria => criteria.rule === 'tags').map(criteria => criteria.tags.map(tag => tag)) : []

    const tableResults = caseDetails.hitsInfo && caseDetails.hitsInfo.length > 0 ? caseDetails.hitsInfo.map(result =>
      <TableRow onClick={() => this.gotoViewResult(result.id)} key={result.id} verticalAlign='top'>
        <Table.Cell>{result.page_url}</Table.Cell>
        <Table.Cell>{result.body_content}</Table.Cell>
        <Table.Cell>{result.tags ? result.tags.map(tag => <Tag key={tag} tagName={tag} />) : null}</Table.Cell>
        <Table.Cell>{moment(result.timestamp).format(dateFormat)}</Table.Cell>
      </TableRow>
    )
      :
      <Table.Row>
        <Table.Cell textAlign='center' colSpan={4}>No hits found.</Table.Cell>
      </Table.Row>

    return (
      <ContentCard fullHeight>
        <ViewCaseHeader
          title='View Case'
          subtitle={`View and manage case #${caseDetails._id}`}
          iconColor={colors.nav.cases}
          buttonAction={this.toggleOptions}
        />
        <Grid padded='vertically'>
          <Grid.Row>
            <Grid.Column width={8}>
              <div>
                <ListTitle>Name:</ListTitle>
                <ListItem>{caseDetails.name}</ListItem>
              </div>
              <div>
                <ListTitle>Description:</ListTitle>
                <ListItem>{caseDetails.description}</ListItem>
              </div>
              <div>
                <ListTitle>Date Created:</ListTitle>
                <ListItem>{moment(caseDetails.date_created).format(dateFormat)}</ListItem>
              </div>

            </Grid.Column>
            <Grid.Column width={8}>
              <div>
                <ListTitle>Hits:</ListTitle>
                <ListItem>{caseDetails.hits}</ListItem>
              </div>
              <div>
                <ListTitle>Last Hit:</ListTitle>
                <ListItem>{caseDetails.last_hit ? moment(caseDetails.last_hit).format(dateFormat) : 'Not hit'}</ListItem>
              </div>
              {keywordCriteria &&
                <div>
                  <ListTitle>Keywords:</ListTitle>
                  <ListItem>
                    {keywordCriteria.map((match, index) => <KeywordTag key={index} tagName={match} />)}
                  </ListItem>
                </div>
              }
              {tagCriteria &&
                <div>
                  <ListTitle>Tags:</ListTitle>
                  <ListItem>
                    {tagCriteria.map((match, index) => <Tag key={index} tagName={match} />)}
                  </ListItem>
                </div>
              }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <StyledSegment basic loading={isLoading}>
                <Header as='h3'>Matches</Header>
                <Table padded='very' striped selectable >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell width={3}>URL</Table.HeaderCell>
                      <Table.HeaderCell width={9}>Content</Table.HeaderCell>
                      <Table.HeaderCell width={2}>Tags</Table.HeaderCell>
                      <Table.HeaderCell width={2}>Date Found</Table.HeaderCell>
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
