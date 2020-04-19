/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */

import { Property, Device } from 'gateway-addon';

export class InputProperty extends Property {
    constructor(device: Device, index: number) {
        super(device, `input${index}`, {
            type: 'boolean',
            title: `Input ${index}`,
            readOnly: true
        });
    }
}
