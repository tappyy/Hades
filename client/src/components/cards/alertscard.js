import React, { Component } from 'react'
import ContentCard from '../layouts/contentcard'
import { } from 'semantic-ui-react'
import styled from '@emotion/styled'
import PageHeader from '../pageheader';

class SearchCard extends Component {

  state = {
  }

  submitAddAlert(e) {
    e.preventDefault()

  }



  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  displayAddAlertModal = () => {
    console.log('open alert modal')
  }


  render() {
    return (
      <ContentCard fullHeight>
        <PageHeader
          title='Alerts'
          subtitle='Add and manage keyword alerts'
          iconName='warning sign'
          buttonText='Add New Alert'
          buttonIcon='add'
          buttonAction={this.displayAddAlertModal}
        />





      </ContentCard>
    )
  }
}

export default SearchCard
