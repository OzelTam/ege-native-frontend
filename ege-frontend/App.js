import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, NativeBaseProvider } from 'native-base';
import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ContextProvider } from './functions/GlobalStates';
import { RetriveServices } from './functions/LoaderFunctions';
import { LoadActiveProfile, LoadActiveTranscript, SaveActiveTranscript } from './functions/LocalStorageFunctions';
import ServicesScreen from './screens/ServicesScreen';
import SignInScreen from './screens/SignInScreen';

export default function App() {
  const [activeProfile, setActiveProfile] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [grades, setGrades] = useState(null);
  const [weeklySchedule, setWeeklySchedule] = useState(null);

  useEffect(() => {

    LoadActiveProfile().then(profile => {
      if (profile)
        setActiveProfile(profile);
    });
  }, []);

  const retrive = async (requested = [], forced = false) => {
    return RetriveServices(activeProfile, requested, forced);

  }


  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

      <NativeBaseProvider>

        <ContextProvider
          activeProfileState={[activeProfile, setActiveProfile]}
          gradesCacheState={[grades, setGrades]}
          weeklyScheduleCacheState={[weeklySchedule, setWeeklySchedule]}
          transcriptCacheState={[transcript, setTranscript]}
          RetriveFunction={retrive}
        >

          {
            activeProfile
              ? JSON.stringify(activeProfile) !== "{}"
                ? <ServicesScreen />
                : <SafeAreaView style={{ flex: 1 }}><SignInScreen /></SafeAreaView>
              : <SafeAreaView style={{ flex: 1 }}><SignInScreen /></SafeAreaView>
          }


        </ContextProvider>

      </NativeBaseProvider>
    </TouchableWithoutFeedback >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEDEDE',
  },
});
