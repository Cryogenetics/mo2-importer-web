import React from "react";
import "./App.css";

import ModList from "./Components/ModList";
import modParsed from "./interfaces/modParsed";
import UploadMods from "./Components/UploadMods";
import Settings from "./Components/Settings";
import SettingsInterface from "./interfaces/Settings";
import Start from "./Components/Start";
import downloadMods from "./functions/DownloadMods";

function App() {
    const [mods, setMods] = React.useState<modParsed[]>([]);
    const [settings, setSettings] = React.useState<SettingsInterface>({ adultContent: false, token: "" });
    const [selectedMods, setSelectedMods] = React.useState<string[]>([]);
    return (

        <div className={"h-[calc(100vh)] pt-5"}>
            <div className={"flex justify-evenly g-2"}>
                {UploadMods({ setMods, settings })}
                {Settings({ settings, setSettings })}
                {Start({ onStart: () => downloadMods(selectedMods, settings.token) })}
            </div>
            <div>
                {ModList({ mods, selectedMods, setSelectedMods })}
            </div>
        </div>

    );
}

export default App;
