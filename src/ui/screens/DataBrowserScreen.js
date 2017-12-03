import React from 'react';
import {
    Container,
    Content,
    Header,
    Left, Right, Body,
    Text
} from 'native-base';
import {
    StyleSheet,
} from 'react-native';
import {
    appDefaults,
    appStyles
} from '../appStyles';
import { colors } from '../colors';
import NestedListview, {
    NestedRow,
} from 'react-native-nested-listview';
import TitleHeader from '../components/TitleHeader';
import RealmManager, { getAllFrom } from '../../managers/RealmManager';
const styles = StyleSheet.create({
    listText: { color: colors.white }
});
const listData =
[
    {title: 'Skills', getData: async () => getAllFrom('SkillInfo') },
    {title: 'Spells', items: [
        {title: 'Paladin', getData: async () => _HACKgetSpellsByClass('Paladin')},
        {title: 'Wizard', getData: async () => _HACKgetSpellsByClass('Wizard')},
        {title: 'Sorcerer', getData: async () => _HACKgetSpellsByClass('Sorcerer')},
        {title: 'Cleric', getData: async () => _HACKgetSpellsByClass('Cleric')},
    ]}
];

export default class DataBrowserScreen extends React.Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container style={appStyles.mainContainer}>
                <TitleHeader
                title={'Browse'}
                navigation={this.props.navigation}
                />
                <Content>
                    <NestedListview
                    data={listData}
                    renderNode={this._renderNode}
                    getChildrenName={this._getChildrenName}
                    onNodePressed={this._onNodePressed}
                    />
                </Content>
            </Container>
        );
    }

    _renderNode = (node, level) => {
        return (
            <NestedRow level={level}>
                <Text style={styles.listText}>{node.title}</Text>
            </NestedRow>
        );
    }

    _onNodePressed = async (node) => {
        if (!node.getData)
            return;
        const data = await node.getData();
        this.props.navigation.navigate('DataBrowserList', {data, title: node.title});
    }
    _getChildrenName = () => { return 'items' }

}

const _HACKgetSpellsByClass = async (clazz) => {
    const allSpells = await getAllFrom('Spell');

    let results = [];
    for (let i = 0 ; i < allSpells.length ; i++) {
        for (let j = 0 ; j < allSpells[i].raw.level.length ; j++) {
            if (allSpells[i].raw.level[j].clazz === clazz) {
                results.push(allSpells[i]);
                break;
            }
        }
    }
    return results;
}