import React, { Component } from 'react'
import ContentCard from '../layouts/contentcard'
import { SearchPageByKeyword } from '../../controllers/apicontroller'
import { Header, Icon, Form, Input } from 'semantic-ui-react'

class SearchCard extends Component {

  state = {
    isSearching: false,
    results: [],
    searchTerm: ''
  }

  keywordSearch = async (keyword) => {
    this.setState({ isSearching: true })
    const results = await SearchPageByKeyword(keyword)
    console.log(results)
    this.setState({ results: results, isSearching: false })


  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { results, isSearching, searchTerm } = this.state

    // const tableData = results.map(result => ({
    //   key: result._id,
    //   pageUrl: result._source.page_url,
    //   bodyContent: result._source.body_content,
    //   tags: result._source.tags ? result._source.tags : []
    // }))

    return (
      <ContentCard>
        <Header as='h2'>
          <Icon name='search' />
          <Header.Content>
            Keyword Search
            <Header.Subheader>Perform keyword searches across entire results database.</Header.Subheader>
          </Header.Content>
        </Header>
        <Input key='searchForm1' name='searchTerm' value={this.state.searchTerm} onChange={this.handleChange.bind(this)} />

        {/* <Input.Search
          placeholder="Keyword search"
          onSearch={value => this.keywordSearch(value)}
          enterButton
          size="large"
          prefix={<Icon type='search' style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
        <Table dataSource={tableData}>
          <Column
            title="Address"
            dataIndex="pageUrl"
            key="pageUrl"
            colSpan={3}
          />
          <Column
            title="Surrounding Text"
            dataIndex="bodyContent"
            key="bodyContent"
            colSpan={3}
          />
          <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={tags => (
              <span>
                {tags.map(tag => <Tag color="red" key={tag}>{tag}</Tag>)}
              </span>
            )}
            colSpan={3}
          />
        </Table> */}
      </ContentCard>
    )
  }
}

export default SearchCard
