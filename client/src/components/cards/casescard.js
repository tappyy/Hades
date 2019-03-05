import React, { Component } from 'react'
import styled from '@emotion/styled'
import ContentCard from '../layouts/contentcard'
import { withRouter } from 'react-router-dom'
import PageHeader from '../pageheader';
import { colors } from '../../common/styles'
import { Table, Segment, Menu } from 'semantic-ui-react'

const StyledSegment = styled(Segment)`
  margin: 0 !important;
  padding: 0 !important;
  `

class CasesCard extends Component {

  state = {
    isLoading: false
  }
  gotoAddAlert() {
    this.props.history.push('/cases/add')
  }

  render() {

    const { isLoading } = this.state

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
        <StyledSegment basic loading={isLoading}>
          <Table padded='very' striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Rules</Table.HeaderCell>
                <Table.HeaderCell>Hits</Table.HeaderCell>
                <Table.HeaderCell width={2}>Date Created</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {/* {tableResults} */}
            </Table.Body>
            {/* <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan={4}>
                  <Menu floated='right' pagination>
                    {pagination}
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer> */}
          </Table>
        </StyledSegment>
        <h3>Inactive Cases</h3>
        <StyledSegment basic loading={isLoading}>
          <Table padded='very' striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Rules</Table.HeaderCell>
                <Table.HeaderCell>Hits</Table.HeaderCell>
                <Table.HeaderCell width={2}>Date Closed</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {/* {tableResults} */}
            </Table.Body>
            {/* <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan={4}>
                  <Menu floated='right' pagination>
                    {pagination}
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer> */}
          </Table>
        </StyledSegment>
      </ContentCard>
    )
  }
}

export default withRouter(CasesCard)
