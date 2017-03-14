import { Font, Components } from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

export default class AppContainer extends React.Component {
  state = {
    assetsReady: false,
  };

  componentWillMount() {
    this._loadAssetsAsync();
  }

  _loadAssetsAsync = async () => {
    try {
      await Font.loadAsync(MaterialIcons.font);
    } catch (e) {
      // error caching font, not a big deal, will load on the fly
    } finally {
      this.setState({ assetsReady: true });
    }
  };

  render() {
    if (this.state.assetsReady) {
      return <App />;
    } else {
      return <Components.AppLoading />;
    }
  }
}

class App extends React.Component {
  state = {
    checked: true,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button raised icon={{ name: 'cached' }} title="RAISED WITH ICON" />
        <CheckBox
          title="Click Here"
          checked={this.state.checked}
          onPress={this._handlePressCheck}
        />
      </View>
    );
  }

  _handlePressCheck = () => {
    this.setState(state => ({ checked: !state.checked }));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
