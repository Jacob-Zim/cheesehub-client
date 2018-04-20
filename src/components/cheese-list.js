import React from 'react';

import {connect} from 'react-redux';

import {fetchCheeses} from '../actions/cheese';

export class CheeseList extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchCheeses());
    }

    render() {
        let list
        if (this.props.cheeseList) {
            console.log(this.props);
            if (this.props.cheeseList.cheeses) {
                list = this.props.cheeseList.cheeses.map((cheese, key) => <li key={key}>{cheese}</li>);
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
    cheeseList: state
});

export default connect(mapStateToProps)(CheeseList);