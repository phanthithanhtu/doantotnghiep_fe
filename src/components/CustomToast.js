import React, { Component } from 'react';
import { FormattedMessage, FormattedTime } from 'react-intl';

import CustomScrollBar from '../components/CustomScrollbars';

import './CustomToast.scss';

class CustomToast extends Component {

    render() {
        const { titleId, message, messageId, time } = this.props;
        return (
            <div>
                <div className="custom-toast">
                    <div className="toast-title">
                        {time && (
                            <span className="date">
                                <FormattedTime hour='numeric' minute='numeric' second='numeric' hour12={true} value={time} />
                            </span>
                        )}
                        <i className="fa fa-fw fa-exclamation-triangle" />
                        <FormattedMessage id={titleId} />
                    </div>
                    {
                        (message && typeof message === 'object') ?
                            <CustomScrollBar autoHeight={true} autoHeightMin={50} autoHeightMax={100}>
                                {
                                    message.map((msg, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="toast-content">{msg}</div>
                                            </div>
                                        )
                                    })
                                }
                            </CustomScrollBar> :
                            <div className="toast-content">
                                {message ? message : (messageId ? (<FormattedMessage id={messageId} />) : null)}
                            </div>
                    }
                </div>
            </div>
        );
    }
}

export class CustomToastCloseButton extends Component {

    render() {
        return (
            <button type="button" className="toast-close" onClick={this.props.closeToast}>
                <i className="fa fa-fw fa-times-circle" />
            </button>
        );
    }
}

export default CustomToast;