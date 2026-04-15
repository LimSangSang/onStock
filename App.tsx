import React, { useRef } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const TARGET_URL = 'https://onstock.me/';

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const canGoBackRef = useRef(false);

  React.useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBackRef.current) {
        webViewRef.current?.goBack();
        return true;
      }
      return false;
    });
    return () => handler.remove();
  }, []);

  const handleNavigationStateChange = (state: WebViewNavigation) => {
    canGoBackRef.current = state.canGoBack;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <StatusBar style="light" backgroundColor="#080c14" />
        <WebView
          ref={webViewRef}
          source={{ uri: TARGET_URL }}
          onNavigationStateChange={handleNavigationStateChange}
          javaScriptEnabled
          domStorageEnabled
          allowsBackForwardNavigationGestures
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          bounces={false}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080c14',
  },
});
