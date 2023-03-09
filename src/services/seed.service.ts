import { USERS } from '../data/seed.data';
import { UsersService } from './users.service';
import { Company, Item, User } from '../models';
import { CompaniesService } from './companies.service';
import { ItemsService } from './items.service';
import { ICompany } from '../interfaces/company.interface';
import { RandomInt } from '../helpers/random-int';
import { IItem } from '../interfaces/item.interface';

export class SeedService {
    constructor(
        private usersService: UsersService,
        private companiesService: CompaniesService,
        private itemsService: ItemsService
    ) { }
    public async createSeed() {
        await this.createTables();
        this.setTableConstrains();

    }

    private setTableConstrains() {
        Company.hasMany(Item, { foreignKey: 'NIT', onDelete: 'RESTRICT', onUpdate: 'RESTRICT' });
        Item.belongsTo(Company, { foreignKey: 'NIT' });
    }


    private async createTables() {
        try {
            await User.sync({ force: true });
            await this.loadUsers();
            await Company.sync({ force: true });
            const companies = await this.loadCompanies();
            await Item.sync({ force: true });
            await this.loadItems(companies);
        } catch (error) {
            throw new Error('Error creating tables in the database');
        }
    }

    private async loadUsers(): Promise<string[]> {

        let userIds: string[] = [];
        try {
            for (const user of USERS) {
                const newUser = await this.usersService.create(user);
                userIds.push(newUser?.id as string);
            }
        } catch (error) {
            throw new Error('Error loading data to the database');
        }
        return userIds
    }

    private async loadCompanies() {
        const companyPromises = [];
        for (let i = 1; i <= 100; i++) {
            const NIT = `ABX${1234525888 + i}`;
            companyPromises.push(this.companiesService.create({
                NIT,
                companyName: `Company ${NIT}`,
                address: `Street Carl Washinton ${i * 10}, Washinton-DC`,
                phone: '(+1)79525999-26664'
            }))
        }
        return await Promise.all(companyPromises);
    }

    private async loadItems(companies: (ICompany | undefined)[]) {
        const itemsPromises: Promise<IItem | undefined>[] = [];
        companies?.map(company => {
            const numberOfItems = RandomInt(100);
            for (let i = 1; i <= numberOfItems; i++) {
                itemsPromises.push(this.itemsService.create({
                    itemName: `Item XYZ-${100 + i}-${1000 + i * 10}`,
                    amount: RandomInt(50),
                    NIT: company?.NIT || 'ABDC',
                }));
            }
        });
        await Promise.all(itemsPromises);
    }

}