import AsyncStorage from '@react-native-async-storage/async-storage';

const activeProfileKey = "active-profile";
const profilesKey = "profiles";
const activeTranscriptKey = "active-transcript";
const activeGradesKey = "active-grades";
const activeWeeklyKey = "active-weekly";
const cookiesStringKey = "cookies-string";

const LoadActiveProfile = async () => {
    let savedProfileString = await AsyncStorage.getItem(activeProfileKey)
    if (savedProfileString === "{}")
        return null;
    else
        return JSON.parse(savedProfileString);
}

const SaveActiveProfile = async (profile) => {
    await AsyncStorage.setItem(activeProfileKey, JSON.stringify(profile));
}


const LoadProfiles = async () => {
    let profilesString = await AsyncStorage.getItem(profilesKey);
    if (profilesString === null)
        return [];
    else
        return JSON.parse(profilesString);
}

const LoadProfile = async (TC_Kimlik_No) => {
    let profiles = LoadProfiles();
    return profiles.find(profile => profile.TC_Kimlik_No === TC_Kimlik_No);
}

const SaveProfiles = async (profiles) => {
    await AsyncStorage.setItem(profilesKey, JSON.stringify(profiles));
}

const UpsertProfile = async (profile) => {
    let profiles = await LoadProfiles();
    let matchedProfileIndex = profiles.findIndex(p => p.TC_Kimlik_No === profile.TC_Kimlik_No);
    if (matchedProfileIndex === -1) {
        profiles.push(profile);
    } else {
        profiles[matchedProfileIndex] = profile;
    }
    await SaveProfiles(profiles);
}

const DeleteProfile = async (TC_Kimlik_No) => {
    let profiles = await LoadProfiles();
    let matchedProfileIndex = profiles.findIndex(p => p.TC_Kimlik_No === TC_Kimlik_No);
    if (matchedProfileIndex !== -1) {
        profiles.splice(matchedProfileIndex, 1);
    }
    await SaveProfiles(profiles);
}

const DeleteActiveProfile = async () => {
    let activeProfile = await LoadActiveProfile();
    if (activeProfile) {
        await DeleteProfile(activeProfile.TC_Kimlik_No);
        await ClearActives();
    }
}

const ClearActives = async () => {
    await AsyncStorage.removeItem(activeProfileKey);
    await AsyncStorage.removeItem(activeTranscriptKey);
    await AsyncStorage.removeItem(activeGradesKey);
    await AsyncStorage.removeItem(activeWeeklyKey);
}

const SwitchActiveProfile = async (TC_Kimlik_No) => {
    let profile = await LoadProfile(TC_Kimlik_No);
    if (profile === null) {
        throw new { message: "Profil Bulunamadı" };
    }
    await ClearActives();
    await SaveActiveProfile(profile);
}

const SaveActiveCache = async (key, object) => {
    let activeProfile = await LoadActiveProfile();
    object = { key: activrProfile.TC_Kimlik_No, object: object };
    await AsyncStorage.setItem(key, JSON.stringify(object));
}

const SaveActiveTranscript = async (transcript) => {
    await SaveActiveCache(activeTranscriptKey, transcript);
}

const LoadMatchedCache = async (loadedJSONStr) => {
    let activeProfile = await LoadActiveProfile();
    if (!activeProfile)
        return null;
    if (loadedJSONStr === "{}")
        return null;

    let loadedJSON = JSON.parse(loadedJSONStr);
    if (loadedJSON.key !== activeProfile.TC_Kimlik_No)
        return null;
    return loadedJSON.object;
}

const LoadActiveTranscript = async () => {
    let transcriptString = await AsyncStorage.getItem(activeTranscriptKey);
    let transcript = await LoadMatchedCache(transcriptString);
    return transcript;
}

const SaveActiveGrades = async (grades) => {
    await SaveActiveCache(activeGradesKey, grades);
}

const LoadActiveGrades = async () => {
    let gradesString = await AsyncStorage.getItem(activeGradesKey);
    let grades = await LoadMatchedCache(gradesString);
    return grades;
}

const SaveActiveWeekly = async (weekly) => {
    await SaveActiveCache(activeWeeklyKey, weekly);
}

const LoadActiveWeekly = async () => {
    let weeklyString = await AsyncStorage.getItem(activeWeeklyKey);
    let weekly = await LoadMatchedCache(weeklyString);
    return weekly;
}

const SaveCokiesString = async (cookiesString) => {
    await AsyncStorage.setItem(cookiesStringKey, cookiesString);
}
const LoadCookieString = async () => {
    let cookiesString = await AsyncStorage.getItem(cookiesStringKey);
    return cookiesString;
}


export {
    LoadActiveProfile, // Loads the active profile from local storage
    SaveActiveProfile, // Sets the active profile to local storage
    LoadProfiles, // Loads all profiles from local storage
    LoadProfile, // Loads a profile by TC_Kimlik_No from local storage
    UpsertProfile, // Upserts a profile to profiles list in storage (if it doesn't exist, it adds it)
    DeleteProfile, // Deletes a profile from profiles by TC_Kimlik_No in storage
    SwitchActiveProfile, // Switches the active profile with TC_Kimlik_No
    SaveActiveTranscript, // Sets the active transcript in storage
    LoadActiveTranscript, // Loads the active transcript from storage
    SaveActiveGrades, // Sets the active grades in storage
    LoadActiveGrades,  // Loads the active grades from storage
    SaveActiveWeekly,  // Sets the active weekly in storage
    LoadActiveWeekly, // Loads the active weekly from storage
    SaveCokiesString,
    LoadCookieString,
    DeleteActiveProfile
};  