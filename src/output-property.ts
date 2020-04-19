/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */

import { Property, Device } from 'gateway-addon';
import { PiFace } from './piface';

export class OutputProperty extends Property {
    constructor(device: Device, private index: number, private piface: PiFace) {
        super(device, `output${index}`, {
            '@type': 'OnOffProperty',
            type: 'boolean',
            title: `Output ${index}`
        });
    }

    async setValue(value: boolean): Promise<void> {
        super.setValue(value);
        this.piface.setOutput(this.index, value);
    }
}
