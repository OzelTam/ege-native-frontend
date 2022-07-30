import { LoadActiveGrades, LoadActiveProfile, LoadActiveTranscript, LoadActiveWeekly } from "./LocalStorageFunctions";
import { GetGrades, GetProfile, GetTranscript, GetWeekly } from "./ServiceFunctions";




const load = async (cookie, cacheLoader, loader, force = false) => {

    if (force) {
        let result = await loader(cookie)
        return result;
    }
    else {
        let cache = await cacheLoader();
        if (cache) {
            return cache;
        }
        else {
            let result = await loader(cookie)
            return result;
        }

    }
}


const retrive = async (service, cookie, force) => {
    let result = null;
    switch (service) {
        case "transcript":
            result = await load(cookie, LoadActiveTranscript, GetTranscript, force);
            break;
        case "grades":
            result = await load(cookie, LoadActiveGrades, GetGrades, force);
            break;
        case "weekly":
            result = await load(cookie, LoadActiveWeekly, GetWeekly, force);
            break;
        case "profile":
            result = await load(cookie, LoadActiveProfile, GetProfile, force);
            break;
        default:
            break;
    }
    return result;
}

const RetriveServices = async (activeProfile, servicesToRetrive = [], force = false) => {


    if (!activeProfile)
        return [];


    // #region formats requested services
    if ((Array.isArray(servicesToRetrive) && servicesToRetrive.length === 0) || !servicesToRetrive)
        servicesToRetrive = ["transcript", "grades", "weekly", "profile"];

    if (!Array.isArray(servicesToRetrive))
        servicesToRetrive = [servicesToRetrive];

    servicesToRetrive = servicesToRetrive.map(service => service.toLowerCase());
    // #endregion


    let cookie = activeProfile?.cookie;
    if (!cookie)
        return [];



    // #region requested service



    let results = [];

    for (let service of servicesToRetrive) {
        let result = await retrive(service, cookie, force);
        results.push(result);
    }

    if (results.length === 1)
        return results[0];

    return results;
}
// #endregion






export { RetriveServices }