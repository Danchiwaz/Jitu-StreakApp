export class CalculateDays {
    public endDate: string;

    constructor(end: string) {
        this.endDate = end;
    }

    public getTimeDifference(): number {
        return Math.abs(new Date().getDate() - new Date(this.endDate).getDate());
    }
}
