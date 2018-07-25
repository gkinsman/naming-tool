import { Service } from '@/services/service';

export interface ServiceType {
  shortName: string;
  longName: string;
}

export function isServiceType(thing: any): thing is ServiceType {
  const thingAsServiceType = thing as ServiceType;
  return thingAsServiceType.longName !== undefined && thingAsServiceType.shortName !== undefined;
}

let ServiceTypes: ServiceType[] = [
  {
    shortName: "sqldb",
    longName: "Azure sql db server"
  },
  {
    shortName: "db",
    longName: "Database"
  },
  {
    shortName: "nsg",
    longName: "Network Security Group"
  },
  {
    shortName: "vnet",
    longName: "Virtual Network"
  },
  {
    shortName: "nic",
    longName: "Network Card"
  },
  {
    shortName: "ip",
    longName: "IP Address"
  },
  {
    shortName: "sacc",
    longName: "Storage Account"
  },
  {
    shortName: "resgrp",
    longName: "Resource Group"
  },
  {
    shortName: "azsub",
    longName: "Azure Subscription"
  },
  {
    shortName: "adapp",
    longName: "Azure AD app"
  },
  {
    shortName: "sbus",
    longName: "Service Bus"
  },
  {
    shortName: "insights",
    longName: "Azure Application Insights"
  },
  {
    shortName: "ag",
    longName: "Application Gateway"
  },
  {
    shortName: "cosmos",
    longName: "CosmosDB"
  },
  {
    shortName: "sqlsql",
    longName: "server"
  },
  {
    shortName: "aset",
    longName: "Availability Set"
  },
  {
    shortName: "auto",
    longName: "Automation Account"
  },
  {
    shortName: "lb",
    longName: "Load Balancer"
  },
  {
    shortName: "oms",
    longName: "Log Analytics"
  },
  {
    shortName: "app",
    longName: "App Service"
  },
  {
    shortName: "splan",
    longName: "App Service Plan"
  },
  {
    shortName: "vault",
    longName: "Key Vault"
  },
  {
    shortName: "cr",
    longName: "AKS container registry"
  },
  {
    shortName: "aks",
    longName: "AKS"
  },
  {
    shortName: "klstr",
    longName: "AKS cluster"
  }
];

export default ServiceTypes;
