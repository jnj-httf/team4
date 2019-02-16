import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import startCase from 'lodash/startCase';
// import commonMessages from 'messages';

const formatMessageFallback = (messageKey, messages, intl) => {
  if (!messages[messageKey]) {
    if (messageKey && process.env.NODE_ENV !== 'production') {
      console.warn(`Missing message for ${messageKey}`); // eslint-disable-line no-console
    }
    return startCase(messageKey);
  }

  return intl.formatMessage(messages[messageKey]);
};

class FormattedMessageFallback extends React.PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    messageKey: PropTypes.string.isRequired,
    messages: PropTypes.object,
  };

  render() {
    const { intl, messageKey, messages = {} } = this.props;

    return <span>{formatMessageFallback(messageKey, messages, intl)}</span>;
  }
}

export default compose(injectIntl)(FormattedMessageFallback);
export { formatMessageFallback };
