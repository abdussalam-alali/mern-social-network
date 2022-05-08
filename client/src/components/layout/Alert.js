import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
const Alert = ({alerts}) => alerts !==null && alerts.length>0? alerts.map( item => (
    <div key={item.id} className={`alert alert-${item.alertType}`}>
        {item.msg}
    </div>
)): null;
const mapStateToProps = state => ({
    alerts: state.alert,
})

Alert.propType = {
    alerts: PropTypes.array.isRequired,
}
export default connect(mapStateToProps)(Alert);
