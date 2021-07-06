export interface Account {
  id: number;
  parent?: number;
  code: string;
  name: string;
  type: 'revenue' | 'expense';
  launch: 'yes' | 'no';
}

export interface AccountWithParent extends Account {
  parentAccount?: Account;
}
