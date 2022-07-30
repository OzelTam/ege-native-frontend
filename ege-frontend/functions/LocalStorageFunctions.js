import AsyncStorage from '@react-native-async-storage/async-storage';

const activeProfileKey = "active-profile";
const profilesKey = "profiles";
const activeTranscriptKey = "active-transcript";
const activeGradesKey = "active-grades";
const activeWeeklyKey = "active-weekly";
const saveFormat = async (obj) => {
    let activeProfile = await LoadActiveProfile();
    let id = activeProfile.aboutMe.TC_Kimlik_No;
    return {
        key: id,
        object: obj
    }
}
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
    let profiles = JSON.parse(profilesString);
    if (!Array.isArray(profiles))
        return [];
    else
        return profiles;
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
    profiles = Array.isArray(profiles) ? profiles : [];
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

    let activeProfile = await LoadActiveProfile();
    if (activeProfile && activeProfile.TC_Kimlik_No === TC_Kimlik_No) {
        await ClearActives();
        await SaveActiveProfile(null);
    }
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
    let id = activeProfile.aboutMe.TC_Kimlik_No;
    await AsyncStorage.setItem(key, JSON.stringify(object));
}

const SaveActiveTranscript = async (transcript) => {
    transcript = await saveFormat(transcript);
    await SaveActiveCache(activeTranscriptKey, JSON.stringify(transcript));
}

const LoadMatchedCache = async (loadedJSONStr) => {

    let activeProfile = await LoadActiveProfile();

    if (!activeProfile)
        return null;
    if (!loadedJSONStr)
        return null;

    let loadedJSON = JSON.parse(loadedJSONStr);
    let loaded = JSON.parse(loadedJSON);

    if (loaded.key !== activeProfile.aboutMe.TC_Kimlik_No)
        return null;
    return loaded.object;
}

const LoadActiveTranscript = async () => {
    let transcriptString = await AsyncStorage.getItem(activeTranscriptKey);
    let transcript = await LoadMatchedCache(transcriptString);
    return transcript;
}

const SaveActiveGrades = async (grades) => {
    grades = await saveFormat(grades);
    await SaveActiveCache(activeGradesKey, JSON.stringify(grades));
}

const LoadActiveGrades = async () => {
    let gradesString = await AsyncStorage.getItem(activeGradesKey);
    let grades = await LoadMatchedCache(gradesString);
    return grades;
}

const SaveActiveWeekly = async (weekly) => {
    weekly = await saveFormat(weekly);
    await SaveActiveCache(activeWeeklyKey, JSON.stringify(weekly));
}

const LoadActiveWeekly = async () => {
    let weeklyString = await AsyncStorage.getItem(activeWeeklyKey);
    let weekly = await LoadMatchedCache(weeklyString);
    return weekly;
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
    DeleteActiveProfile,
    ClearActives
};  