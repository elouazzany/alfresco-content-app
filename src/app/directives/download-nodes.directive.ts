/*!
 * @license
 * Alfresco Example Content Application
 *
 * Copyright (C) 2005 - 2018 Alfresco Software Limited
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail.  Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

import { Directive, HostListener, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '../store/states/app.state';
import { MinimalNodeEntity } from 'alfresco-js-api';
import { DownloadNodesAction } from '../store/actions';

@Directive({
    selector: '[acaDownloadNodes]'
})
export class DownloadNodesDirective {
    // tslint:disable-next-line:no-input-rename
    @Input('acaDownloadNodes')
    nodes: Array<MinimalNodeEntity> | MinimalNodeEntity;

    constructor(private store: Store<AppStore>) {}

    @HostListener('click')
    onClick() {
        const targets = Array.isArray(this.nodes) ? this.nodes : [this.nodes];
        const toDownload = targets.map(node => {
            const { id, nodeId, name, isFile, isFolder } = node.entry;

            return {
                id: nodeId || id,
                name,
                isFile,
                isFolder
            };
        });

        this.store.dispatch(new DownloadNodesAction(toDownload));
    }
}
