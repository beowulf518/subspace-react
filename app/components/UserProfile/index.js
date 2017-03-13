import React from 'react';
import Relay from 'react-relay';
import Helmet from 'react-helmet';
import Profile from './Profile';

export const UserProfile = ({ viewer }) => !viewer ? null : (
  <div>
    <Helmet
      title={viewer.user.fullName}
      meta={[{
        name: 'description',
        content: `${viewer.user.fullName} profile`,
      }]}
    />
    <Profile user={viewer.user} />
  </div>
)

UserProfile.propTypes = {
  viewer: React.PropTypes.object,
};

export default Relay.createContainer(UserProfile, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        user {
          userName
          fullName
          photoUrl
        }
      }
    `,
  },
});
