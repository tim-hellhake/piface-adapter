/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */

import { Device } from 'gateway-addon';
import { PiFace } from './piface';
import { InputProperty } from './input-property';
import { OutputProperty } from './output-property';

export class PiFaceDevice extends Device {
    private inputProperties: InputProperty[] = [];

    constructor(adapter: any, private piface: PiFace) {
        super(adapter, 'piface');
        this['@context'] = 'https://iot.mozilla.org/schemas/';
        this['@type'] = [];
        this.name = 'PiFace';

        for (let i = 0; i < 8; i++) {
            const inputProperty = new InputProperty(this, i);
            this.inputProperties.push(inputProperty);
            this.properties.set(inputProperty.name, inputProperty);

            const outputProperty = new OutputProperty(this, i, this.piface);
            this.properties.set(outputProperty.name, outputProperty);
        }

        setInterval(async () => {
            const inputs = await piface.getInputs();

            for (let i = 0; i < 8; i++) {
                this.inputProperties[i]?.setCachedValueAndNotify(inputs[i]);
            }
        }, 500);
    }
}
