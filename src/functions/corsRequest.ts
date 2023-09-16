export default function corsRequest(url: string, token: string) {
    return fetch(`bypassCors/${url.replace("https://", "")}`, { headers: { "Authorization": token } });
}