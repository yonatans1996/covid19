import React from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";
import "./InfoBox.css";
import numeral from "numeral"

function InfoBox({title,cases,total,change}) {
    let color="";

    if(cases===0)
    {
        color=" green"
    }
    else if(cases>=100 && cases<1000)
    {
        color=" orange"
    }
    else if(cases>=1000)
    {
        color=" red"
    }

    return (
        <Card className={"infoBox"+color}>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary" >
                    {title}
                </Typography>
                <h2 className="infoBox__cases">+{numeral(cases).format(',')}</h2>
                <Typography className="infoBox__total" color="textSecondary">
                    {numeral(total).format("0a")} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox

