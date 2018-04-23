import React from 'react';

import {connect} from 'react-redux';

import {fetchSpots} from '../actions/spot';

export class SpotList extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchSpots());
    }

    render() {
        let list
        if (this.props.spotList) {
            console.log(this.props);
            if (this.props.spotList.spots) {
                //this.props.spotList.spots.map((spot, key) => <li key={key}>{spot.location}</li>);
                list = <li>{this.props.spotList.spots.location}</li>
            }
        }
        return (
            <ul>
                {list}
            </ul>
        );
    }
}

const mapStateToProps = (state) => ({
    spotList: state
});

export default connect(mapStateToProps)(SpotList);