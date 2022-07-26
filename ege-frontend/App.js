import { NativeBaseProvider } from 'native-base';
import { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ContextProvider } from './functions/GlobalStates';
import { LoadActiveProfile } from './functions/LocalStorageFunctions';
import ServicesScreen from './screens/ServicesScreen';
import SignInScreen from './screens/SignInScreen';

export default function App() {
  const [activeProfile, setActiveProfile] = useState(null);
  const [transcriptCache, setTranscriptCache] = useState(null);
  const [gradesCache, setGradesCache] = useState(null);
  const [weeklyScheduleCache, setWeeklyScheduleCache] = useState(null);





  useEffect(() => {
    LoadActiveProfile().then(profile => {
      setActiveProfile(profile);
    });
  }, []);


  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

      <NativeBaseProvider>

        <ContextProvider
          activeProfileState={[activeProfile, setActiveProfile]}
          gradesCacheState={[gradesCache, setGradesCache]}
          weeklyScheduleCacheState={[weeklyScheduleCache, setWeeklyScheduleCache]}
          transcriptCacheState={[transcriptCache, setTranscriptCache]}>

          {
            activeProfile
              ? JSON.stringify(activeProfile) !== "{}" ? <ServicesScreen />
                : <SafeAreaView><SignInScreen /></SafeAreaView>

              : <SafeAreaView><SignInScreen /></SafeAreaView>
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
