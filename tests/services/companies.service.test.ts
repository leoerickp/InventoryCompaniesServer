import { Company } from '../../src/models/company';
import { CompaniesService } from '../../src/services/companies.service';


const companiesService = new CompaniesService();

describe('CompaniesService testing', () => {
    test('should be get an array with company list', async () => {
        jest.spyOn(Company, 'findAndCountAll')
            .mockImplementation(() => ({ count: mockTestingData.count, rows: mockTestingData.companies } as any));
        const result = await companiesService.getAll({});
        expect(result).toEqual(mockTestingData);
    })
    test('should find one company', async () => {
        jest.spyOn(Company, 'findByPk').mockImplementation(() => mockTestingData.companies[0] as any);
        expect(await companiesService.getOneByNIT("ABX1234525889"))
            .toEqual(mockTestingData.companies[0])
    })
    test('should update one company', async () => {
        const modifiedField = { companyName: 'Company AAAA1234525889' }
        const updatedCompany = { ...mockTestingData.companies[0], ...modifiedField }
        const company = {
            update() {
                return { ...mockTestingData.companies[0], ...modifiedField }
            }
        }
        jest.spyOn(companiesService, 'getOneByNIT').mockImplementation(() => company as any);
        expect(await companiesService.update("ABX1234525889", { companyName: 'Company AAAA1234525889' }))
            .toEqual({ ...mockTestingData.companies[0], companyName: 'Company AAAA1234525889' });
    })
    test('should remove one company', async () => {

        const company = {
            destroy() {
                return mockTestingData.companies[0];
            }
        }
        jest.spyOn(companiesService, 'getOneByNIT').mockImplementation(() => company as any);
        expect(await companiesService.remove("ABX1234525889")).toEqual(mockTestingData.companies[0])
    })
});

const mockTestingData = {
    "count": 100,
    "companies": [
        {
            "NIT": "ABX1234525889",
            "companyName": "Company ABX1234525889",
            "address": "Street Carl Washinton 10, Washinton-DC",
            "phone": "(+1)79525999-26664",
            "createdAt": "2023-03-08T04:20:13.716Z",
            "updatedAt": "2023-03-08T04:20:13.716Z"
        },
        {
            "NIT": "ABX1234525890",
            "companyName": "Company ABX1234525890",
            "address": "Street Carl Washinton 20, Washinton-DC",
            "phone": "(+1)79525999-26664",
            "createdAt": "2023-03-08T04:20:13.717Z",
            "updatedAt": "2023-03-08T04:20:13.717Z"
        },
        {
            "NIT": "ABX1234525891",
            "companyName": "Company ABX1234525891",
            "address": "Street Carl Washinton 30, Washinton-DC",
            "phone": "(+1)79525999-26664",
            "createdAt": "2023-03-08T04:20:13.717Z",
            "updatedAt": "2023-03-08T04:20:13.717Z"
        },
        {
            "NIT": "ABX1234525892",
            "companyName": "Company ABX1234525892",
            "address": "Street Carl Washinton 40, Washinton-DC",
            "phone": "(+1)79525999-26664",
            "createdAt": "2023-03-08T04:20:13.717Z",
            "updatedAt": "2023-03-08T04:20:13.717Z"
        },
        {
            "NIT": "ABX1234525894",
            "companyName": "Company ABX1234525894",
            "address": "Street Carl Washinton 60, Washinton-DC",
            "phone": "(+1)79525999-26664",
            "createdAt": "2023-03-08T04:20:13.717Z",
            "updatedAt": "2023-03-08T04:20:13.717Z"
        },
        {
            "NIT": "ABX1234525893",
            "companyName": "Company ABX1234525893",
            "address": "Street Carl Washinton 50, Washinton-DC",
            "phone": "(+1)79525999-26664",
            "createdAt": "2023-03-08T04:20:13.717Z",
            "updatedAt": "2023-03-08T04:20:13.717Z"
        },
        {
            "NIT": "ABX1234525896",
            "companyName": "Company ABX1234525896",
            "address": "Street Carl Washinton 80, Washinton-DC",
            "phone": "(+1)79525999-26664",
            "createdAt": "2023-03-08T04:20:13.718Z",
            "updatedAt": "2023-03-08T04:20:13.718Z"
        },
        {
            "NIT": "ABX1234525898",
            "companyName": "Company ABX1234525898",
            "address": "Street Carl Washinton 100, Washinton-DC",
            "phone": "(+1)79525999-26664",
            "createdAt": "2023-03-08T04:20:13.719Z",
            "updatedAt": "2023-03-08T04:20:13.719Z"
        },
        {
            "NIT": "ABX1234525897",
            "companyName": "Company ABX1234525897",
            "address": "Street Carl Washinton 90, Washinton-DC",
            "phone": "(+1)79525999-26664",
            "createdAt": "2023-03-08T04:20:13.718Z",
            "updatedAt": "2023-03-08T04:20:13.718Z"
        },
        {
            "NIT": "ABX1234525899",
            "companyName": "Company ABX1234525899",
            "address": "Street Carl Washinton 110, Washinton-DC",
            "phone": "(+1)79525999-26664",
            "createdAt": "2023-03-08T04:20:13.719Z",
            "updatedAt": "2023-03-08T04:20:13.719Z"
        }
    ]
}