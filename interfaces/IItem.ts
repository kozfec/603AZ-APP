import { ICarInformation } from "./ICarInformation";
import { IOil } from "./IOil";

export interface IItem {
    carReg: string,
    carMake: string,
    carModel: string,
    carInformation: ICarInformation,
    carYear: string,
    oilChange?: IOil[],
    /*oilChange: [{
        dateChanged: string,
        mileageChanged: string,
        oilUsed: string,
        oilFilter: string,
    }]*/
    
};
