import { faker } from '@faker-js/faker';

export class utility {
    constructor() { }

    /**
    * Generates a random first name.
    * @returns A random first name.
    */
    generateRandomFirstName(): string {
        return faker.person.firstName();
    }

    /**
    * Generates a random last name.
    */
    generateRandomLastName(): string {
        return faker.person.lastName();
    }

    /**
    * Generates an email address with the given first and last names.
    * @param firstName - The first name.
    * @param lastName - The last name.
    */
    generateEmailWithGivenNames(firstName: string, lastName: string): string {
        return `${firstName}.${lastName}@gmail.com`;
    }

    /**
    * Generates a random mobile number.
    */
    generateRandomMobileNumber(): string{
        return faker.phone.number({ style: "mobile"});
    }
}