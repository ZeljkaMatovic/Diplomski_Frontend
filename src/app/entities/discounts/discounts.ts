export class DiscountGroup {
    id: number;
    serviceId: number;
    groupName: string;
    minPoints: number; // ako korisnik ima >= minPoints pripada grupi, osim u slucaju da pripada grupi s
    // sa vecim minPoints-om (group2.minPoints > group1.minPoints)
    discountPercentage: number; //0-100%;

    constructor(id: number, serviceId: number, name: string, points: number, percent: number)
    {
        this.id = id;
        this.serviceId = serviceId;
        this.groupName = name;
        this.minPoints = points;
        this.discountPercentage = percent;
    }
}
