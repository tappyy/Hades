import React, { Component } from 'react'
import ContentCard from '../layouts/contentcard'
import DashboardHeader from '../dashboardcardheader'
import { TagCloud } from "react-tagcloud";
import Tag from '../tag'

const customRenderer = (tag, size, color) => {
  return <Tag key={tag.value} fontSize={tag.count ? tag.count / 1.5 : 11} tagName={tag.value} />
};

const TagsCloud = ({ tagsData }) => (
  <ContentCard fullHeight>
    <DashboardHeader
      title='Tag Cloud'
      icon='tags'
      color='#fa541c'
      background='#fff2e8'
    />
    <TagCloud
      minSize={11}
      maxSize={35}
      tags={tagsData}
      renderer={customRenderer}
    />
  </ContentCard>
)
export default TagsCloud;
