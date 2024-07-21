

export class UploadQueue {

    private queue: Array<() => Promise<void>> = [];
    private concurrentUploads = 3;
    private runningUploads = 0;

    addToQueue(uploadFunction: () => Promise<void>) {
        this.queue.push(uploadFunction);
        this.processQueue();
    }

    private async processQueue() {

        if (this.runningUploads >= this.concurrentUploads || this.queue.length === 0) {
            return;
        }

        this.runningUploads++;
        const uploadFunction = this.queue.shift()!;

        try {
            await uploadFunction();
        } catch (error) {
            throw 'La carga del archivo falló en UploadQueue';
        }

        this.runningUploads--;
        this.processQueue();
    }
}