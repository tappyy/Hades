import React, { Component } from 'react'
import ContentCard from '../layouts/contentcard'
import DashboardHeader from '../dashboardcardheader'
import Tag from '../tag'

const TagsCloud = ({ tagsData, total }) => (
  <ContentCard fullHeight>
    <DashboardHeader
      title='Tag Cloud'
      icon='tags'
      color='#fa541c'
      background='#fff2e8'
    />
    {tagsData.map(tagItem =>
      <Tag
        key={tagItem.value}
        tagName={tagItem.value}
        fontSize={(tagItem.count / total) * 50 > 8 ? (tagItem.count / total) * 50 : 8}
      />
    )}
  </ContentCard>
)
export default TagsCloud;
