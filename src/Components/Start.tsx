import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";

export default function Start({ onStart }: { onStart: () => void }) {
    return <Card className={"w-1/4"}>
        <CardHeader>
            <p className={"text-center w-full"}>
                Start
            </p>
        </CardHeader>
        <CardBody>
            <Button onClick={onStart}> Start Downloading!</Button>
        </CardBody>
    </Card>;
};