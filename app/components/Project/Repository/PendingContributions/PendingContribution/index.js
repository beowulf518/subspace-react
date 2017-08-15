import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import withRelayFragment from 'relay/withRelayFragment';
import { compose, mapProps } from 'recompose';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import UserPhoto from 'components/shared/UserPhoto';
import Commits from './Commits';
import Comments from './Comments';
import Votes from './Votes';
import { PendingMainGrid } from './styles';

const PendingContribution = ({
  title, pendingRef,
  pendingRef: {
    stash: { description, owner, createdAt },
  },
}) => (
  <MuiThemeProvider>
    <PendingMainGrid>
      <Card>
        <CardHeader
          title={title}
          subtitle={`pushed ${moment(createdAt).fromNow()}`}
          avatar={(
            <Avatar>
              <UserPhoto
                userName={owner.userName}
                photoUrl={owner.photoUrl}
                width={32}
                height={32}
              />
            </Avatar>
          )}
          showExpandableButton
          actAsExpander
          style={{
            backgroundColor: '#039BE5',
          }}
          iconStyle={{
            color: 'rgba(255,255,255,0.9)',
          }}
          titleColor={'rgba(255,255,255,0.9)'}
          subtitleColor={'rgba(255,255,255,0.7)'}
        />
        <CardText
          expandable
          style={{ backgroundColor: '#E0E0E0' }}
        >
          <Card>
            <CardText>
              {description && (
                <dl>
                  <dt>Description</dt>
                  <dd>
                    {description}
                  </dd>
                </dl>
              )}
              <dl>
                <dt>Goals &amp; Issues</dt>
                <dd>TODO</dd>
              </dl>
              <dl>
                <dt>Contributor Statistics</dt>
                <dd>TODO</dd>
              </dl>
            </CardText>
          </Card>
          <Commits commit={pendingRef.target} />
          <Comments stash={pendingRef.stash} />
          <Votes stash={pendingRef.stash} />
        </CardText>
      </Card>
    </PendingMainGrid>
  </MuiThemeProvider>
)

PendingContribution.propTypes = {
  pendingRef: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
}

export default compose(
  withRelayFragment({
    pendingRef: graphql`
      fragment PendingContribution_pendingRef on Ref {
        id
        stash {
          id
          stashNum
          title
          description
          createdAt
          owner {
            userName
            photoUrl
          }
          ...Comments_stash
          ...Votes_stash
        }
        target {
          ... on Commit {
            ...Commits_commit
          }
        }
      }
    `,
  }),
  mapProps(({
    pendingRef: { stash: { stashNum, title } },
    pendingRef, ...rest
  }) => ({
    title: title ?
      `${title} (Stash #${stashNum})` : `Stash #${stashNum}`,
    pendingRef,
    ...rest,
  }))
)(PendingContribution)
