import React from 'react';
import {
    Content,
    Text,
    Title,
    H1, H2, H3,
    View,
} from 'native-base';
import {
    Table,
    TableWrapper,
    Row,
    Rows,
    Col,
    Cols,
    Cell
} from 'react-native-table-component';
import {
    StyleSheet,
} from 'react-native';
import { colors } from '../../../colors';

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { marginLeft: 5, color: colors.white },
    paragraph: { color: colors.white, padding: 10 },
    sectionHeader: { color: colors.white, padding: 15 },
    tableHeader: { marginLeft: 5 },
    row: { height: 30 }
})
const miscModifiers_tableHead = [ 'Acrobatics Modifiers', 'DC Modifier' ];
const miscModifiers_tableData = [
    [ 'Lightly Obstructed (gravel, sand)', '+2' ],
    [ 'Severely Obstructed (cavern, rubble)', '+5' ],
    [ 'Slightly Slippery (wet)', '+2' ],
    [ 'Severely Slippery (icy)', '+5' ],
    [ 'Slightly Sloped (<45°)', '+2' ],
    [ 'Severely Sloped (>45°)', '+5' ],
    [ 'Slightly Unsteady (boat in rough water)', '+2' ],
    [ 'Mildly Unsteady (boat in a storm)', '+5' ],
    [ 'Severely Unsteady (earthquake)', '+10' ],
    [ 'Move at full speed on narrow or uneven surfaces', '+5*' ],
];

export default class Acrobatics extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Content>
                <Title>{`Acrobatics (Dex; Armor Check Penalty)\n`}</Title>
                <Text style={styles.paragraph}>{
                `You can keep your balance while traversing narrow or treacherous surfaces. You can also dive, flip, jump, and roll, avoiding attacks and confusing your opponents.\n
                The following modifiers apply to all Acrobatics skill checks. The modifiers stack with one another, but only the most severe modifier for any given condition applies.\n\n`
                }</Text>
                <H3 style={styles.sectionHeader}>{`Table: Misc. Acrobatics Modifiers\n`}</H3>
                <Table>
                    <Row data={miscModifiers_tableHead} style={styles.head} textStyle={styles.tableHeader}/>
                    <Rows data={miscModifiers_tableData} style={styles.row} textStyle={styles.text}/>
                </Table>
                <Text style={styles.text}>{`\n* This does not apply to checks made to jump.`}</Text>
            </Content>
        );
    }
}