import modParsed from "../interfaces/modParsed";
import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    ScrollShadow,
    Tab,
    Tabs,
} from "@nextui-org/react";
import parsedFile from "../interfaces/parsedFile";

export default function ModList({
                                    mods,
                                    selectedMods,
                                    setSelectedMods,
                                }: { mods: modParsed[], selectedMods: string[], setSelectedMods: (mods: string[]) => void }) {

    const handleFileToggle = (fileName: any) => {

        const isSelected = selectedMods.includes(fileName);
        if (isSelected) {
            setSelectedMods(selectedMods.filter((name) => name !== fileName));
        } else {
            setSelectedMods([...selectedMods, fileName]);
        }
    };

    return (
        <div className="w-full p-4">
            <Card>
                <CardHeader>
                    <p className={"text-center w-full"}>
                        Mod Importer
                    </p>
                </CardHeader>
                <CardBody className={"max-h-[calc(100vh-250px)]"}>
                    <ScrollShadow className={" scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-white/20"}>
                        {mods.map((mod) => (
                            ModSection({ mod, handleChange: handleFileToggle, selectedFiles: selectedMods })
                        ))}
                    </ScrollShadow>
                </CardBody>
            </Card>
            {/*{selectedFiles.map((file) => (*/}
            {/*    // <p>{file}</p>*/}
            {/*))}*/}
        </div>
    );
}

function ModSection({
                        mod,
                        handleChange,
                        selectedFiles,
                    }: { mod: modParsed, handleChange: (event: any) => void, selectedFiles: string[] }) {
    return (
        <Accordion title={mod.Name}>
            <AccordionItem title={mod.Name}>
                <Card className={"ps-5 bg-white/5"}>
                    <CardBody>

                        <Tabs>
                            {mod.Categories.map((category) => (
                                <Tab title={category.category}>
                                    <FileSection files={category.files} handleChange={handleChange}
                                                 selectedFiles={selectedFiles} />
                                </Tab>
                            ))}
                        </Tabs>
                    </CardBody>
                </Card>

            </AccordionItem>
        </Accordion>

    );
}

function FileSection({
                         files,
                         handleChange,
                         selectedFiles,
                     }: { files: parsedFile[], handleChange: (url: string) => void, selectedFiles: string[] }) {
    return (
        <div className="flex flex-wrap gap-x-5 ">
            {files.map((file) => (
                <Checkbox title={file.name} defaultSelected={selectedFiles.includes(file.url)}
                          onValueChange={() => handleChange(file.url)}> {file.name}</Checkbox>
            ))}
        </div>

    );
}