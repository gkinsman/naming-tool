import { ServiceType } from '@/services/service-types';

export class Service {
    constructor(
        public area: string,
        public noun: string,
        public discriminator: ServiceType,
    ) { }

    get name() {
        return `tktr-${this.area}-${this.discriminator.shortName}-${this.noun}`;
    }
}