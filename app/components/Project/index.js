import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import moment from 'moment'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap';
import NavTabs from 'components/shared/NavTabs';
import RepoLink from 'components/shared/repo/TitleLink'

const getNavConfig = (owner, name) => [
  {
    link: `/${owner}/${name}/readme`,
    label: 'ReadMe',
  },
  {
    link: `/${owner}/${name}/objectives`,
    label: 'Objectives',
  },
  {
    link: `/${owner}/${name}/commits`,
    label: 'Commits',
  },
  {
    link: '/projects',
    label: 'Projects',
  },
]

const RepoTitle = styled.h3`
  margin-bottom: 25px;
`
const FilesCol = styled(Col)`
  padding-top: 15px;
`

const Project = ({
  viewer: {
    repository: {
      name,
      owner,
      createdAt,
      isPrivate,

      project: {
        goals,
        description,
      },
    },
  },
}) => (
  <div>
    <RepoTitle>
      <RepoLink
        repoName={name}
        isPrivate={isPrivate}
        userName={owner.userName}
      />
    </RepoTitle>
    <NavTabs config={getNavConfig(owner.userName, name)} />
    <FilesCol sm={6} md={6}>
      <Row>
        Goals: {goals}
      </Row>
      <Row>
        Description: {description}
      </Row>
      <Row>TODO: show files here</Row>
      <Row><Col>Contributors</Col></Row>
      <Row><Col>Live Users</Col></Row>
      <Row>
        <Col>
          Created: {moment(createdAt).format('MMMM Do YYYY')}
        </Col>
      </Row>
    </FilesCol>
    <FilesCol sm={6} md={6}>
      <Row>
        TODO: show README from repo file
      </Row>
    </FilesCol>
  </div>
)

Project.propTypes = {
  viewer: PropTypes.object.isRequired,
}

export default Relay.createContainer(Project, {
  initialVariables: {
    owner: null,
    name: null,
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        repository(owner: $owner, name: $name) {
          name
          owner {
            userName
          }
          createdAt
          isPrivate
          project {
            goals
            description
          }
        }
      }
    `,
  },
})

