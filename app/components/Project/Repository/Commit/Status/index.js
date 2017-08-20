import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import { Row, Col } from 'react-bootstrap';
import { LinkUserPhoto } from 'components/shared/Links';
import { timeFromNow } from 'utils/string';
import { Td, UserName, ColCommitId } from './styles';

const CommitStatus = ({
  commit: {
    oid,
    commitTime,
    author: {
      user,
    },
  },
}) => (
  <tr>
    <Td>
      <Row>
        <Col md={6}>
          <LinkUserPhoto user={user} width={24} height={24} />
          <UserName userName={user.userName} />
          {' '}
          committed {timeFromNow(commitTime)}
        </Col>
        <ColCommitId md={6}>
          commit {oid}
        </ColCommitId>
      </Row>
    </Td>
  </tr>
)

CommitStatus.propTypes = {
  commit: PropTypes.object.isRequired,
};

export default createFragmentContainer(CommitStatus, {
  commit: graphql`
    fragment Status_commit on Commit {
      oid
      commitTime
      author {
        user {
          userName
          photoUrl
        }
      }
    }
  `,
})
