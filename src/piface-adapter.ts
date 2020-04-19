/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */

import { Adapter } from 'gateway-addon';
import { open } from './piface';
import { PiFaceDevice } from './piface-device';

export class PiFaceAdapter extends Adapter {
    constructor(addonManager: any, manifest: any) {
        super(addonManager, PiFaceAdapter.name, manifest.name);
        addonManager.addAdapter(this);
        this.init();
    }

    async init() {
        const piface = await open();
        const device = new PiFaceDevice(this, piface);
        this.handleDeviceAdded(device);
    }
}
