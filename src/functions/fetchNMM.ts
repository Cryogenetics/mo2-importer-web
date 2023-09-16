import corsRequest from "./corsRequest";

export default function fetchNMM(url: string, token: string): Promise<string> {
    return corsRequest(url, token).then((res) => res.text()).then((text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const nmmLink = doc.querySelector("#slowDownloadButton")?.getAttribute("data-download-url");
        return nmmLink ?? "ERROR";
    }).catch((e) => {
        return "ERROR";
    });
}