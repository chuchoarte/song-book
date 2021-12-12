import React from 'react';
import PropTypes from 'prop-types';

export const Alerts = ({type, msg}) => {
    let component;
    switch(type) {
        case 'error':
            component = <div className="alert alert-dismissible alert-danger">
                <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                {msg}.
            </div>;
        break;
        default:
            return null;
    }
    return component;
};

Alerts.propTypes = {
    type: PropTypes.string.isRequired,
    msg: PropTypes.string.isRequired,
}

