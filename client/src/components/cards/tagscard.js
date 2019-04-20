import React, { Component } from 'react'
import ContentCard from '../layouts/contentcard'
import DashboardHeader from '../dashboardcardheader'
import { TagCloud } from "react-tagcloud";
import Tag from '../tag'

const customRenderer = (tag, size, color) => {
  return <Tag key={tag.value} fontSize={tag.count / 1.5} tagName={tag.value} />
};

const TagsCard = ({ tagsData }) => (
  <ContentCard fullHeight>
    <DashboardHeader
      title='Tag Cloud'
      icon='tags'
      color='#52c41a'
      background='#f6ffed'
    />
    <TagCloud
      minSize={12}
      maxSize={35}
      tags={tagsData}
      renderer={customRenderer}
    />
  </ContentCard>
)
export default TagsCard;
