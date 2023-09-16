export default function csvToJSON(data: string) {
    const titles = data.slice(0, data.indexOf("\n")).split(",");
    return data
        .slice(data.indexOf("\n") + 1)
        .split("\n")
        .map(v => {
            const values = v.split(",");
            return titles.reduce(
                // eslint-disable-next-line
                (obj, title, index) => ((obj[title as keyof typeof obj] = values[index]), obj),
                {} as { [key: string]: string },
            );
        });
};
