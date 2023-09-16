export async function onRequest({ request }) {
    let rURL = new URL(request.url);
    console.log(rURL);
    const sid_develop = request.headers.get("Authorization");
    let newUrl = "https://" + request.url.replace(rURL.origin + "/bypassCors/", "");
    console.log(newUrl);
    let Req = new Request(newUrl, request);
    Req.headers.has("origin") && Req.headers.delete("origin");
    Req.headers.has("referer") && Req.headers.delete("referer");
    let n = await fetch(Req, { headers: { Cookie: `sid_develop=${sid_develop}` } });
    return n = new Response(n.body, n), n.headers.set("access-control-allow-origin", "*"), n.headers.set("access-control-allow-headers", "*"), n;
}