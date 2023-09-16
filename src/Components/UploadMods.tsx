import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import parseCSV from "../functions/parseCSV";
import fetchFiles from "../functions/fetchFiles";
import modParsed from "../interfaces/modParsed";
import React from "react";
import SettingsInterface from "../interfaces/Settings";

export default function UploadMods({
                                       setMods,
                                       settings,
                                   }: { setMods: (mods: modParsed[]) => void, settings: SettingsInterface }) {
    const fileRef = React.useRef<HTMLInputElement>(null);
    return <Card className={"w-1/4"}>
        <CardHeader>
            <p className={"text-center w-full"}>
                Upload
            </p>
        </CardHeader>
        <CardBody>
            <Input
                type={"file"}
                ref={fileRef}
                accept={".csv"}
                onChange={async (e) => {
                    if (settings.token === "") return alert("Please enter a token in the settings tab.");
                    const parsed = await parseCSV(e.target.files?.[0] as File);

                    await Promise.allSettled(parsed.map(async (mod) => {
                        if (!mod.URL.endsWith("?tab=files")) mod.URL += "?tab=files";
                        const files = await fetchFiles(mod.URL, settings.token);
                        const parsedMod: modParsed = {
                            Name: mod.Name,
                            URL: mod.URL,
                            Categories: files,
                        };
                        return parsedMod;
                    })).then((results) => {
                        // @ts-ignore
                        const mods = results.filter((result) => result.status === "fulfilled").map((result) => result.value);
                        setMods(mods);
                    });
                }
                }
                onClick={(e) => {
                    if (settings.token === "") {
                        e.preventDefault();
                        alert("Please enter a token in the settings tab.");
                        return;
                    }
                    e.currentTarget.value = "";
                }}
            />
        </CardBody>
    </Card>;
}
