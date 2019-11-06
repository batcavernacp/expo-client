export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};



export type BaseNode = {
   __typename?: 'BaseNode',
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['String']>,
};

export type CheckEmailInput = {
  email: Scalars['String'],
};

export type CreateDeviceInput = {
  device: Scalars['ID'],
};

export type CreateDevicePayload = {
   __typename?: 'CreateDevicePayload',
  token: Scalars['String'],
};

export type Device = Node & {
   __typename?: 'Device',
  owner?: Maybe<User>,
  name?: Maybe<Scalars['String']>,
  usersInvited?: Maybe<Array<Maybe<User>>>,
  pendingInvites?: Maybe<Array<Maybe<Scalars['String']>>>,
  log?: Maybe<LogConnection>,
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['String']>,
};

export type Log = Node & {
   __typename?: 'Log',
  id: Scalars['ID'],
  user?: Maybe<User>,
  action?: Maybe<LogAction>,
};

export enum LogAction {
  On = 'ON',
  Off = 'OFF',
  RemoveUser = 'REMOVE_USER',
  InviteUser = 'INVITE_USER'
}

export type LogConnection = {
   __typename?: 'LogConnection',
  edges: Array<Maybe<LogEdge>>,
  pageInfo: PageInfo,
};

export type LogEdge = {
   __typename?: 'LogEdge',
  cursor?: Maybe<Scalars['String']>,
  node?: Maybe<Log>,
};

export type LoginPayload = {
   __typename?: 'LoginPayload',
  user: User,
};

export type Mutation = {
   __typename?: 'Mutation',
  createDevice: CreateDevicePayload,
  sendInvite: SendInvitePayload,
  cancelInvite: ResponsePayload,
  login: LoginPayload,
  removeUser: ResponsePayload,
  registerNewDevice: RegisterNewDevicePayload,
  checkEmail: ResponsePayload,
  registerWithInvite: RegisterUserPayload,
  registerWithDevice: RegisterUserPayload,
  checkQRCode: ResponsePayload,
  switch?: Maybe<Scalars['Boolean']>,
};


export type MutationCreateDeviceArgs = {
  input: CreateDeviceInput
};


export type MutationSendInviteArgs = {
  input: SendInviteInput
};


export type MutationCancelInviteArgs = {
  input: SendInviteInput
};


export type MutationRemoveUserArgs = {
  input: RemoveUserInput
};


export type MutationRegisterNewDeviceArgs = {
  input: RegisterNewDeviceInput
};


export type MutationCheckEmailArgs = {
  input: CheckEmailInput
};


export type MutationRegisterWithDeviceArgs = {
  input: RegisterWithDeviceInput
};


export type MutationCheckQrCodeArgs = {
  input: RegisterWithDeviceInput
};


export type MutationSwitchArgs = {
  input: SwitchInput
};

export type MyDevicesPayload = {
   __typename?: 'MyDevicesPayload',
  owned?: Maybe<Array<Maybe<Device>>>,
  guest?: Maybe<Array<Maybe<Device>>>,
};

export type Node = {
  id: Scalars['ID'],
};

export type PageInfo = {
   __typename?: 'PageInfo',
  hasNextPage: Scalars['Boolean'],
  hasPreviousPage: Scalars['Boolean'],
  startCursor?: Maybe<Scalars['String']>,
  endCursor?: Maybe<Scalars['String']>,
};

export type Payload = {
   __typename?: 'Payload',
  error?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  node?: Maybe<Node>,
  myDevices: MyDevicesPayload,
};


export type QueryNodeArgs = {
  id: Scalars['ID']
};

export type RegisterNewDeviceInput = {
  qrcode: Scalars['String'],
  name: Scalars['String'],
};

export type RegisterNewDevicePayload = {
   __typename?: 'RegisterNewDevicePayload',
  device?: Maybe<Device>,
  success: Scalars['Boolean'],
  error?: Maybe<Scalars['String']>,
};

export type RegisterUserPayload = {
   __typename?: 'RegisterUserPayload',
  user?: Maybe<User>,
  success: Scalars['Boolean'],
  error?: Maybe<Scalars['String']>,
};

export type RegisterWithDeviceInput = {
  qrcode: Scalars['String'],
  name?: Maybe<Scalars['String']>,
};

export type RemoveUserInput = {
  device: Scalars['ID'],
  user: Scalars['ID'],
};

export type ResponsePayload = {
   __typename?: 'ResponsePayload',
  success: Scalars['Boolean'],
  error?: Maybe<Scalars['String']>,
};

export type SendInviteInput = {
  device: Scalars['ID'],
  email: Scalars['String'],
};

export type SendInvitePayload = {
   __typename?: 'SendInvitePayload',
  user?: Maybe<User>,
  success: Scalars['Boolean'],
  error?: Maybe<Scalars['String']>,
};

export type Subscription = {
   __typename?: 'Subscription',
  switched?: Maybe<SwitchedPayload>,
};

export enum Switch {
  On = 'ON',
  Off = 'OFF'
}

export type SwitchedPayload = {
   __typename?: 'SwitchedPayload',
  turned?: Maybe<Switch>,
  device?: Maybe<Device>,
};

export type SwitchInput = {
  turn: Switch,
  device: Scalars['ID'],
};

export type User = Node & {
   __typename?: 'User',
  email?: Maybe<Scalars['String']>,
  id: Scalars['ID'],
  createdAt?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['String']>,
};
