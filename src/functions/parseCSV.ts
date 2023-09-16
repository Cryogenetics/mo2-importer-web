import csvToJSON from "./csvToJSON";

interface parsedMod {
    Name: string;
    URL: string;
}

enum titleDict {
    "#Mod_Priority" = "Priority",
    "#Mod_Name" = "Name",
    "#Nexus_ID" = "ID",
    "#Mod_Nexus_URL\r" = "URL",
    "#Mod_Nexus_URL" = "URL",
}

export default function parseCSV(csvData: File): Promise<parsedMod[]> {
    return new Promise((resolve, reject) => {
        const reader: FileReader = new FileReader();
        reader.readAsText(csvData);
        reader.onloadend = async () => {
            const allModsParsed = csvToJSON(reader.result as string).map((modEntry: { [key: string]: string }) => {
                Object.entries(modEntry).filter(([key, value]) => {
                    return key && value;
                }).map(([key, value]) => {
                    if (titleDict[key as keyof typeof titleDict]) {
                        modEntry[titleDict[key as keyof typeof titleDict]] = value.trim().replaceAll("\"", "");
                        delete modEntry[key];
                    }
                    return modEntry;
                });
                const parsedKey: parsedMod = {
                    URL: modEntry["URL"],
                    Name: modEntry["Name"],
                };
                return parsedKey;
            });
            resolve(allModsParsed.filter(({ URL, Name }) => URL && Name));
        };
    });
}