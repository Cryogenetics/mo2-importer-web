import fetchNMM from "./fetchNMM";

export default function downloadMods(modLinks: string[], token: string) {
    return Promise.allSettled(modLinks.map(url => fetchNMM(url, token)))
        .then(finished => finished
            ?.map(promise => promise.status !== "rejected" ? promise?.value : "ERROR")
            // eslint-disable-next-line
            ?.filter((url) => url !== "ERROR")?.map((url) => {
                window.open(url, "_blank");
            }));
}
