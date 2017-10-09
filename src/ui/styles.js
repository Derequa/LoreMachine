import { StyleSheet } from 'react-native';
import { colors } from './colors'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  //  backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 37,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 7, marginRight: 7,
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#0000FF',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white,
  },
  card_image: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FF0000',
    alignSelf: 'center',
  },
});