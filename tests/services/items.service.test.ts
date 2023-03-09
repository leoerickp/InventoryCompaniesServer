import { Item } from '../../src/models/item';
import { ItemsService } from '../../src/services/items.service';

const itemsService = new ItemsService();
describe('ItemsService testing', () => {
    test('should be get an array with item list by a NIT', async () => {
        const NIT = "ABX1234525889";
        jest.spyOn(Item, 'findAndCountAll')
            .mockImplementation(() => ({ count: mockTestingData.count, rows: mockTestingData.items } as any));
        const result = await itemsService.getAllByNIT(NIT, {});
        expect(result).toEqual(mockTestingData);
    })
    test('should find one item', async () => {
        jest.spyOn(Item, 'findByPk').mockImplementation(() => mockTestingData.items[0] as any);
        expect(await itemsService.getOne("eee191b9-b0f8-47a9-9ff0-0711f0167833"))
            .toEqual(mockTestingData.items[0])
    })
    test('should update one company', async () => {
        const modifiedField = { companyName: 'Item AAAA1234525889' }
        const updatedCompany = { ...mockTestingData.items[0], ...modifiedField }
        const item = {
            update() {
                return { ...mockTestingData.items[0], ...modifiedField }
            }
        }
        jest.spyOn(itemsService, 'getOne').mockImplementation(() => item as any);
        expect(await itemsService.update("eee191b9-b0f8-47a9-9ff0-0711f0167833", { itemName: 'Item AAAA1234525889' }))
            .toEqual({ ...mockTestingData.items[0], companyName: 'Item AAAA1234525889' });
    })
    test('should remove one company', async () => {

        const item = {
            destroy() {
                return mockTestingData.items[0];
            }
        }
        jest.spyOn(itemsService, 'getOne').mockImplementation(() => item as any);
        expect(await itemsService.remove("ABX1234525889")).toEqual(mockTestingData.items[0])
    })
});

const mockTestingData = {
    "count": 78,
    "items": [
        {
            "id": "eee191b9-b0f8-47a9-9ff0-0711f0167833",
            "itemName": "Item XYZ-101-1010",
            "amount": 39,
            "NIT": "ABX1234525889",
            "createdAt": "2023-03-08T04:43:28.281Z",
            "updatedAt": "2023-03-08T04:43:28.281Z"
        },
        {
            "id": "e9048f9d-2ea0-4f8f-8e4b-fbc508c14fb7",
            "itemName": "Item XYZ-103-1030",
            "amount": 0,
            "NIT": "ABX1234525889",
            "createdAt": "2023-03-08T04:43:28.281Z",
            "updatedAt": "2023-03-08T04:43:28.281Z"
        },
        {
            "id": "f2415ca7-161e-4333-889e-0eae16355c78",
            "itemName": "Item XYZ-102-1020",
            "amount": 1,
            "NIT": "ABX1234525889",
            "createdAt": "2023-03-08T04:43:28.281Z",
            "updatedAt": "2023-03-08T04:43:28.281Z"
        },
        {
            "id": "eedb56ce-7872-4f92-ab72-e80673c7d714",
            "itemName": "Item XYZ-105-1050",
            "amount": 22,
            "NIT": "ABX1234525889",
            "createdAt": "2023-03-08T04:43:28.281Z",
            "updatedAt": "2023-03-08T04:43:28.281Z"
        },
        {
            "id": "93332173-b58b-42d6-a178-ab441635eff2",
            "itemName": "Item XYZ-104-1040",
            "amount": 23,
            "NIT": "ABX1234525889",
            "createdAt": "2023-03-08T04:43:28.281Z",
            "updatedAt": "2023-03-08T04:43:28.281Z"
        },
        {
            "id": "b700ecce-d689-4a72-9c91-3654403eefa4",
            "itemName": "Item XYZ-107-1070",
            "amount": 10,
            "NIT": "ABX1234525889",
            "createdAt": "2023-03-08T04:43:28.282Z",
            "updatedAt": "2023-03-08T04:43:28.282Z"
        },
        {
            "id": "3cbd58e1-45fd-4658-bfc4-8e1ac7792656",
            "itemName": "Item XYZ-108-1080",
            "amount": 30,
            "NIT": "ABX1234525889",
            "createdAt": "2023-03-08T04:43:28.282Z",
            "updatedAt": "2023-03-08T04:43:28.282Z"
        },
        {
            "id": "9b8a4e8c-2bc7-4ee2-9e25-d66799a4fce7",
            "itemName": "Item XYZ-110-1100",
            "amount": 22,
            "NIT": "ABX1234525889",
            "createdAt": "2023-03-08T04:43:28.282Z",
            "updatedAt": "2023-03-08T04:43:28.282Z"
        },
        {
            "id": "07096139-e7b9-4791-ac43-fc0294daf34d",
            "itemName": "Item XYZ-111-1110",
            "amount": 36,
            "NIT": "ABX1234525889",
            "createdAt": "2023-03-08T04:43:28.282Z",
            "updatedAt": "2023-03-08T04:43:28.282Z"
        },
        {
            "id": "bc8288d7-d951-40d9-81bd-737db1ba776b",
            "itemName": "Item XYZ-112-1120",
            "amount": 44,
            "NIT": "ABX1234525889",
            "createdAt": "2023-03-08T04:43:28.282Z",
            "updatedAt": "2023-03-08T04:43:28.282Z"
        }
    ]
}