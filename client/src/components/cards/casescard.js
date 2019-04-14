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

const StyledSegment = styled(Segment)`
  margin: 0 !important;
  padding: 0 !important;
  `

const TableRow = styled(Table.Row)`
  :hover{
    cursor: pointer;
  }
  `

class CasesCard extends Component {

  state = {
    isLoading: false,
    cases: []
  }

  componentDidMount() {
    this.getCases()
  }

  getCases = () => {
    this.setState({ isLoading: true })
    const { id: userId } = this.props.auth.user
    axios.get(process.env.REACT_APP_API_URL + `/cases/${userId}`)
      .then(response => {
        if (response.status === 200) {
          this.setState({ cases: response.data, isLoading: false })
        }
      }).catch(error => {
        console.error(error)
        this.setState({ isLoading: false })
      })
  }

  gotoAddCase() {
    this.props.history.push('/cases/add')
  }

  gotoViewCase = (caseId) => {
    this.props.history.push(`/case/${caseId}`)
  }

  render() {

    const { isLoading, cases } = this.state
    const activeCases = cases.filter(caseObject => caseObject.active)
    const inActiveCases = cases.filter(caseObject => !caseObject.active)

    console.log(activeCases)
    console.log(inActiveCases)

    const activeResults = activeCases.length > 0 ? activeCases.map(activeCase => (
      <TableRow onClick={() => this.gotoViewCase(activeCase._id)} key={activeCase._id}>
        <Table.Cell>
          {activeCase.name}
        </Table.Cell>
        <Table.Cell>
          {activeCase.hits}
        </Table.Cell>
        <Table.Cell>
          {activeCase.last_hit ? moment(activeCase.last_hit).format('Do MMMM YYYY') : '-'}
        </Table.Cell>
        <Table.Cell>
          {moment(activeCase.date_created).format('Do MMMM YYYY')}
        </Table.Cell>
      </TableRow>
    ))
      :
      <Table.Row>
        <Table.Cell colSpan={4}>No active cases</Table.Cell>
      </Table.Row>

    const inActiveResults = inActiveCases.length > 0 ? inActiveCases.map(inactiveCase => (
      <TableRow onClick={() => this.gotoViewCase(inactiveCase._id)} key={inactiveCase._id}>
        <Table.Cell>
          {inactiveCase.name}
        </Table.Cell>
        <Table.Cell>
          {inactiveCase.hits}
        </Table.Cell>
        <Table.Cell>
          {inactiveCase.last_hit ? moment(inactiveCase.last_hit).format('Do MMMM YYYY') : '-'}
        </Table.Cell>
        <Table.Cell>
          {moment(inactiveCase.date_created).format('Do MMMM YYYY')}
        </Table.Cell>
      </TableRow>
    ))
      :
      <Table.Row>
        <Table.Cell colSpan={4}>No inactive cases</Table.Cell>
      </Table.Row>
    return (
      <ContentCard fullHeight>
        <PageHeader
          title='Cases'
          subtitle='Add and manage case monitoring'
          iconName='briefcase'
          iconColor={colors.nav.cases}
          buttonText='Add New Case'
          buttonIcon='add'
          buttonAction={this.gotoAddCase.bind(this)}
        />
        {/* //todo table showing active and inactive case monitoring */}
        <h3>Active Cases</h3>
        <StyledSegment basic loading={isLoading}>
          <Table padded='very' striped selectable={activeCases.length > 0} >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Hits</Table.HeaderCell>
                <Table.HeaderCell>Last Hit</Table.HeaderCell>
                <Table.HeaderCell width={2}>Date Created</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {activeResults}
            </Table.Body>
          </Table>
        </StyledSegment>
        <h3>Inactive Cases</h3>
        <StyledSegment basic loading={isLoading}>
          <Table padded='very' selectable={inActiveCases.length > 0} striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Rules</Table.HeaderCell>
                <Table.HeaderCell>Hits</Table.HeaderCell>
                <Table.HeaderCell width={2}>Date Closed</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {inActiveResults}
            </Table.Body>
          </Table>
        </StyledSegment>
      </ContentCard>
    )
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
)

export default connect(mapStateToProps)(withRouter(CasesCard));
