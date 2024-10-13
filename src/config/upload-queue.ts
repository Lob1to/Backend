
/**
 * Manages a queue of upload functions and processes them concurrently up to a specified limit.
 */
export class UploadQueue {

    private queue: Array<() => Promise<void>> = [];
    private concurrentUploads = 3;
    private runningUploads = 0;
    /**
     * Adds an upload function to the queue and processes the queue.
     * @param uploadFunction - A function that returns a Promise representing the upload operation.
     */
    addToQueue(uploadFunction: () => Promise<void>) {
        this.queue.push(uploadFunction);
        this.processQueue();
    }

    /**
     * Processes the upload queue by executing upload functions concurrently up to the specified limit.
     */
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