import React, { Component } from 'react'
import ContentCard from '../layouts/contentcard'
import { Header } from 'semantic-ui-react'
import axios from 'axios'
import { TagCloud } from "react-tagcloud";
import Tag from '../tag'

const customRenderer = (tag, size, color) => {
  return <Tag key={tag.value} fontSize={tag.count / 1.5} tagName={tag.value} />
};

class TagsCard extends Component {

  state = {
    tagData: [],
    isLoading: false
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.getTagData()
    this.interval = setInterval(() => { this.getTagData() }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getTagData = () => {
    axios.get(process.env.REACT_APP_API_URL + `/stats/tags`)
      .then(response => {
        if (response.status === 200) {
          this.setState({ tagData: response.data, isLoading: false })
        }
      }).catch(error => {
        console.error(error)
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { tagData } = this.state
    return (
      <ContentCard fullHeight>
        <Header as='h3'>Tag Cloud</Header>
        <TagCloud
          minSize={12}
          maxSize={35}
          tags={tagData}
          renderer={customRenderer}
        />
      </ContentCard>
    )
  }
}

export default (TagsCard);
