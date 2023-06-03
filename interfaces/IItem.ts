import { ICarInformation } from "./ICarInformation";

export interface IItem {
    carReg: string,
    carMake: string,
    carModel?: string,
    carInformation: ICarInformation,

};
