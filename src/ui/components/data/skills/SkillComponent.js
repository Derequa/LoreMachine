import React from 'react';
import { skill_ids } from '../../../../../assets/data/pathfinder_rpg/core_rulebook/ids/SkillIDs';
import BasicItem from '../BasicItem';
import Acrobatics from './Acrobatics';

const skillScreenRouter = {
}

export default class SkillComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const Skill = this._getSkillScreen();
        return (<Skill data={this.props.data}/>);
    }

    _getSkillScreen = () => {
        switch (this.props.data.id) {
            case skill_ids.acrobatics:
            return Acrobatics;
            
            default:
            return BasicItem;
        }
    }
}