export async function onRequest({ request }) {
    let rURL = new URL(request.url);
    const sid_develop = request.headers.get("Authorization");
    let newUrl = "https://" + request.url.replace(rURL.origin + "/bypassCors/", "");
    let Req = new Request(newUrl, request);
    Req.headers.has("origin") && Req.headers.delete("origin");
    Req.headers.has("referer") && Req.headers.delete("referer");
    let res = await fetch(Req, { headers: { Cookie: `sid_develop=${sid_develop}` } });
    let newRes = new Response(res.body,res)
    newRes.headers.set("access-control-allow-origin", "*")
    newRes.headers.set("access-control-allow-headers", "*");
    return newRes;
}
