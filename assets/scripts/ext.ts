interface Array<T> {
    remove(element: T): T[];
    trim(count: number): void;
    clear(): void;
}

if (!Array.prototype.remove) {
    Array.prototype.remove = function<T>(this: T[], element: T): T[] {
        const index = this.indexOf(element);
        if (index !== -1) {
            this.splice(index, 1);
        }
        return this;
    }
}

if (!Array.prototype.trim) {
    Array.prototype.trim = function(count: number){
        while (this.length > count) {
            this.shift();
        }
    }
}

if (!Array.prototype.clear) {
    Array.prototype.clear = function() {
        this.trim(0);
    }
}
