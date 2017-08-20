import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import R from 'ramda';
import moment from 'moment';
import Commit from './Commit';
import { TimelineMain, TimelineCommits, TableWhite } from './styles';

const commitsByDate = R.groupBy(commit =>
  moment.unix(commit.node.commitTime).startOf('day').format()
)

const CommitList = ({
  commit: {
    commitListHistory: {
      edges,
    },
  },
}) => (
  <TimelineMain>
    {
      R.toPairs(commitsByDate(edges)).map(timeEdge =>
        (<TimelineCommits
          key={timeEdge[0]}
          title={`Commits on ${moment(timeEdge[0]).format('MMMM DD, YYYY')}`}
          createdAt={moment(timeEdge[0]).format('MMMM DD, YYYY')}
          contentStyle={{ padding: 0, margin: 0, boxShadow: 'none' }}
        >
          <TableWhite striped>
            <tbody>
              {timeEdge[1].map(({ node }) =>
                (<Commit
                  key={node.id}
                  commit={node}
                />)
              )}
            </tbody>
          </TableWhite>
        </TimelineCommits>)
      )
    }
  </TimelineMain>
)

CommitList.propTypes = {
  commit: PropTypes.object.isRequired,
}

export default createFragmentContainer(CommitList, {
  commit: graphql`
    fragment CommitList_commit on Commit {
      commitListHistory: history(first: 20, path: $splat) {
        edges {
          node {
            id,
            commitTime,
            ...Commit_commit
          }
        }
      }
    }
  `,
})
