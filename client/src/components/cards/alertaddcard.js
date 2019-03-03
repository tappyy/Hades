import React, { Component } from 'react'
import ContentCard from '../layouts/contentcard'
import { Modal, Button, Header, Icon, Form, Dropdown, Input } from 'semantic-ui-react'
import styled from '@emotion/styled'
import PageHeader from '../pageheader';

const FormInline = styled.div`
p {
  display: inline-block;
  /* font-weight: 700; */
  vertical-align: baseline;
}
div {
  margin: auto 5px;
}
`

class AlertAddCard extends Component {

  submitAddAlert(e) {
    e.preventDefault()

  }



  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    const criteriaFields = [
      {
        text: 'Body',
        value: 'body_content',
      },
      {
        text: 'Tag',
        value: 'tags',
      },
      {
        text: 'URL',
        value: 'page_url',
      }
    ]

    return (
      <ContentCard fullHeight>
        <PageHeader
          title='Add New Alert'
          subtitle='Configure new content monitoring alert'
          iconName='add'
        />


      </ContentCard>
    )
  }
}

export default AlertAddCard
