import { configure } from '@testing-library/dom'
import React from 'react'
import "./InfoBox.css"
import {Card, CardContent, Typography} from '@material-ui/core';

function InfoBox(props) {
    return (
        <Card>
            <CardContent>
                <Typography color = "SecondaryText">
                    {props.title}
                </Typography>
            {/*} <Typography color = "SecondaryText">
                    {props.daily}
    </Typography> */}
                <h2> {props.daily} </h2>
                <Typography color = "SecondaryText">
                    {props.total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
