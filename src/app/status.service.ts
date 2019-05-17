import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StatusService {
    public status = '';
    public statusIndex = [
        '',
        'No Posts left',
        'Post deleted',

    ];
    constructor() {
    }

    clearStatus() {
        this.status = this.statusIndex[0];
    }

    noPostsLeft() {
        return this.status = this.statusIndex[1];
    }

    deletedPost() {
        return this.status = this.statusIndex[2];
    }
}
