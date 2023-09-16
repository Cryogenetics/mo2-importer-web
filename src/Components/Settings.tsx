import { Card, CardBody, CardHeader, Input, Tooltip } from "@nextui-org/react";
import React from "react";
import SettingsInterface from "../interfaces/Settings";

export default function Settings({
                                     settings,
                                     setSettings,
                                 }: { settings: SettingsInterface, setSettings: (settings: SettingsInterface) => void }) {
    return <Card className={"w-1/4"}>
        <CardHeader>
            <p className={"text-center w-full"}>
                Settings
            </p>
        </CardHeader>
        <CardBody>
            <Tooltip
                content={"MO2 restricts downloads to the account that created the download. This means in order for this tool to function, it needs to impersonate the account that is signed into mo2. This token is not stored and the source is available to look through / host yourself."}>
                <Input name={"sid_develop"} type={"password"} label={"SID_develop"}
                       onValueChange={(e) => setSettings({ ...settings, token: e })}></Input>
            </Tooltip>
        </CardBody>
    </Card>;
};