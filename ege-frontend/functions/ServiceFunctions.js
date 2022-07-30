const baseUrl = "https://ege-api.herokuapp.com/api";

const GetService = async (cookie, path) => {
    let url = baseUrl + path;
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Cookie": cookie
        }
    });

    let bodyText = await response.text();
    if (response.status !== 200)
        throw { message: bodyText, status: response.status };
    return JSON.parse(bodyText);
}



const GetTranscript = async (cookie, path = "/info/transcript") => {
    let transcript = await GetService(cookie, path);
    return transcript;
}

const GetGrades = async (cookie, path = "/info/grades") => {
    let grades = await GetService(cookie, path);
    return grades;
}

const GetWeekly = async (cookie, path = "/info/weekly") => {
    let weekly = await GetService(cookie, path);
    return weekly;
}

const GetProfile = async (cookie, path = "/info/aboutme") => {
    let profile = await GetService(cookie, path);
    return profile;
}



export { GetTranscript, GetGrades, GetWeekly, GetProfile }
