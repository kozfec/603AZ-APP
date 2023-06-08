import { ICarInformation } from "./ICarInformation";
import { IOil } from "./IOil";

export interface IItem {
    carReg: string,
    carMake: string,
    carModel: string,
    carInformation: ICarInformation,
    carYear: string,

};
