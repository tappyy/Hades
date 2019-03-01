import React, { Component } from 'react'
import ContentCard from '../layouts/contentcard'
import Tag from '../tag'
import { SearchPageByKeyword } from '../../controllers/apicontroller'
import { Header, Icon, Form, Table, Segment, Loader } from 'semantic-ui-react'
import moment from 'moment'
import { dateFormat } from '../../utils/config';
import styled from '@emotion/styled'

const ResultCount = styled.h3`
  visibility: ${props =>
    props.haveResults ? 'visible' : 'hidden'};
`

const StyledSegment = styled(Segment)`
  margin: 0 !important;
  padding: 0 !important;
  `

class SearchCard extends Component {

  state = {
    isSearching: false,
    results: [],
    searchTerm: ''
  }

  keywordSearch = async (e) => {
    e.preventDefault()
    const { searchTerm } = this.state
    if (!searchTerm) {
      //todo set errors for input
      return
    }

    this.setState({ isSearching: true })
    const results = await SearchPageByKeyword(searchTerm)
    this.setState({ results: results, isSearching: false })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { results, isSearching, searchTerm } = this.state

    const tableResults = results.length > 0 ? results.map(result =>
      <Table.Row key={result._id} verticalAlign='top'>
        <Table.Cell>{result._source.page_title}</Table.Cell>
        <Table.Cell>{result._source.snippet}</Table.Cell>
        <Table.Cell>{result._source.tags ? result._source.tags.map(tag => <Tag key={tag} tagName={tag} />) : null}</Table.Cell>
        <Table.Cell>{moment(result._source.timestamp).format(dateFormat)}</Table.Cell>
      </Table.Row>
    )
      :
      <Table.Row>
        <Table.Cell colSpan={4}>No Results found.</Table.Cell>
      </Table.Row>

    return (
      <ContentCard>
        <Header as='h2'>
          <Icon name='search' />
          <Header.Content>
            Keyword Search
            <Header.Subheader>Perform keyword searches across entire results database</Header.Subheader>
          </Header.Content>
        </Header>
        <Form onSubmit={this.keywordSearch}>
          <Form.Input
            value={searchTerm}
            name='searchTerm'
            onChange={this.handleChange}
            placeholder='Search...'
            size='big'
            icon='search'
          />
        </Form>

        <ResultCount haveResults={results.length > 0}>{`${results.length} Results`}</ResultCount>

        <StyledSegment basic loading={isSearching}>
          <Table padded='very' striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={3}>URL</Table.HeaderCell>
                <Table.HeaderCell width={9}>Matched Text</Table.HeaderCell>
                <Table.HeaderCell width={2}>Tags</Table.HeaderCell>
                <Table.HeaderCell width={2}>Date Found</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tableResults}
            </Table.Body>
          </Table>
        </StyledSegment>
      </ContentCard>
    )
  }
}

export default SearchCard
