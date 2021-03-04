import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';

const TestFetch = () => {
  const status = (response) => {
    if (response.ok) return response;
    var error = new Error(response.statusText || response.status);
    error.response = response;
    throw error;
  };

  const [responseAsText, setResponseAsText] = useState('');
  const getNav = async () => {
    const navUrl =
      'http://yc-api.yoursclothing.com/api/navigation/v2/get?Token=9ba51c12-a444-458b-8a4c-d8ac6ffadfca&SiteName=Long Tall Sally&Language=ENG&NavigationName=Main-RNApp';
    const response = await fetch(navUrl)
      .then(status)
      .then((response) => response.json());
    setResponseAsText(JSON.stringify(response).toString());
  };
  getNav();

  console.log(responseAsText);
  if (responseAsText) return <View style={styles.container}>{<Text>{responseAsText}</Text>}</View>;
  return <Text>Loading ..........</Text>;
};

export default function App() {
  return (
    <ErrorBoundary>
      <TestFetch />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
