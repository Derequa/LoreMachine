import React from 'react';
import { colors } from '../colors';
import { Linking } from 'react-native';
import { 
    Container,
    Header,
    Content,
    View, 
    DeckSwiper,
    Drawer,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Title,
    Left,
    Right,
    Body,
    Icon,
    Button,
    Fab,
    List,
    ListItem,
} from 'native-base';

const repoUrl = 'https://github.com/Derequa/LoreMachine';

export default class UnderDevelopmentScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container>
            <Header style={{ height: 0, backgroundColor: colors.orangeLight, }} androidStatusBarColor={colors.orangeLight} iosBarStyle='light-content' />
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.orangeLight}}>
                <Text style={{
                    color: colors.white,
                    fontSize: 36,
                    fontWeight: '900',
                    textAlign: 'center',
                    textShadowColor: colors.greyDark,
                    textShadowOffset: {width: 1, height: 1},
                    textShadowRadius: 5,
                }}>THIS APP DOES NOT WORK (YET)</Text>
                <Text style={{
                    color: colors.white,
                    fontSize: 16,
                    fontWeight: 'normal',
                    textAlign: 'center',
                    textShadowColor: colors.greyDark,
                    textShadowOffset: {width: 1, height: 1},
                    textShadowRadius: 5,
                }}>Check on our progress at:</Text>
                <Text 
                style={{
                    color: colors.tealLight,
                    fontSize: 16,
                    textDecorationLine: 'underline',
                    textShadowColor: colors.tealLight,
                    fontWeight: 'normal',
                    textAlign: 'center',
                }}
                onPress={() => { Linking.openURL(repoUrl) }}>{repoUrl}</Text>
            </View>
            </Container>
        );
    }
}