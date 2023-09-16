import modsParsed from "../interfaces/categoryParsed";
import corsRequest from "./corsRequest";

export default async function fetchFiles(OGurl: string, token: string): Promise<modsParsed[]> {
    return await corsRequest(OGurl, token).then((res) =>
        res.text()).then((text) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        const categoryElements = doc.querySelectorAll("#mod_files > div");
        return Array.from(categoryElements || []).map((category) => {
            const catName = category.querySelector(".file-category-header > h2")?.textContent;
            const titleArray = Array.from(category.querySelectorAll(".accordionitems > .accordion > dt > div > p"));
            const urlArray = Array.from(category.querySelectorAll(".accordionitems > .accordion > dd > div > .accordion-downloads > li > a")).map((dd) => {
                // @ts-ignore
                return dd.href;
            }).filter((url => url.includes("&nmm=1"))).map((url) => {
                if (url.includes("/Core/Libs/Common/Widgets/ModRequirementsPopUp")) {
                    const mod_id = new URL(OGurl).pathname.split("/")[3];
                    const game = new URL(OGurl).pathname.split("/")[1];
                    const fid = new URL(url).searchParams.get("id");
                    return `https://www.nexusmods.com/${game}/mods/${mod_id}?tab=files&file_id=${fid}&nmm=1`;
                }
                return url;
            });
            return {
                category: catName as string, files: titleArray.map((title, i) => {
                    return {
                        name: title.textContent ?? "ERR",
                        url: urlArray[i] as string,
                    };
                }),
            };
        });
    }).catch((e) => {
        console.log(e);
        return [{ category: "", files: [{ name: "", url: "" }] }];
    });
};
