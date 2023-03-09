export interface inputNewCompany {
    NIT: string;
    companyName: string;
    address: string;
    phone?: string;
}

type partialCompany = Partial<inputNewCompany>

export interface inputUpdatedCompany extends partialCompany { }

export interface ICompany extends inputNewCompany {
    NIT: string;
}