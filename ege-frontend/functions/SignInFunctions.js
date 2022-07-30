import { SaveActiveProfile, UpsertProfile } from "./LocalStorageFunctions";

const baseUrl = "https://ege-api.herokuapp.com/api";


const SignInUser = async (username, password, org = "ogrenci", path = "/auth") => {
    const url = baseUrl + path;
    let bodyJson = JSON.stringify({
        "username": username,
        "password": password,
        "organization": org
    });

    let apiResponse = await fetch(url,
        {
            method: "POST",
            body: bodyJson,
            headers: { "Content-Type": "application/json" }
        });


    let body = await apiResponse.json();
    if (apiResponse.status !== 200)
        throw body

    let profile = body;

    let cookie = apiResponse.headers.get("set-cookie");
    profile.cookie = cookie;

    await SaveActiveProfile(profile);
    await UpsertProfile(profile);

    return profile;


}



export {
    SignInUser
}
