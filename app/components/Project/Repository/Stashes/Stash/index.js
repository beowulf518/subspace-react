import React from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay/classic';
import { Row, Col, Panel } from 'react-bootstrap';
import styled from 'styled-components';
import StashHead from './Head';
import StashCommitStatus from './CommitStatus';
import StashComment from './StashComment';
import UserVoteList from './UserVoteList';

const PanelHead = styled(Panel)`
  padding: 20px;
  background: rgba(234, 245, 255, 1);
  color: #3a87ad;
  border-color: #bce8f1;
`

const Stash = ({ stash, relay: { variables } }) => (
  <Row>
    <Col md={10}>
      <PanelHead>
        <StashHead stashHead={stash} {...variables} />
        <StashCommitStatus stashCommitStatus={stash.target} {...variables} />
      </PanelHead>
      <StashComment stashComment={stash.stash} {...variables} />
    </Col>
    <Col md={2}>
      <UserVoteList
        userVoteList={stash.stash.acceptVotes}
        title={'Accepted by'}
      />
      <UserVoteList
        userVoteList={stash.stash.rejectVotes}
        title={'Rejected by'}
      />
    </Col>
  </Row>
)

Stash.propTypes = {
  stash: PropTypes.object.isRequired,
  relay: PropTypes.object.isRequired,
}

export default Relay.createContainer(Stash, {
  initialVariables: {
    branchHead: 'master',
    userName: null,
    projectName: null,
  },
  fragments: {
    stash: vars => Relay.QL`
      fragment on Ref {
        ${StashHead.getFragment('stashHead', vars)}
        stash {
          ${StashComment.getFragment('stashComment', vars)}
          acceptVotes (first: 9999) {
            ${UserVoteList.getFragment('userVoteList')}
          }
          rejectVotes (first: 9999) {
            ${UserVoteList.getFragment('userVoteList')}
          }
        }
        target {
          ... on Commit {
            ${StashCommitStatus.getFragment('stashCommitStatus', vars)}
          }
        }
      }
    `,
  },
})
