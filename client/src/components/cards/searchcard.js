import React, { Component } from 'react'
import ContentCard from '../layouts/contentcard'
import Tag from '../tag'
import { Link } from 'react-router-dom'
import { SearchPageByKeyword } from '../../controllers/apicontroller'
import { Header, Icon, Form, Table, Segment, Menu } from 'semantic-ui-react'
import moment from 'moment'
import { dateFormat, searchResultsPerPage } from '../../utils/config';
import styled from '@emotion/styled'

const ResultStats = styled.div`
  visibility: ${props =>
    props.haveResults ? 'visible' : 'hidden'};
    margin: 10px 0;
`
const ResultCount = styled.h2`
margin: 0;
margin-right: 10px;
`
const ResultDisplay = styled.p`
margin: 0;
float:left;
`
const ResultTime = styled.p`
margin: 0;
float: right;
color: grey;
`

const StyledSegment = styled(Segment)`
  margin: 0 !important;
  padding: 0 !important;
  `

const StyledInput = styled(Form.Input)`
  margin-top: 20px !important;
  `

class SearchCard extends Component {

  state = {
    isSearching: false,
    haveSearched: false,
    results: [],
    searchTerm: '',
    currentPage: 1
  }

  submitSearch(e) {
    e.preventDefault()
    const page = e.target.dataset.page
    this.pagedSearch(page)
  }

  pagedSearch = async (page) => {
    const { searchTerm } = this.state
    if (!searchTerm) {
      //todo set errors for input
      return
    }

    this.setState({ currentPage: page, isSearching: true })
    const results = await SearchPageByKeyword(searchTerm, page)
    this.setState({ results: results, isSearching: false })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  createPagination = () => {
    const { results, currentPage } = this.state
    const { hits } = results ? results : null

    if (!hits) {
      return
    }

    const pagination = []
    if (hits.total > searchResultsPerPage) {
      const numberOfPages = Math.ceil(hits.total / searchResultsPerPage)
      for (let i = 0; i < numberOfPages; i++) {
        const paginationButton = <Menu.Item active={(i + 1) === currentPage} key={i} as='a' onClick={() => this.pagedSearch(i + 1)}>{i + 1}</Menu.Item>
        pagination.push(paginationButton)
      }

      if (currentPage > 1) {
        pagination.unshift(
          <Menu.Item as='a' icon onClick={() => this.pagedSearch(currentPage - 1)}>
            <Icon name='chevron left' />
          </Menu.Item>
        )
      }

      if (currentPage < numberOfPages) {
        pagination.push(
          <Menu.Item as='a' icon onClick={() => this.pagedSearch(currentPage + 1)}>
            <Icon name='chevron right' />
          </Menu.Item>
        )
      }
    }
    return pagination
  }

  render() {
    const { results, isSearching, searchTerm } = this.state
    const { hits } = results.hits ? results.hits : []

    //todo add single result view and pass in searchterm for keyword highlighting
    const tableResults = hits && hits.length > 0 ? hits.map(result =>
      <Table.Row key={result._id} verticalAlign='top'>
        <Table.Cell><Link to={{
          pathname: `/search/${result._id}`,
          state: { searchTerm: searchTerm }
        }}>{result._source.page_url}</Link></Table.Cell>
        <Table.Cell>{result._source.snippet}</Table.Cell>
        <Table.Cell>{result._source.tags ? result._source.tags.map(tag => <Tag key={tag} tagName={tag} />) : null}</Table.Cell>
        <Table.Cell>{moment(result._source.timestamp).format(dateFormat)}</Table.Cell>
      </Table.Row>
    )
      :
      <Table.Row>
        <Table.Cell textAlign='center' colSpan={4}>No results found.</Table.Cell>
      </Table.Row>


    const pagination = this.createPagination()


    return (
      <ContentCard fullHeight>
        <Header as='h2'>
          <Icon name='search' />
          <Header.Content>
            Keyword Search
            <Header.Subheader>Perform keyword searches across entire results database</Header.Subheader>
          </Header.Content>
        </Header>
        <Form data-page={1} onSubmit={this.submitSearch.bind(this)}>
          <StyledInput
            value={searchTerm}
            name='searchTerm'
            onChange={this.handleChange}
            placeholder='Search...'
            size='big'
            icon='search' />
        </Form>

        <ResultStats haveResults={hits}>
          <ResultCount>{`${hits ? results.hits.total : 0} Results`}</ResultCount>
          <ResultDisplay>Showing 1-100 of 500 results</ResultDisplay>
          <ResultTime>{results ? `${moment.duration(results.timeTaken).asSeconds()} seconds` : ''}</ResultTime>
          <div style={{ clear: 'both' }}></div>
        </ResultStats>

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
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan={4}>
                  <Menu floated='right' pagination>
                    {pagination}
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </StyledSegment>
      </ContentCard>
    )
  }
}

export default SearchCard
